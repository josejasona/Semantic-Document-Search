from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import torch
from your_embedding_module import embed, paragraphs, paragraph_embeddings, search_with_context

app = FastAPI()

# Allow React frontend (adjust if your port is different)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str

@app.post("/search")
def search(request: QueryRequest):
    results = search_with_context(request.query, paragraphs, paragraph_embeddings, top_k=5)
    return {"results": results}
