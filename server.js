const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 8080;
const server = http.createServer(express);
const wsserver = new WebSocket.Server({ server })

wsserver.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wsserver.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})

server.listen(port, function() {
  console.log(`Hello World!, server is listening on ${port}!`)
})
