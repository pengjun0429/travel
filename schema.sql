CREATE TABLE IF NOT EXISTS trips (
    uid TEXT PRIMARY KEY NOT NULL,
    owner_email TEXT NOT NULL DEFAULT '',
    trip_title TEXT NOT NULL DEFAULT '我的旅遊行程',
    trip_date TEXT NOT NULL DEFAULT '',
    itinerary_data TEXT NOT NULL DEFAULT '[]',
    collaborators TEXT NOT NULL DEFAULT '[]',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
