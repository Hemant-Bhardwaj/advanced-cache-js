const LRU = require('lru-cache');
const config = require('../config');

const inMemoryCache = new LRU({
  max: config.inMemoryCache.maxSize,
  maxAge: config.inMemoryCache.maxAge
});

module.exports = {
  get: (key) => inMemoryCache.get(key),
  set: (key, value) => inMemoryCache.set(key, value),
  del: (key) => inMemoryCache.del(key),
  clear: () => inMemoryCache.reset(),
  stats: () => ({
    length: inMemoryCache.length,
    itemCount: inMemoryCache.itemCount
  })
};
