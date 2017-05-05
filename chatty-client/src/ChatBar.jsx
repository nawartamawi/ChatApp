import React, {PropTypes, Component} from 'react';
class ChatBar extends Component {

  static propTypes = {
    onNewMessage: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired,
    onNewUser : PropTypes.func.isRequired
  }
  
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      username: props.user
    }
  }

  onUsernameChanged = (e) => {
    this.setState({username:e.target.value});
  }

  onUsernameKeypress = (e) => {
    if(e.key === 'Enter') {
      this.props.onNewUser(e.target.value);
    }
  }

  onMessageChanged = (e) => {
    this.setState({ message: e.target.value });
  }
//passed it as called function 
  onMessageKeypress = (e) => {
    if(e.key === 'Enter') {
        this.props.onNewMessage(this.state.message);
        this.setState({ message: ''});
    }
  }
  
  render()
  {
    return (
      <footer className="chatbar">
          <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.state.username} onChange={this.onUsernameChanged } onKeyPress={this.onUsernameKeypress}  />
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.message} onChange={this.onMessageChanged} onKeyPress={this.onMessageKeypress} />
      </footer>
    )
  }
}

export default ChatBar;