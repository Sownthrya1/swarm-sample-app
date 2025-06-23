const http = require('http');
const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, 'logs');
const logFile = path.join(logsDir, 'log.txt');

// Ensure the logs directory exists
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const server = http.createServer((req, res) => {
  const log = `Request received at ${new Date().toISOString()}\n`;
  fs.appendFileSync(logFile, log);
  res.end('Logged the request.\n');
});

server.listen(3000, () => {
  console.log("App running on port 3000");
});
