import React, { useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import TextareaAutosize from 'react-textarea-autosize'; 
import globals from '../globals.css'
import axios from 'axios'

const Chat = ({ messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      onSendMessage(newMessage);
      setNewMessage('');
    }try {
            const response = await axios.post('http://localhost:8080/chatbot', {message: newMessage.slice(1)});
            if(response) {
                const responseData = await response.data;
                setNewMessage('')
                onSendMessage(responseData.message);
                // messages.push({text:responseData.message, isSetByUser: false})
                // console.log(messages)

            }
            console.log('Response from backend:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
  };

  return (
    <div style={{display:'flex', flexDirection:'column',height:'70vh'}}className="chat-container">
      <ScrollToBottom style={{flex:'1',overflow: "hidden",padding:'10px'}}className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.isSentByUser ? 'user' : 'bot'}`}>
            {message.text}
          </div>
        ))}
      </ScrollToBottom>
      <div className="input-container">
        <TextareaAutosize
          className="input-field"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

