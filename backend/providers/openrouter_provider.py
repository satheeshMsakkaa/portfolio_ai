import os
from dotenv import load_dotenv
import requests

load_dotenv()
api_key = os.getenv("OPENROUTER_API_KEY")

def ask_openrouter(prompt):
    models = [
        "deepseek/deepseek-chat",
        "mistralai/mistral-7b-instruct",
        "google/gemma-3-27b-it:free",
        "liquid/lfm-2.5-1.2b-thinking:free",
        "openai/gpt-oss-20b:free"
    ]

    for model in models:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            },
            json={
                "model": model,
                "messages": [
                    {"role": "user", "content": prompt}
                ]
            }
        )

        data = response.json()

        if response.status_code != 200:
            return {"error": data}

        if "choices" in data:
            return data["choices"][0]["message"]["content"]

    return "AI service unavailable."