# backend/search_engine.py
import torch
import torch.nn.functional as F
from transformers import AutoTokenizer, AutoModel

model_name = "sentence-transformers/all-MiniLM-L6-v2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)

def embed(texts, batch_size=32):
    all_embeddings = []
    for i in range(0, len(texts), batch_size):
        batch = texts[i:i+batch_size]
        inputs = tokenizer(batch, return_tensors="pt", padding=True, truncation=True)
        with torch.no_grad():
            outputs = model(**inputs)
            embeddings = outputs.last_hidden_state[:, 0, :]
            embeddings = F.normalize(embeddings, p=2, dim=1)
        all_embeddings.append(embeddings)
    return torch.cat(all_embeddings, dim=0)

def semantic_search(query, paragraphs, paragraph_embeddings, top_k=5):
    query_embedding = embed([query])[0]
    scores = torch.matmul(paragraph_embeddings, query_embedding)
    top_indices = torch.topk(scores, k=top_k).indices

    results = [
        {
            "score": scores[i].item(),
            "paragraph": paragraphs[i],
            "index": i
        }
        for i in top_indices
    ]
    return results