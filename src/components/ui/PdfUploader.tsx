import React from "react";
import Upload_Icon from "./Svg_Icons/Upload_Icon";
import { useRecoilState } from "recoil";
import { FileState } from "@/store/atoms/FileState";

function PdfUploader() {

  const [file, setFile] = useRecoilState(FileState);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log( event.target.files);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    fetch("", {
      method: "POST",
      body: formData,
    })
     .then((response) => response.json())
     .then((data) => console.log(data))
     .catch((error) => console.error(error));
  };

  return (
    <form className="max-w-md mx-auto mt-8 mb-0 space-y-6">
      <div className="flex items-center space-x-4">
        <input
          accept="application/pdf"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold hover:file:bg-black hover:file:text-white hover:file:bg-opacity-80 file:cursor-pointer cursor-pointer file:text-black file:bg-white"
          type="file" onChange={handleFileChange}
        />
        <button
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-3xl hover:bg-gray-950 hover:text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex bg-white text-black"
          type="button"
          onClick={handleUpload}
        >
          <Upload_Icon className="w-4 h-4 hover:text-white text-black mr-2" />
          Upload
        </button>
      </div>
    </form>
  );
}

export default PdfUploader;
