import React, { useState } from "react";
import Upload_Icon from "./Svg_Icons/Upload_Icon";
import { useRecoilState, useResetRecoilState } from "recoil";
import { FileState } from "@/store/atoms/FileState";
import { isLoadingState } from "@/store/atoms/IsLoadingState";
import Alert, { AlertType } from "./Alert";
import { IsUploadedState } from "@/store/atoms/IsUploaded";

function PdfUploader() {
  const [file, setFile] = useRecoilState(FileState);
  const [Isuploaded, setIsuploaded] = useRecoilState(IsUploadedState);
  const [loading, setLoading] = useRecoilState(isLoadingState);
  const [showAlert, setShowAlert] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      fetch("http://localhost:8000/api/fileUpload", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
          setIsuploaded(true);
        });
    } else {
      setShowAlert(!showAlert);
    }
  };

  return (
    <form className="max-w-md mx-auto mt-8 mb-0 space-y-6">
      {showAlert && (
        <Alert
          type={AlertType.danger}
          message={"Please select a file before uploading."}
        />
      )}
      <div className="flex items-center space-x-4">
        <input
          accept="application/pdf"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold hover:file:bg-black hover:file:text-white hover:file:bg-opacity-80 file:cursor-pointer cursor-pointer file:text-black file:bg-white"
          type="file"
          onChange={handleFileChange}
        />
        <button
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-3xl hover:bg-gray-950 hover:text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex bg-white text-black"
          type="button"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
              <span className="ml-2">Uploading...</span>
            </div>
          ) : (
            <>
              <Upload_Icon className="w-4 h-4 hover:text-white text-black mr-2" />
              Upload
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default PdfUploader;
