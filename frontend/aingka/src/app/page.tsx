"use client"
import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import Chat from './components/Chat';
import ScrollToBottom from 'react-scroll-to-bottom';
import globals from '../../globals.css'


export default function Home() {
  const [response, setResponse] = useState("Loading")

  useEffect(() => {
    fetch(`http://localhost:8080/chatbot`).then(
      res => res.json()
    ).then(
      res => {
        setResponse(res.message);
        // console.log(res.message);
      }
    )
  }, [])
  const [messages, setMessages] = useState([]);
 
  const handleSendMessage = (text) => {
    setMessages([...messages, { text, isSentByUser: true }]);
    // Add logic to send the user's message to the chatbot backend and handle the bot's response.
    // For simplicity, we're just adding the user's message to the chat for now.
  };
  // console.log(messages);

  return (
    <div>
      <Head>
        <title>AIngvar</title>
        <meta name="description" content="Chatbot demo with iMessage UI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>AIngvar</h1>
        
        <div style={{backgroundColor:'white', padding:'10px', color:'black', borderRadius:'8px', maxWidth:'70'}}>{response}</div>
        <Chat messages={messages} onSendMessage={handleSendMessage} />
      </main>

      <footer>
        <p>Powered by Google Gemeni, IKEA, and Team Jiggy Journey</p>
      </footer>
    </div>
  );
}
