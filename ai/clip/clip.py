import requests
import torch
from PIL import Image
from transformers import AutoProcessor, AutoModel
from sentence_transformers import util
import numpy as np

# Load model and processor
model = AutoModel.from_pretrained("openai/clip-vit-base-patch32", dtype=torch.bfloat16, attn_implementation="sdpa")
processor = AutoProcessor.from_pretrained("openai/clip-vit-base-patch32", use_fast=True)

# Load image
url = "http://images.cocodataset.org/val2017/000000039769.jpg"
image = Image.open(requests.get(url, stream=True).raw)
labels = ["a photo of a cat", "a photo of a dog", "a photo of a car"]

# Process image separately to get image embedding
image_inputs = processor(images=image, return_tensors="pt")
with torch.no_grad():
  image_outputs = model.get_image_features(**image_inputs)
  image_embedding = image_outputs # / image_outputs.norm(p=2, dim=-1, keepdim=True)

# Process text separately to get text embeddings
text_inputs = processor(text=labels, return_tensors="pt", padding=True)
with torch.no_grad():
  text_outputs = model.get_text_features(**text_inputs)
  text_embeddings = text_outputs # / text_outputs.norm(p=2, dim=-1, keepdim=True)

print("Image embedding shape:", image_embedding.shape)
print("Text embeddings shape:", text_embeddings.shape)

# Calculate cosine similarities manually
similarities = []
for i, label in enumerate(labels):
  similarity = util.pytorch_cos_sim(image_embedding[0], text_embeddings[i])
  similarities.append(similarity)
  print(f"Cosine similarity with '{label}': {similarity}")