import React from "react";

import ChatBody from "./ChatBody"; 
import ChatInput from "./ChatInput"; 

const Message = ({ message, type }) => {
  return (
    <div className={type === "user" ? "user-message" : "chatbot-message"}>
      {message}
    </div>
  );
};

export default Message;