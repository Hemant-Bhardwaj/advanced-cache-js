const inMemoryCache = require('./cacheLayers/inMemoryCache');
const redisCache = require('./cacheLayers/redisCache');
const memcachedCache = require('./cacheLayers/memcachedCache');
const persistentCache = require('./cacheLayers/persistentCache');
const { logCacheHit, logCacheMiss } = require('./utils/cacheStats');
const { invalidateCache } = require('./utils/cacheInvalidation');
const config = require('./config');

class CacheManager {
  constructor() {
    this.layers = {
      inMemory: inMemoryCache,
      redis: redisCache,
      memcached: memcachedCache,
      persistent: persistentCache
    };
  }

  async get(key) {
    for (const layerName in this.layers) {
      const layer = this.layers[layerName];
      const value = await layer.get(key);
      if (value) {
        logCacheHit(layerName);
        return value;
      }
    }
    logCacheMiss();
    return null;
  }

  async set(key, value) {
    for (const layerName in this.layers) {
      const layer = this.layers[layerName];
      await layer.set(key, value);
    }
  }

  async del(key) {
    for (const layerName in this.layers) {
      const layer = this.layers[layerName];
      await layer.del(key);
    }
  }

  async clear() {
    for (const layerName in this.layers) {
      const layer = this.layers[layerName];
      await layer.clear();
    }
  }

  async stats() {
    const stats = {};
    for (const layerName in this.layers) {
      const layer = this.layers[layerName];
      stats[layerName] = await layer.stats();
    }
    return stats;
  }

  async warmUp(keys) {
    for (const key of keys) {
      const value = await this.get(key);
      if (!value) {
        const newValue = await this.fetchFromSource(key);
        await this.set(key, newValue);
      }
    }
  }

  async fetchFromSource(key) {
    // Placeholder function to simulate fetching data from the original source
    return `Data for ${key}`;
  }
}

module.exports = CacheManager;
