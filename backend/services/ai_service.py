
from providers.gemini_provider import ask_gemini
from providers.openrouter_provider import ask_openrouter
from providers.groq_provider import ask_groq

def generate_insights(dashboard):
    prompt = f"Analyze Portfolio: {dashboard}"
    
    # Try Gemini first
    result = ask_gemini(prompt)

    if result["success"]:
        return result

    # Fallback to OpenRouter
    return ask_openrouter(prompt)

    if result["success"]:
        return result

    # Final fallback to Groq
    result = ask_groq(prompt)

def ask_ai(question, portfolio):
    prompt = f"Portfolio:{portfolio}\nQuestion:{question}"

    # Try Gemini first
    #result = ask_gemini(prompt)

    #if result["success"]:
    #    return result

    # Final fallback to OpenRouter
    #return ask_openrouter(prompt)

    #if result["success"]:
    #    return result

    # Final Fallback to Groq
    result = ask_groq(prompt)
    if result["success"]:
        return result
    
