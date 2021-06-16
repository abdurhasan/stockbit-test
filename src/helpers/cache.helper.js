const FIVE_MINUTES_MS = 1000 * 5 * 60;

class CacheStorage {
  constructor() {
    this.storage = {}; // abstraction for storage : src > notes
  }

  getData(key) {
    const datum = this.storage[key];

    // 1. validate request
    if (!datum || Date.now() > datum.expiredTime) { //  1.A key exist in cache storage
      delete this.storage[key];
      return null;
    }

    return datum.data;
  }

  setData(key, data) {
    if ((typeof (key) === 'string' && key.length > 0) && data) {
      this.storage[key] = {
        data,
        expiredTime: Date.now() + FIVE_MINUTES_MS
      };
    }
  }

  log() {
    return this.storage;
  }
}

const cacheService = new CacheStorage();

module.exports = { cacheService };
