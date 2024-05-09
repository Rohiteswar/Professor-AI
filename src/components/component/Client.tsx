
import ChatInput from "../ui/ChatInput";
import Headline from "../ui/Headline";
import PdfUploader from "../ui/PdfUploader";
import Logo from "../ui/Svg_Icons/Logo";

export default function Client() {
  return (
    <>
      <div className="bg-black absolute w-full flex justify-center pr-24">
        <Logo />
      </div>
      <div className="h-screen flex flex-col justify-center bg-black">
        <Headline />
        <PdfUploader />
      </div>
      <div className="flex justify-center absolute bottom-4 w-full">
        <ChatInput/>
      </div>
    </>
  );
}
