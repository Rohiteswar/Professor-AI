import React from "react";
import { useRecoilValue } from "recoil";
import { ChatLogState, Type, ChatEntry as MessageType } from "@/store/atoms/ChatLogState";
import TypingAnimation from "./Typing";
import { isResponseLoaded } from "./isResponseLoader";

function ChatLog() {
  const chatLog= useRecoilValue(ChatLogState);
  const isResponse = useRecoilValue(isResponseLoaded);

  return (

      <div className="bg-black text-white h-dvh py-32 overflow-y-scroll will-change-scroll">
        
        <div className="flex-grow p-6">
          <div className="flex flex-col space-y-4">
            {chatLog.map((message, index) => (
              <Message key={index} message={message} />
            ))}
            {isResponse && <TypingAnimation />}
          </div>
        </div>
      </div>

  );
}

function Message({ message }: { message: MessageType }) {
  const isUserMessage = message.type === Type.User;

  return (
    <div className={`flex ${isUserMessage ? "justify-end" : "justify-start"}`}>
      <div className={`message-box ${isUserMessage ? "user" : "bot"}`}>
        {message.message}
      </div>
    </div>
  );
}

export default ChatLog;
