import { InputState } from "@/store/atoms/InputState";
import React from "react";
import { useRecoilState } from "recoil";

function ChatInput() {
    const [input, setInput] = useRecoilState(InputState);

  return (
    <div>
        <form className="flex items-center justify-center w-full space-x-2">
        <input
          className="flex h-10 w-96 border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2 rounded-3xl"
          placeholder="Type your message" type="text" onChange={(e)=> setInput(e.target.value)}/>
        <button
          className="inline-flex items-center justify-center rounded-3xl text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#14161be6] h-10 px-4 py-2 border" 
          
          >
          Send</button>
      </form>
    </div>
  );
}

export default ChatInput;
