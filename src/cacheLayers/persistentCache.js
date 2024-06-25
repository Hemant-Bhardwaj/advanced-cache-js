const fs = require('fs');
const path = require('path');
const config = require('../config');
const cacheDir = config.persistentCache.path;

if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

module.exports = {
  get: (key) => new Promise((resolve, reject) => {
    fs.readFile(path.join(cacheDir, key), 'utf8', (err, data) => {
      if (err) return reject(err);
      resolve(JSON.parse(data));
    });
  }),
  set: (key, value) => new Promise((resolve, reject) => {
    fs.writeFile(path.join(cacheDir, key), JSON.stringify(value), 'utf8', (err) => {
      if (err) return reject(err);
      resolve();
    });
  }),
  del: (key) => new Promise((resolve, reject) => {
    fs.unlink(path.join(cacheDir, key), (err) => {
      if (err) return reject(err);
      resolve();
    });
  }),
  clear: () => new Promise((resolve, reject) => {
    fs.rmdir(cacheDir, { recursive: true }, (err) => {
      if (err) return reject(err);
      fs.mkdirSync(cacheDir, { recursive: true });
      resolve();
    });
  }),
  stats: () => new Promise((resolve, reject) => {
    fs.readdir(cacheDir, (err, files) => {
      if (err) return reject(err);
      resolve({ itemCount: files.length });
    });
  })
};
