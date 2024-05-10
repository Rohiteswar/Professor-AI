import { useRecoilValue } from "recoil";
import ChatInput from "../ui/ChatInput";
import Headline from "../ui/Headline";
import PdfUploader from "../ui/PdfUploader";
import Logo from "../ui/Svg_Icons/Logo";
import { IsUploadedState } from "@/store/atoms/IsUploaded";
import ChatLog from "../ui/ChatLog";

export default function Client() {
  const Isuploaded = useRecoilValue(IsUploadedState);
  return (
    <div className="h-screen">
      <div className="bg-black absolute w-full flex justify-center pr-24">
        <Logo />
      </div>
      {Isuploaded ? (
        <div className="flex flex-col w-full justify-center">
          <ChatLog />
        </div>
      ) : (
        <div className="h-screen flex flex-col justify-center bg-black">
          <Headline />
          <PdfUploader />
        </div>
      )}
      <div className="flex flex-col justify-center bg-black">
        <div className="flex justify-center absolute bottom-4 w-full">
          <ChatInput />
        </div>
      </div>
    </div>
  );
}
