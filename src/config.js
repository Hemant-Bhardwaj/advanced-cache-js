module.exports = {
    inMemoryCache: {
      maxSize: 1000,
      maxAge: 60 * 60 * 1000 // 1 hour in milliseconds
    },
    redis: {
      host: 'localhost',
      port: 6379
    },
    memcached: {
      servers: ['localhost:11211']
    },
    persistentCache: {
      path: './cache'
    },
    cacheStrategies: {
      timeBased: true,
      eventBased: true,
      manual: true
    },
    logger: {
      level: 'info'
    }
  };
  