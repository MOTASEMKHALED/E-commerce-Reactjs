import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/message.css';
import Home from './Home';

const ChatApp: React.FC = () => {
  const [users, setUsers] = useState(['motasem khaled', 'user 2']);
  const [activeUser, setActiveUser] = useState(users[0]);
  const [messages, setMessages] = useState<{ [key: string]: { text: string, time: string }[] }>({});
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        text: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      axios.post('http://localhost:8080/messages', {
        user: activeUser,
        message: newMessage
      })
      .then(response => {
        console.log(response.data); 
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });

      setMessages(prevMessages => ({
        ...prevMessages,
        [activeUser]: [...(prevMessages[activeUser] || []), newMessage]
      }));
      setInput('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className='MsgMain'>
      <Home />
      <div id="containerMsg">
        <aside className='asideMsg'>
          <header></header>
          <ul>
            {users.map(user => (
              <li key={user} onClick={() => setActiveUser(user)} className={user === activeUser ? 'active' : ''}>
                <div>
                  <h2>{user}</h2>
                </div>
              </li>
            ))}
          </ul>
        </aside>
        <main className='mainMsg'>
          <header>
            <div>
              <h2>{activeUser}'s Messages</h2>
            </div>
          </header>
          <ul id="chat">
            {(messages[activeUser] || []).map((message, index) => (
              <li key={index} className="you">
                <div className="entete">
                  <h3>{message.time}, Today</h3>
                </div>
                <div className="triangle"></div>
                <div className="message">
                  {message.text}
                </div>
              </li>
            ))}
          </ul>
          <footer>
            <textarea
              placeholder="Type your message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            ></textarea>
            <button onClick={sendMessage}>Send</button>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default ChatApp;
