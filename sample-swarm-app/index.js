const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the log file path (inside container: /app/log.txt)
const logFile = path.join(__dirname, 'logs', 'log.txt');

// Create HTTP server
const server = http.createServer((req, res) => {
  const log = `Request received at ${new Date().toISOString()}\n`;

  // Append log to file
  fs.appendFileSync(logFile, log);

  // Respond to the client
  res.end('Logged the request.\n');
});

// Start listening on port 3000
server.listen(3000, () => {
  console.log("App running on port 3000");
});
