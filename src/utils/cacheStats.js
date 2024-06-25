const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});

function logCacheHit(layer) {
  logger.info(`Cache hit on layer: ${layer}`);
}

function logCacheMiss() {
  logger.info('Cache miss');
}

module.exports = { logCacheHit, logCacheMiss };
