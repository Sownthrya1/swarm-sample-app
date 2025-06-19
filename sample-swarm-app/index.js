const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Sample Docker Swarm App for learning');
});

server.listen(3000, () => {
  console.log("App running on port 3000");
});
