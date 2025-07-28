# backend/search_engine.py
import torch
import torch.nn.functional as F
from transformers import AutoTokenizer, AutoModel

model_name = "sentence-transformers/all-mpnet-base-v2"
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)
model.to(device)

def embed(texts, batch_size=32):
    all_embeddings = []
    for i in range(0, len(texts), batch_size):
        batch = texts[i:i+batch_size]
        inputs = tokenizer(batch, return_tensors="pt", padding=True, truncation=True)
        with torch.no_grad():
            model.eval()
            outputs = model(**inputs)
            embeddings = outputs.last_hidden_state[:, 0, :]
            embeddings = F.normalize(embeddings, p=2, dim=1)
        all_embeddings.append(embeddings)
    return torch.cat(all_embeddings, dim=0)

def semantic_search(query, paragraphs, paragraph_embeddings, top_k=5):
    query_embedding = embed([query])[0]
    scores = F.cosine_similarity(paragraph_embeddings, query_embedding.unsqueeze(0))

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