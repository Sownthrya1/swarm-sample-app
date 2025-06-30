const http = require('http');
const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, 'logs');
const logFile = path.join(logsDir, 'log.txt');

// Ensure NFS-mounted logs directory exists
if (!fs.existsSync(logsDir)) {
  console.error("Error: logs directory does not exist. Make sure it's mounted correctly.");
  process.exit(1);
}

const server = http.createServer((req, res) => {
  // Health check endpoint for load balancer
  if (req.url === '/ping') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('OK');
  }

  // Log all other requests
  const log = `Request received at ${new Date().toISOString()}\n`;
  fs.appendFileSync(logFile, log);
  console.log(log)
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Logged the request.\n');
});

// Make server accessible to outside (load balancer)
server.listen(3000, '0.0.0.0', () => {
  console.log("App running on port 3000");
});
