import os
import time
import requests

from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

MODEL = "llama-3.3-70b-versatile"

def ask_groq(prompt):
    start = time.time()
    try:
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            },
            json={
                "model": MODEL,
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                "temperature": 0.3
            },
            timeout=60
        )

        data = response.json()

        if response.status_code != 200:
            return {
                "success": False,
                "provider": "groq",
                "model": MODEL,
                "response": None,
                "error": data,
                "response_time_ms": int(
                    (time.time() - start) * 1000
                )
            }

        usage = data.get("usage", {})

        return {
            "success": True,
            "provider": "groq",
            "model": MODEL,
            "response": data["choices"][0]["message"]["content"],
            "error": None,
            "response_time_ms": int(
                (time.time() - start) * 1000
            ),
            "prompt_tokens": usage.get("prompt_tokens"),
            "completion_tokens": usage.get("completion_tokens"),
            "total_tokens": usage.get("total_tokens")
        }

    except Exception as e:

        return {
            "success": False,
            "provider": "groq",
            "model": MODEL,
            "response": None,
            "error": str(e),
            "response_time_ms": int(
                (time.time() - start) * 1000
            )
        }