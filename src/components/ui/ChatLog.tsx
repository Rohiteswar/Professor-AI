import React, { useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import {
  ChatLogState,
  Type,
  ChatEntry as MessageType,
} from "@/store/atoms/ChatLogState";
import TypingAnimation from "./Typing";
import { isResponseLoaded } from "./isResponseLoader";

function ChatLog() {
  const chatLog = useRecoilValue(ChatLogState);
  const isResponse = useRecoilValue(isResponseLoaded);
  const chatEndRef = useRef<HTMLDivElement>(null); // Define the type explicitly

  useEffect(() => {
    // Scroll to the bottom of the chat log when new messages are added
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  return (
    <div className="bg-black text-white h-dvh py-20 px-18 overflow-y-scroll will-change-scroll">
      <div className="flex-grow p-6">
        <div className="flex flex-col space-y-4">
          {chatLog.map((message, index) => (
            <Message key={index} message={message} />
          ))}
          {isResponse && <TypingAnimation />}
          <div ref={chatEndRef}></div>
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
        <div className="message-avatar mr-2">
          {isUserMessage ? "You" : "Bot"}
        </div>
        <div className="message-content text-slate-300">{message.message}</div>
      </div>
    </div>
  );
}

export default ChatLog;
