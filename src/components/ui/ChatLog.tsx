import { ChatLogState, Type } from "@/store/atoms/ChatLogState";
import TypingAnimation from "./Typing";

import React from "react";
import { useRecoilValue } from "recoil";
import { isResponseLoaded } from "./isResponseLoader";

function ChatLog() {
  const ChatLog = useRecoilValue(ChatLogState);
  const isResLoad = useRecoilValue(isResponseLoaded);
  return (
    <>
      <div className="container mx-auto max-w-[700px]">
        <div className="flex flex-col h-screen bg-gray-900">
          <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center py-3 font-bold text-6xl">
            ChatGPT
          </h1>
          <div className="flex-grow p-6">
            <div className="flex flex-col space-y-4">
              {ChatLog.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type ===  Type.User ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`${
                      message.type ===  Type.User ? "bg-purple-500" : "bg-gray-800"
                    } rounded-lg p-4 text-white max-w-sm`}
                  >
                    {message.message}
                  </div>
                </div>
              ))}
              {isResLoad && (
                <div key={ChatLog.length} className="flex justify-start">
                  <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                    <TypingAnimation />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatLog;
