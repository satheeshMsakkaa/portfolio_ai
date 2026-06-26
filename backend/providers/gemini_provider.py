import os
import time

from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)
MODEL = "gemini-2.5-flash"
model = genai.GenerativeModel(MODEL)

def ask_gemini(prompt):
    start = time.time()
    try:
        response = model.generate_content(prompt)
        return {
            "success": True,
            "provider": "google",
            "model": MODEL,
            "response": response.text,
            "error": None,
            "response_time_ms": int(
                (time.time() - start) * 1000
            )
        }
    except Exception as e:
        return {
            "success": False,
            "provider": "google",
            "model": MODEL,
            "response": None,
            "error": str(e),
            "response_time_ms": int(
                (time.time() - start) * 1000
            )
        }