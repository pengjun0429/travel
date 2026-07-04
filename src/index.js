const LINE_CHANNEL_ID = '2010603361';
const LINE_CHANNEL_SECRET = 'dfd6f08b73d3f2f06c6e0e20e4e8c621';
const FRONTEND_URL = 'https://travelweb-8kb.pages.dev';

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
            const pagesBase = FRONTEND_URL;
            const pagesUrl = pagesBase + subPath + url.search;
            const res = await fetch(pagesUrl);
            const contentType = res.headers.get('Content-Type') || 'text/html';
            const headers = { ...corsHeaders, 'Content-Type': contentType, 'Cache-Control': 'public, max-age=300' };
            return new Response(res.body, { status: res.status, headers });
        }

        // /auth/line — LINE OAuth callback
        if (url.pathname === '/auth/line/callback') {
            return handleLineCallback(request);
        }

        return new Response('Not found', { status: 404, headers: corsHeaders });
    }
};

async function handleLineCallback(request) {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');
    const callbackUrl = url.origin + url.pathname;

    if (error || !code) {
        const redirectUrl = `${FRONTEND_URL}?line_error=${encodeURIComponent(error || 'no_code')}`;
        return Response.redirect(redirectUrl, 302);
    }

    try {
        // Exchange code for access token
        const tokenRes = await fetch('https://api.line.me/oauth2/v2.1/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: callbackUrl,
                client_id: LINE_CHANNEL_ID,
                client_secret: LINE_CHANNEL_SECRET,
            })
        });

        const tokenData = await tokenRes.json();
        if (!tokenData.access_token) {
            const redirectUrl = `${FRONTEND_URL}?line_error=token_failed`;
            return Response.redirect(redirectUrl, 302);
        }

        // Get user profile
        const profileRes = await fetch('https://api.line.me/v2/profile', {
            headers: { 'Authorization': `Bearer ${tokenData.access_token}` }
        });
        const profile = await profileRes.json();

        if (!profile.userId) {
            const redirectUrl = `${FRONTEND_URL}?line_error=profile_failed`;
            return Response.redirect(redirectUrl, 302);
        }

        // Redirect back to frontend with user info
        const params = new URLSearchParams({
            line_id: profile.userId,
            line_name: profile.displayName || '',
            line_picture: profile.pictureUrl || '',
            line_email: tokenData.id_token ? parseIdToken(tokenData.id_token).email || '' : ''
        });
        return Response.redirect(`${FRONTEND_URL}?${params.toString()}`, 302);

    } catch (err) {
        const redirectUrl = `${FRONTEND_URL}?line_error=exception`;
        return Response.redirect(redirectUrl, 302);
    }
}

function parseIdToken(idToken) {
    try {
        const parts = idToken.split('.');
        const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')));
        return payload;
    } catch (e) {
        return {};
    }
}

// ... (keep existing handleTripAPI and json functions) ...

async function handleTripAPI(request, env, corsHeaders) {
    try {
        const url = new URL(request.url);

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
