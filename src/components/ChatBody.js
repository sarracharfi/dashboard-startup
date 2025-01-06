import React, { useEffect, useRef } from "react";
import Message from "./Message.js";
import TypingIndicator from "./TypingIndicator.js";


const ChatBody = ({
  chatMessages,
  isChatbotTyping,
  typingIndicatorMessage,
}) => {
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className='chat-body' id='chat-body' ref={chatBodyRef}>
      {chatMessages.map((chat, index) => (
        <Message key={index} message={chat.message} type={chat.type} />
      ))}
      {isChatbotTyping && (
        <TypingIndicator typingIndicatorMessage={typingIndicatorMessage} />
      )}
    </div>
  );
};

export default ChatBody;