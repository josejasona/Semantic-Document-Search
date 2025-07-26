from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader
from fastapi.responses import JSONResponse
from search_engine import semantic_search, embed
import io

paragraph_embeddings = []
paragraphs = []


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
    print("📥 Hit /search")  # Add this

    query = request.query  # ✅ Extract string


    # your search logic here
    results = semantic_search(query, paragraphs, paragraph_embeddings)

    for result in results:
        print(f"Score: {result['score']:.4f}")
        print(f"Paragraph: {result['paragraph']}\n")
        print("==================================================")

    return results

@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    print("📥 Hit /upload-pdf")  # Add this
    global paragraphs, paragraph_embeddings

    contents = await file.read()
    reader = PdfReader(io.BytesIO(contents))
    text = ""

    for page in reader.pages:
        text += page.extract_text() + "\n"

    # Clean and split into paragraphs
    paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
    paragraph_embeddings = embed(paragraphs)

    return {"message": "PDF uploaded and processed", "paragraphs": len(paragraphs)}

