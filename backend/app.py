from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader
from fastapi.responses import JSONResponse


# Initialize FastAPI app BEFORE any usage
app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define your Pydantic model
class QueryRequest(BaseModel):
    query: str

# Your endpoint goes AFTER app is created
@app.post("/search")
def search(request: QueryRequest):
    # your search logic here
    return {"results": ["example"]}

@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    print("📥 /upload-pdf endpoint hit")
    print(f"➡️ Received file: {file.filename}")
    print(f"➡️ Content type: {file.content_type}")
    
    contents = await file.read()
    print(f"📦 File size: {len(contents)} bytes")
    print(f"🧪 First 10 bytes: {contents[:10]}")

    # Optional: Try parsing it to catch bad files
    try:
        reader = PdfReader(file.file)  # use file.file, not contents
        print(f"📄 PDF has {len(reader.pages)} pages")
    except Exception as e:
        print(f"❌ Error reading PDF: {e}")

    return JSONResponse(content={
        "filename": file.filename,
        "size": len(contents),
        "message": "Upload successful"
    })

