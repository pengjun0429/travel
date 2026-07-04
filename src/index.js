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

        // /api/trip — D1 database
        if (url.pathname === '/api/trip' || url.pathname.startsWith('/travelweb/api/trip')) {
            return handleTripAPI(request, env, corsHeaders);
        }

        // /travelweb/* — proxy to Pages
        if (url.pathname.startsWith('/travelweb')) {
            let subPath = url.pathname.replace('/travelweb', '') || '/';
            if (subPath === '/' || subPath === '') subPath = '/index.html';
            const pagesBase = 'https://travelweb-8kb.pages.dev';
            const pagesUrl = pagesBase + subPath + url.search;
            const res = await fetch(pagesUrl);
            const contentType = res.headers.get('Content-Type') || 'text/html';
            const headers = { ...corsHeaders, 'Content-Type': contentType, 'Cache-Control': 'public, max-age=300' };
            return new Response(res.body, { status: res.status, headers });
        }

        return new Response('Not found', { status: 404, headers: corsHeaders });
    }
};

async function handleTripAPI(request, env, corsHeaders) {
    try {
        const url = new URL(request.url);

        // GET /api/trip?uid=xxx
        if (request.method === 'GET') {
            const uid = url.searchParams.get('uid');
            if (!uid) return json(corsHeaders, { error: 'Missing uid' }, 400);
            const result = await env.DB.prepare('SELECT * FROM trips WHERE uid = ?').bind(uid).first();
            if (!result) return json(corsHeaders, { empty: true });
            return json(corsHeaders, {
                tripTitle: result.trip_title,
                tripDate: result.trip_date,
                itineraryData: JSON.parse(result.itinerary_data),
                ownerEmail: result.owner_email,
                collaborators: JSON.parse(result.collaborators || '[]')
            });
        }

        // POST /api/trip — save
        if (request.method === 'POST') {
            const body = await request.json();
            const { uid, tripTitle, tripDate, itineraryData, ownerEmail, collaborators } = body;
            if (!uid) return json(corsHeaders, { error: 'Missing uid' }, 400);
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

        return json(corsHeaders, { error: 'Method not allowed' }, 405);
    } catch (err) {
        return json(corsHeaders, { error: err.message }, 500);
    }
}

function json(headers, data, status = 200) {
    return new Response(JSON.stringify(data), {
        status, headers: { ...headers, 'Content-Type': 'application/json' }
    });
}
