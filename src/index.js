export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        try {
            if (url.pathname === '/api/trip' && request.method === 'GET') {
                const uid = url.searchParams.get('uid');
                if (!uid) {
                    return new Response(JSON.stringify({ error: 'Missing uid' }), {
                        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                    });
                }
                const result = await env.DB.prepare('SELECT * FROM trips WHERE uid = ?').bind(uid).first();
                if (!result) {
                    return new Response(JSON.stringify({ empty: true }), {
                        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                    });
                }
                return new Response(JSON.stringify({
                    tripTitle: result.trip_title,
                    tripDate: result.trip_date,
                    itineraryData: JSON.parse(result.itinerary_data)
                }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
            }

            if (url.pathname === '/api/trip' && request.method === 'POST') {
                const body = await request.json();
                const { uid, tripTitle, tripDate, itineraryData } = body;
                if (!uid) {
                    return new Response(JSON.stringify({ error: 'Missing uid' }), {
                        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                    });
                }
                const dataStr = JSON.stringify(itineraryData || []);
                await env.DB.prepare(
                    `INSERT INTO trips (uid, trip_title, trip_date, itinerary_data, updated_at)
                     VALUES (?, ?, ?, ?, datetime('now'))
                     ON CONFLICT(uid) DO UPDATE SET
                        trip_title = excluded.trip_title,
                        trip_date = excluded.trip_date,
                        itinerary_data = excluded.itinerary_data,
                        updated_at = datetime('now')`
                ).bind(uid, tripTitle || '我的旅遊行程', tripDate || '', dataStr).run();

                return new Response(JSON.stringify({ status: 'success' }), {
                    status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }

            return new Response(JSON.stringify({ error: 'Not found' }), {
                status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        } catch (err) {
            return new Response(JSON.stringify({ error: err.message }), {
                status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
    }
};
