const express = require('express');
const SocketServer = require('ws');
const uuid = require('uuid/v1');

// Set the port to 3001
const PORT = 3003;
// Create a new express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });


function broadcast(data) {
  for (let client of wss.clients) {
    let stringMessageWithID = JSON.stringify(data);
    if (client.readyState === SocketServer.OPEN) {
      client.send(stringMessageWithID);
    }
  }
}


function handleMessage(data) {
  const message = JSON.parse(data);
  message.id = uuid();
  if (message.type === 'postMessage'){
    message.type = 'incomingMessage';
  } else if (message.type === 'postNotification') {
    message.type = 'incomingNotification';
  }
  broadcast(message);
}

function makeUserCountMessage(usersOnlineUpdate) {
  const type = 'usersCount';
  return {
    type,
    usersOnlineUpdate
  };
}
function updatUserNumberStatus() {
  const currentUsersNumber = makeUserCountMessage(wss.clients.size.toString());
  broadcast(currentUsersNumber);
  
}

function handleDisonnection(client) {
  updatUserNumberStatus();
}

function handleConnection (client) {
  updatUserNumberStatus();
  client.on('message', handleMessage);
  
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', handleDisonnection );
}

wss.on('connection', handleConnection);