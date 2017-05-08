import React, {Component} from 'react';
import ChatBar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';


const data = {
  currentUser: {name : 'Anomymous'}, 
  messages: [],
  usersOnline : ''
}


class App extends Component {

  constructor(props) {
    super(props);
    this.state = data;
  }

  componentDidMount(){
        this.socket = new WebSocket('ws://0.0.0.0:3001');
        this.socket.onopen = function () { 
      };
      this.socket.onmessage = (event) => {
      let incomingMessge = JSON.parse(event.data);

      switch(incomingMessge.type) {
      case 'incomingMessage':
        this.setState({
          messages:this.state.messages.concat(incomingMessge)
        })
        break;
      case 'incomingNotification':
        this.setState({
          messages:this.state.messages.concat(incomingMessge)
        })
        break;
      case 'usersCount': 
        this.setState ({usersOnline : incomingMessge.usersOnlineUpdate});
        break;
      default:
        throw new Error('Unknown Data type ' + incomingMessge.type);
    }

  }
  }

  makeMessage(content) {
    const username = this.state.currentUser.name;
    const type = 'postMessage'
    return {
      type,
      username,
      content
    }
  }

  makeNotification(newUsername){
      const oldName = this.state.currentUser.name;
    return {
        type : 'postNotification',
        content : `User ${oldName} changed its name to ${newUsername}`
    }
  }

  onNewUser = (user) => {
    const notify = this.makeNotification(user);
    this.setState({ currentUser : {name : user}});
    this.socket.send(JSON.stringify(notify));
  }

  onNewMessage = (content) => {
    const messageWithoutID = this.makeMessage(content);
    this.socket.send(JSON.stringify(messageWithoutID));
  }
  
  render() {
    // console.log('Rendering <App/>');
    return (
      <div>
        <nav className="navbar">
            <a href="/" className="navbar-brand">ChattyApp
            </a>
            <p>
              Number of Users : {this.state.usersOnline}
            </p>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar user={this.state.currentUser.name} onNewMessage={this.onNewMessage} onNewUser={this.onNewUser} />
      </div>
    );
  }
}
export default App;
