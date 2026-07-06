CREATE TABLE IF NOT EXISTS trips (
    trip_id TEXT PRIMARY KEY NOT NULL,
    owner_uid TEXT NOT NULL DEFAULT '',
    owner_email TEXT NOT NULL DEFAULT '',
    trip_title TEXT NOT NULL DEFAULT '我的旅遊行程',
    trip_date TEXT NOT NULL DEFAULT '',
    itinerary_data TEXT NOT NULL DEFAULT '[]',
    collaborators TEXT NOT NULL DEFAULT '[]',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_owner_uid ON trips(owner_uid);

CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY NOT NULL,
    value TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS subscriptions (
    user_uid TEXT PRIMARY KEY NOT NULL,
    user_email TEXT NOT NULL DEFAULT '',
    plan_type TEXT NOT NULL DEFAULT 'monthly',
    status TEXT NOT NULL DEFAULT 'active',
    start_date TEXT NOT NULL DEFAULT (datetime('now')),
    end_date TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_sub_email ON subscriptions(user_email);
