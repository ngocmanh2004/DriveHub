/**
 * Simple in-memory TTL cache — không cần Redis
 * Dùng cho data ít thay đổi: ranks, subjects, tests, questions
 */
const store = new Map();

function get(key) {
    const entry = store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
        store.delete(key);
        return null;
    }
    return entry.value;
}

function set(key, value, ttlMs = 10 * 60 * 1000) { // default 10 phút
    store.set(key, { value, expiresAt: Date.now() + ttlMs });
}

function invalidate(key) {
    store.delete(key);
}

// Xóa tất cả key bắt đầu bằng prefix (vd: 'subjects_' xóa hết cache subject)
function invalidatePrefix(prefix) {
    for (const key of store.keys()) {
        if (key.startsWith(prefix)) store.delete(key);
    }
}

function size() { return store.size; }

module.exports = { get, set, invalidate, invalidatePrefix, size };
