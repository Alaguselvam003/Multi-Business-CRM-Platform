const log = (level, message) => console.log(`[${new Date().toISOString()}] [${level}] ${message}`);

module.exports = {
  info: (msg) => log('INFO', msg),
  error: (msg) => log('ERROR', msg),
  warn: (msg) => log('WARN', msg),
};
