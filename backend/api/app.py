from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Define the directory where you want to save the uploaded files
UPLOAD_DIRECTORY = "public"

# Create the directory if it doesn't exist
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set this to the domains you want to allow requests from
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

@app.post("/api/fileUpload/")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Save the file to the specified directory
        file_path = os.path.join(UPLOAD_DIRECTORY, file.filename)
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())
        
        # Return a JSON response indicating success
        return JSONResponse(content={"message": "File uploaded successfully", "file_name": file.filename}, status_code=200)
    except Exception as e:
        # If an error occurs, return an error response
        return JSONResponse(content={"error": str(e)}, status_code=500)
