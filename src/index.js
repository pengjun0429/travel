const LINE_CHANNEL_ID = '2010603361';
const LINE_CHANNEL_SECRET = 'dfd6f08b73d3f2f06c6e0e20e4e8c621';
const FRONTEND_URL = 'https://travelweb-8kb.pages.dev';
const FREE_TRIP_LIMIT = 5;

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        // /api/trips — list user's trips
        if (url.pathname === '/api/trips') {
            return handleListTrips(request, env, corsHeaders);
        }

        // /api/trip — CRUD
        if (url.pathname === '/api/trip') {
            if (request.method === 'GET') return handleGetTrip(request, env, corsHeaders);
            if (request.method === 'POST') return handleCreateOrUpdateTrip(request, env, corsHeaders);
            if (request.method === 'DELETE') return handleDeleteTrip(request, env, corsHeaders);
        }

        // /api/privacy — GET/POST privacy policy
        if (url.pathname === '/api/privacy') {
            if (request.method === 'GET') return handleGetPrivacy(request, env, corsHeaders);
            if (request.method === 'POST') return handleSavePrivacy(request, env, corsHeaders);
        }

        // /api/subscribe/* — subscription endpoints
        if (url.pathname === '/api/subscribe/status') {
            return handleSubscribeStatus(request, env, corsHeaders);
        }
        if (url.pathname === '/api/subscribe/generate-code') {
            return handleGenerateCode(request, env, corsHeaders);
        }
        if (url.pathname === '/api/subscribe/activate') {
            return handleActivateCode(request, env, corsHeaders);
        }

        // /auth/line/callback
        if (url.pathname === '/auth/line/callback') {
            return handleLineCallback(request);
        }

        // /travelweb/* — proxy to Pages
        if (url.pathname.startsWith('/travelweb')) {
            let subPath = url.pathname.replace('/travelweb', '') || '/';
            if (subPath === '/' || subPath === '') subPath = '/index.html';
            const pagesUrl = FRONTEND_URL + subPath + url.search;
            const res = await fetch(pagesUrl);
            const contentType = res.headers.get('Content-Type') || 'text/html';
            return new Response(res.body, { status: res.status, headers: { ...corsHeaders, 'Content-Type': contentType } });
        }

        return new Response('Not found', { status: 404, headers: corsHeaders });
    }
};

// ===== TRIP CRUD =====

async function handleListTrips(request, env, corsHeaders) {
    const url = new URL(request.url);
    const uid = url.searchParams.get('uid');
    const email = url.searchParams.get('email');
    if (!uid) return json(corsHeaders, { error: 'Missing uid' }, 400);

    const ownedByUid = await env.DB.prepare('SELECT trip_id, owner_uid, owner_email, trip_title, trip_date, created_at FROM trips WHERE owner_uid = ? ORDER BY created_at DESC').bind(uid).all();
    let ownedByEmail = { results: [] };
    if (email) {
        ownedByEmail = await env.DB.prepare('SELECT trip_id, owner_uid, owner_email, trip_title, trip_date, created_at FROM trips WHERE owner_email = ? AND owner_uid != ? ORDER BY created_at DESC').bind(email, uid).all();
    }
    const owned = [...(ownedByUid.results || []), ...(ownedByEmail.results || [])];
    const seenOwned = new Set();
    const ownedUnique = owned.filter(t => { const k = t.trip_id; if (seenOwned.has(k)) return false; seenOwned.add(k); return true; });

    let shared = { results: [] };
    if (email) {
        const byEmail = await env.DB.prepare("SELECT trip_id, owner_uid, owner_email, trip_title, trip_date, collaborators, created_at FROM trips WHERE collaborators LIKE ? AND owner_uid != ? AND owner_email != ? ORDER BY created_at DESC").bind(`%${email}%`, uid, email).all();
        const byUid = await env.DB.prepare("SELECT trip_id, owner_uid, owner_email, trip_title, trip_date, collaborators, created_at FROM trips WHERE owner_uid = ? AND owner_email != ? ORDER BY created_at DESC").bind(uid, email).all();
        const combined = [...(byEmail.results || []), ...(byUid.results || [])];
        const seenShared = new Set();
        shared.results = combined.filter(t => { const k = t.trip_id; if (seenShared.has(k) || seenOwned.has(k)) return false; seenShared.add(k); return true; });
    }

    return json(corsHeaders, {
        owned: ownedUnique,
        shared: (shared.results || []).map(t => ({ ...t, collaborators: undefined }))
    });
}

async function handleGetTrip(request, env, corsHeaders) {
    const url = new URL(request.url);
    const tripId = url.searchParams.get('trip_id');
    const uid = url.searchParams.get('uid');

    if (tripId) {
        const result = await env.DB.prepare('SELECT * FROM trips WHERE trip_id = ?').bind(tripId).first();
        if (!result) return json(corsHeaders, { empty: true });
        return json(corsHeaders, formatTrip(result));
    }

    if (uid) {
        const result = await env.DB.prepare('SELECT * FROM trips WHERE owner_uid = ? ORDER BY created_at DESC LIMIT 1').bind(uid).first();
        if (!result) return json(corsHeaders, { empty: true });
        return json(corsHeaders, formatTrip(result));
    }

    return json(corsHeaders, { error: 'Missing trip_id or uid' }, 400);
}

async function handleCreateOrUpdateTrip(request, env, corsHeaders) {
    const body = await request.json();
    const { tripId, ownerUid, ownerEmail, tripTitle, tripDate, itineraryData, collaborators } = body;

    // If tripId exists → update
    if (tripId) {
        const dataStr = JSON.stringify(itineraryData || []);
        const collabStr = JSON.stringify(collaborators || []);
        await env.DB.prepare(
            `UPDATE trips SET trip_title = ?, trip_date = ?, itinerary_data = ?, owner_email = ?, collaborators = ?, updated_at = datetime('now') WHERE trip_id = ?`
        ).bind(tripTitle || '', tripDate || '', dataStr, ownerEmail || '', collabStr, tripId).run();
        return json(corsHeaders, { status: 'success' });
    }

    // Otherwise → create
    if (!ownerUid) return json(corsHeaders, { error: 'Missing ownerUid' }, 400);

    // Beta: free for all, unlimited trips

    const newTripId = 'trip_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
    const dataStr = JSON.stringify(itineraryData || []);
    const collabStr = JSON.stringify(collaborators || []);
    await env.DB.prepare(
        `INSERT INTO trips (trip_id, owner_uid, owner_email, trip_title, trip_date, itinerary_data, collaborators, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`
    ).bind(newTripId, ownerUid, ownerEmail || '', tripTitle || '我的旅遊行程', tripDate || '', dataStr, collabStr).run();
    return json(corsHeaders, { status: 'success', tripId: newTripId });
}

async function handleDeleteTrip(request, env, corsHeaders) {
    const url = new URL(request.url);
    const tripId = url.searchParams.get('trip_id');
    if (!tripId) return json(corsHeaders, { error: 'Missing trip_id' }, 400);

    await env.DB.prepare('DELETE FROM trips WHERE trip_id = ?').bind(tripId).run();
    return json(corsHeaders, { status: 'success' });
}

function formatTrip(row) {
    return {
        tripId: row.trip_id,
        ownerUid: row.owner_uid,
        ownerEmail: row.owner_email,
        tripTitle: row.trip_title,
        tripDate: row.trip_date,
        itineraryData: JSON.parse(row.itinerary_data || '[]'),
        collaborators: JSON.parse(row.collaborators || '[]'),
        createdAt: row.created_at
    };
}

// ===== PRIVACY API =====

async function handleGetPrivacy(request, env, corsHeaders) {
    const row = await env.DB.prepare("SELECT value FROM settings WHERE key = 'privacy_content'").first();
    return json(corsHeaders, { content: row ? row.value : '' });
}

async function handleSavePrivacy(request, env, corsHeaders) {
    const body = await request.json();
    const content = body.content;
    if (!content) return json(corsHeaders, { error: 'Missing content' }, 400);
    await env.DB.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES ('privacy_content', ?)").bind(content).run();
    return json(corsHeaders, { status: 'success' });
}

// ===== SUBSCRIPTION =====

function isSubscriptionActive(sub) {
    if (sub.status !== 'active') return false;
    if (sub.end_date && new Date(sub.end_date) < new Date()) return false;
    return true;
}

async function handleSubscribeStatus(request, env, corsHeaders) {
    const url = new URL(request.url);
    const uid = url.searchParams.get('uid');
    if (!uid) return json(corsHeaders, { error: 'Missing uid' }, 400);

    const sub = await env.DB.prepare('SELECT * FROM subscriptions WHERE user_uid = ?').bind(uid).first();
    if (!sub) return json(corsHeaders, { premium: false });

    const active = isSubscriptionActive(sub);
    return json(corsHeaders, {
        premium: active,
        planType: sub.plan_type,
        startDate: sub.start_date,
        endDate: sub.end_date
    });
}

async function handleGenerateCode(request, env, corsHeaders) {
    const auth = request.headers.get('Authorization');
    const adminKey = env.ADMIN_SECRET;
    if (!adminKey || auth !== `Bearer ${adminKey}`) {
        return json(corsHeaders, { error: 'Unauthorized' }, 401);
    }
    const body = await request.json();
    const { plan } = body;
    if (plan !== 'monthly' && plan !== 'yearly') return json(corsHeaders, { error: 'Invalid plan' }, 400);

    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    await env.DB.prepare(
        "INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)"
    ).bind(`activation_code_${code}`, JSON.stringify({ plan, used: false })).run();
    return json(corsHeaders, { code });
}

async function handleActivateCode(request, env, corsHeaders) {
    const body = await request.json();
    const { uid, email, code } = body;
    if (!uid || !email || !code) return json(corsHeaders, { error: 'Missing uid, email, or code' }, 400);

    const row = await env.DB.prepare("SELECT value FROM settings WHERE key = ?").bind(`activation_code_${code}`).first();
    if (!row) return json(corsHeaders, { error: 'Invalid code' }, 400);

    const data = JSON.parse(row.value);
    if (data.used) return json(corsHeaders, { error: 'Code already used' }, 400);

    const endDate = data.plan === 'monthly'
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();

    await env.DB.prepare(
        `INSERT OR REPLACE INTO subscriptions (user_uid, user_email, plan_type, status, start_date, end_date, updated_at) VALUES (?, ?, ?, 'active', datetime('now'), ?, datetime('now'))`
    ).bind(uid, email, data.plan, endDate).run();

    await env.DB.prepare("DELETE FROM settings WHERE key = ?").bind(`activation_code_${code}`).run();
    return json(corsHeaders, { status: 'success', plan: data.plan });
}

// ===== LINE LOGIN =====

async function handleLineCallback(request) {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');
    const callbackUrl = url.origin + url.pathname;

    if (error || !code) {
        return Response.redirect(`${FRONTEND_URL}?line_error=${encodeURIComponent(error || 'no_code')}`, 302);
    }

    try {
        const tokenRes = await fetch('https://api.line.me/oauth2/v2.1/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                grant_type: 'authorization_code', code, redirect_uri: callbackUrl,
                client_id: LINE_CHANNEL_ID, client_secret: LINE_CHANNEL_SECRET,
            })
        });
        const tokenData = await tokenRes.json();
        if (!tokenData.access_token) return Response.redirect(`${FRONTEND_URL}?line_error=token_failed`, 302);

        const profileRes = await fetch('https://api.line.me/v2/profile', { headers: { 'Authorization': `Bearer ${tokenData.access_token}` } });
        const profile = await profileRes.json();
        if (!profile.userId) return Response.redirect(`${FRONTEND_URL}?line_error=profile_failed`, 302);

        const params = new URLSearchParams({
            line_id: profile.userId, line_name: profile.displayName || '',
            line_picture: profile.pictureUrl || '',
            line_email: tokenData.id_token ? parseIdToken(tokenData.id_token).email || '' : ''
        });
        return Response.redirect(`${FRONTEND_URL}?${params.toString()}`, 302);
    } catch (err) {
        return Response.redirect(`${FRONTEND_URL}?line_error=exception`, 302);
    }
}

function parseIdToken(idToken) {
    try {
        const parts = idToken.split('.');
        const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')));
    } catch (e) { return {}; }
}

function json(headers, data, status = 200) {
    return new Response(JSON.stringify(data), { status, headers: { ...headers, 'Content-Type': 'application/json' } });
}
