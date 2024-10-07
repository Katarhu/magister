const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const port = 5005;

app.use(express.static(path.join(__dirname, '../../dist/app')));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'app', 'index.html'));
})

const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`))
