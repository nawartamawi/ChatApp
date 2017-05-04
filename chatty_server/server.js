const express = require('express');
const SocketServer = require('ws');
const uuid = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;
// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });


// function broadcast(data) {
//   wss.clients.forEach(function each(client) {
// };



//     if (client.readyState === wss.OPEN) {
//       client.send(stringMessageWithID);
//     }
//   });
function broadcast(data) {
  for (let client of wss.clients) {
    let stringMessageWithID = JSON.stringify(data);
    console.log("client ---", SocketServer.OPEN);
    if (client.readyState === SocketServer.OPEN) {
      
      client.send(stringMessageWithID);
      console.log("sent a message");
    }
  }
}


function handleMessage(data) {
  const message = JSON.parse(data);
  message.id = uuid();
  broadcast(message);
  
}

function handleConnection (client) {
  console.log('Client connected', 'we are' + wss.clients.size);
  client.on('message', handleMessage);
  
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  wss.on('close', () => console.log('Client disconnected'));
}

wss.on('connection', handleConnection);