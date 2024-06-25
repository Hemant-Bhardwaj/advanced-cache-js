const redis = require('redis');
const { promisify } = require('util');
const config = require('../config');
const client = redis.createClient(config.redis);

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);

module.exports = {
  get: (key) => getAsync(key),
  set: (key, value) => setAsync(key, value),
  del: (key) => delAsync(key),
  clear: () => client.flushdb(),
  stats: () => new Promise((resolve, reject) => {
    client.info((err, info) => {
      if (err) return reject(err);
      resolve(info);
    });
  })
};
