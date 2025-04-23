// components/BotpressChat.js
import { useEffect } from "react";

import { Fab, Webchat } from '@botpress/webchat';
import { useState } from 'react';


const BotpressChat = () => {
    const [isWebchatOpen, setIsWebchatOpen] = useState(false);

    const toggleWebchat = () => {
      setIsWebchatOpen((prevState) => !prevState);
    };
  
    return (
      <>
        <Webchat
          clientId="91ba6b1d-cfb6-48d0-942d-7e6e1d79169d" // Replace with your actual Client ID
          style={{
            width: '400px',
            height: '600px',
            display: isWebchatOpen ? 'flex' : 'none',
            position: 'fixed',
            bottom: '90px',
            right: '20px',
          }}
        />
        <Fab
          onClick={() => toggleWebchat()}
          style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        />
      </>
    );
  }

export default BotpressChat;


