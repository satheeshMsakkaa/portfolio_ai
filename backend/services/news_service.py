import requests
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GNEWS_API_KEY")

def get_news(query):
    query = f"{query} stock India OR market"

    response = requests.get(
        "https://gnews.io/api/v4/search",
        params={
            "q": query,
            "token": api_key,
            "lang": "en",
            "max": 10
        },
        timeout=10
    )
    data = response.json()
    return data.get("articles", [])