
from providers.gemini_provider import ask_gemini
from providers.openrouter_provider import ask_openrouter

def generate_insights(dashboard):
    prompt = f"Analyze Portfolio: {dashboard}"
    try:
        return ask_gemini(prompt)
    except Exception:
        return ask_openrouter(prompt)

def ask_ai(question, portfolio):
    prompt = f"Portfolio:{portfolio}\nQuestion:{question}"
    try:
        return ask_gemini(prompt)
    except Exception:
        return ask_openrouter(prompt)
