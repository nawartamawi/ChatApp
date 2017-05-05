import React, {PropTypes, Component} from 'react';
import Message from './Message.jsx';
class MessageList extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired
  }
  render(){
    // console.log('MessageListProps', this.props.messages);
    const allMessages = this.props.messages.map(msg => {
      return <Message key={msg.id} message={msg.content} username={msg.username}/>
    })
    // console.log("msgs Array",allMessages);
  return (
        <main className="messages">
          {allMessages}
        </main>
    
  )
  }
}
export default MessageList;
