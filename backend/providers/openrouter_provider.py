import os
import time
import requests

from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("OPENROUTER_API_KEY")


def ask_openrouter(prompt):

    models = [
        "deepseek/deepseek-chat",
        "deepseek/deepseek-chat-v3-0324:free",
        "google/gemma-3-27b-it:free"
    ]

    for model in models:

        start = time.time()

        try:

            response = requests.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization":
                    f"Bearer {api_key}",
                    "Content-Type":
                    "application/json"
                },
                json={
                    "model": model,
                    "messages": [
                        {
                            "role": "user",
                            "content": prompt
                        }
                    ]
                }
            )

            data = response.json()

            if response.status_code == 200:

                usage = data.get("usage", {})

                return {
                    "success": True,
                    "provider": "openrouter",
                    "model": model,
                    "response":
                        data["choices"][0]
                            ["message"]["content"],
                    "error": None,
                    "response_time_ms":
                        int((time.time()-start)*1000),
                    "prompt_tokens":
                        usage.get("prompt_tokens"),
                    "completion_tokens":
                        usage.get(
                            "completion_tokens"
                        ),
                    "total_tokens":
                        usage.get("total_tokens")
                }

        except Exception as e:

            return {
                "success": False,
                "provider": "openrouter",
                "model": model,
                "response": None,
                "error": str(e),
                "response_time_ms":
                    int((time.time()-start)*1000)
            }

    return {
        "success": False,
        "provider": "openrouter",
        "model": None,
        "response": None,
        "error": "All models failed"
    }