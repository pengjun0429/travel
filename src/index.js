export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        try {
            // GET /api/trip?uid=xxx
            if (url.pathname === '/api/trip' && request.method === 'GET') {
                const uid = url.searchParams.get('uid');
                if (!uid) {
                    return json(corsHeaders, { error: 'Missing uid' }, 400);
                }
                const result = await env.DB.prepare('SELECT * FROM trips WHERE uid = ?').bind(uid).first();
                if (!result) {
                    return json(corsHeaders, { empty: true });
                }
                return json(corsHeaders, {
                    tripTitle: result.trip_title,
                    tripDate: result.trip_date,
                    itineraryData: JSON.parse(result.itinerary_data),
                    ownerEmail: result.owner_email,
                    collaborators: JSON.parse(result.collaborators || '[]')
                });
            }

            // POST /api/trip — save trip
            if (url.pathname === '/api/trip' && request.method === 'POST') {
                const body = await request.json();
                const { uid, tripTitle, tripDate, itineraryData, ownerEmail, collaborators } = body;
                if (!uid) {
                    return json(corsHeaders, { error: 'Missing uid' }, 400);
                }
                const dataStr = JSON.stringify(itineraryData || []);
                const collabStr = JSON.stringify(collaborators || []);
                await env.DB.prepare(
                    `INSERT INTO trips (uid, owner_email, trip_title, trip_date, itinerary_data, collaborators, updated_at)
                     VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
                     ON CONFLICT(uid) DO UPDATE SET
                        owner_email = excluded.owner_email,
                        trip_title = excluded.trip_title,
                        trip_date = excluded.trip_date,
                        itinerary_data = excluded.itinerary_data,
                        collaborators = excluded.collaborators,
                        updated_at = datetime('now')`
                ).bind(uid, ownerEmail || '', tripTitle || '我的旅遊行程', tripDate || '', dataStr, collabStr).run();
                return json(corsHeaders, { status: 'success' });
            }

            // POST /api/trip/collaborator — add collaborator
            if (url.pathname === '/api/trip/collaborator' && request.method === 'POST') {
                const body = await request.json();
                const { uid, email } = body;
                if (!uid || !email) {
                    return json(corsHeaders, { error: 'Missing uid or email' }, 400);
                }
                const result = await env.DB.prepare('SELECT collaborators FROM trips WHERE uid = ?').bind(uid).first();
                if (!result) {
                    return json(corsHeaders, { error: 'Trip not found' }, 404);
                }
                const list = JSON.parse(result.collaborators || '[]');
                const normalized = email.trim().toLowerCase();
                if (!list.includes(normalized)) {
                    list.push(normalized);
                    await env.DB.prepare('UPDATE trips SET collaborators = ?, updated_at = datetime(\'now\') WHERE uid = ?')
                        .bind(JSON.stringify(list), uid).run();
                }
                return json(corsHeaders, { status: 'success', collaborators: list });
            }

            // DELETE /api/trip/collaborator?uid=xxx&email=xxx
            if (url.pathname === '/api/trip/collaborator' && request.method === 'DELETE') {
                const uid = url.searchParams.get('uid');
                const email = url.searchParams.get('email');
                if (!uid || !email) {
                    return json(corsHeaders, { error: 'Missing uid or email' }, 400);
                }
                const result = await env.DB.prepare('SELECT collaborators FROM trips WHERE uid = ?').bind(uid).first();
                if (!result) {
                    return json(corsHeaders, { error: 'Trip not found' }, 404);
                }
                const list = JSON.parse(result.collaborators || '[]');
                const filtered = list.filter(e => e !== email.trim().toLowerCase());
                await env.DB.prepare('UPDATE trips SET collaborators = ?, updated_at = datetime(\'now\') WHERE uid = ?')
                    .bind(JSON.stringify(filtered), uid).run();
                return json(corsHeaders, { status: 'success', collaborators: filtered });
            }

            return json(corsHeaders, { error: 'Not found' }, 404);
        } catch (err) {
            return json(corsHeaders, { error: err.message }, 500);
        }
    }
};

function json(headers, data, status = 200) {
    return new Response(JSON.stringify(data), {
        status, headers: { ...headers, 'Content-Type': 'application/json' }
    });
}
