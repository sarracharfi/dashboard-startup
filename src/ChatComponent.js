// src/ChatComponent.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3002');

const ChatComponent = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('receiveNotification', (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.off('receiveNotification');
    };
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:3002/api/chat', { prompt: input });
      setResponse(res.data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Chat Component</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Send</button>
      <p>Response: {response}</p>
      <h2>Notifications:</h2>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>{notif.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatComponent;
