const Memcached = require('memcached');
const config = require('../config');
const memcached = new Memcached(config.memcached.servers);

module.exports = {
  get: (key) => new Promise((resolve, reject) => {
    memcached.get(key, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  }),
  set: (key, value, lifetime = 3600) => new Promise((resolve, reject) => {
    memcached.set(key, value, lifetime, (err) => {
      if (err) return reject(err);
      resolve();
    });
  }),
  del: (key) => new Promise((resolve, reject) => {
    memcached.del(key, (err) => {
      if (err) return reject(err);
      resolve();
    });
  }),
  clear: () => memcached.flush(),
  stats: () => new Promise((resolve, reject) => {
    memcached.stats((err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  })
};
