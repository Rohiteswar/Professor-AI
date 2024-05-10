import React, { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Alert, { AlertType } from "./Alert";
import { InputState } from "@/store/atoms/InputState";
import { IsUploadedState } from "@/store/atoms/IsUploaded";
import { ChatLogState, Type } from "@/store/atoms/ChatLogState";

function ChatInput() {
  const [input, setInput] = useRecoilState(InputState);
  const isUploaded = useRecoilValue(IsUploadedState);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [chatLog, setChatLog] = useRecoilState(ChatLogState);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleSendClick = () => {
    sendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (input.trim() !== "") {
      setChatLog([...chatLog, { type: Type.User, message: input.trim() }]);
      setInput("");
    }
  };


  return (
    <div>
      <form className="flex items-center justify-center w-full space-x-2">
        <div className="relative">
          {!isUploaded && isHovered && (
            <Alert
              type={AlertType.warning}
              message={"Got a textbook question?  Upload the textbook and Type it out and I'll do my best to help!"}
            />
          )}

          <input
            ref={inputRef}
            className="flex h-10 w-96 border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2 rounded-3xl"
            placeholder="Type your message"
            type="text"
            disabled={!isUploaded}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onKeyPress={handleKeyPress}
          />

          {!isUploaded && (
            <div className="absolute inset-0 bg-gray-200 opacity-25 cursor-not-allowed rounded-3xl"></div>
          )}
        </div>

        <button
          type="button"
          onClick={handleSendClick}
          className={`inline-flex items-center justify-center rounded-3xl text-sm font-medium text-[#f9fafb] ${
            !isUploaded ? "pointer-events-none opacity-50" : "hover:bg-[#14161be6]"
          } bg-black h-10 px-4 py-2 border`}
          disabled={!isUploaded || input.trim() === ""}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
