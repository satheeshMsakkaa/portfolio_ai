import json
import re
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
    result = ask_openrouter(prompt)

    if result["success"]:
        return result

    # Final fallback to Groq
    return ask_groq(prompt)


def parse_ai_response(result):

    provider = None
    model = None

    if isinstance(result, dict):
        provider = result.get("provider")
        model = result.get("model")
        response = result.get("response", "")
    else:
        response = result

    if not isinstance(response, str):
        return response

    response = response.strip()

    response = response.replace("```json", "").replace("```", "").strip()

    match = re.search(r"\{.*\}", response, re.DOTALL)

    if match:
        try:
            data = json.loads(match.group())
            data["success"] = True
            if provider:
                data["provider"] = provider

            if model:
                data["model"] = model

            return data

        except Exception:
            pass

    return {
        "success": False,
        "provider": provider,
        "model": model,
        "error": "Invalid JSON returned by AI.",
        "raw": response
    }

def generate_ai_data(dashboard):

    prompt = f"""
        You are an expert AI Portfolio Advisor and Financial Analyst.

        =========================
        LANGUAGE REQUIREMENTS
        =========================

        - Respond ONLY in English.
        - Use professional business English.
        - Do NOT use any other language.
        - Do NOT translate the response.
        - Do NOT include markdown.
        - Do NOT include code blocks.
        - Do NOT include explanations.
        - Return ONLY a valid JSON object.

        =========================
        OUTPUT REQUIREMENTS
        =========================

        Your response MUST be a SINGLE valid JSON object.

        It MUST be parsable using Python json.loads().

        Do NOT return:

        - Markdown
        - Comments
        - Explanations
        - Notes
        - XML
        - HTML
        - YAML

        Never invent keys that are not present in the schema below.

        Use ONLY the following data types:

        - string
        - number
        - boolean
        - array
        - object

        Never use null.

        Instead use:

        - "" for strings
        - 0 for numbers
        - [] for arrays
        - {{}} for objects

        Numbers MUST NOT contain:

        - %
        - $
        - commas
        - text

        Example:

        Correct

        45.7

        Wrong

        "45.7%"

        "$45"

        =========================
        JSON SCHEMA
        =========================

        {{
            "healthScore": 0,

            "executiveSummary": "",

            "narrativeInsights": [
                "string"
            ],

            "anomalyDetection": [
                {{
                    "holding": "",
                    "issue": "",
                    "recommendation": ""
                }}
            ],

            "portfolioStrengths": [
                "string"
            ],

            "portfolioWeaknesses": [
                "string"
            ],

            "benchmarkComparison": {{
                "benchmark": "",
                "portfolioReturn": 0,
                "benchmarkReturn": 0,
                "outperformance": 0
            }},

            "riskAnalysis": {{
                "riskScore": 0,
                "riskLevel": "",
                "riskFactors": [
                    "string"
                ]
            }},

            "taxAwareAnalysis": {{
                "taxImplications": [
                    "string"
                ],
                "taxPlanningRecommendations": [
                    "string"
                ]
            }},

            "rebalancing": {{
                "currentAllocation": {{}},
                "recommendedAllocation": {{}},
                "actions": [
                    "string"
                ]
            }},

            "whatIfAnalysis": [
                {{
                    "scenario": "",
                    "impact": "",
                    "actions": [
                        "string"
                    ]
                }}
            ],

            "marketOutlook": {{
                "outlook": "",
                "trends": [
                    "string"
                ]
            }},

            "topPerformers": [
                {{
                    "holding": "",
                    "return": 0
                }}
            ],

            "underPerformers": [
                {{
                    "holding": "",
                    "return": 0
                }}
            ],

            "nextBestActions": [
                "string"
            ],

            "insights": "",

            "rebalanceSuggestions": [
                "string"
            ]
        }}

        =========================
        ANALYSIS INSTRUCTIONS
        =========================

        1. Calculate an overall Portfolio Health Score (0-100).
        2. Write an Executive Summary.
        3. Generate Narrative Insights.
        4. Detect Portfolio Anomalies.
        5. Compare portfolio performance with an appropriate benchmark.
        6. Perform Risk Analysis.
        7. Perform Tax-aware Analysis.
        8. Recommend Portfolio Rebalancing.
        9. Generate exactly THREE What-if Analysis scenarios.
        10. Identify Top Performers.
        11. Identify Underperformers.
        12. Provide a Market Outlook.
        13. Recommend Next Best Actions.
        14. Generate concise AI Insights.
        15. Generate actionable Rebalance Suggestions.

        =========================
        VALIDATION RULES
        =========================

        Before returning the response, verify that:

        1. The output is valid JSON.
        2. Every opening brace has a matching closing brace.
        3. Every array is properly closed.
        4. There are NO trailing commas.
        5. Every property name is enclosed in double quotes.
        6. Every string is enclosed in double quotes.
        7. Every number is a valid JSON number.
        8. All required keys are present.
        9. No additional keys are included.
        10. The response can be parsed successfully using Python json.loads().

        If validation fails, regenerate the ENTIRE JSON from the beginning.

        =========================
        ALLOCATION RULES
        =========================

        1. All allocation percentages MUST be numeric values only.
        2. Do NOT include the "%" symbol.
        3. Current Allocation percentages MUST sum to exactly 100 (±0.5 due to rounding).
        4. Recommended Allocation percentages MUST sum to exactly 100 (±0.5 due to rounding).
        5. No individual allocation percentage may be less than 0 or greater than 100.
        6. Do NOT invent asset classes that are not relevant to the portfolio.
        7. If Fixed Income, Cash, Gold, or other asset classes are recommended, adjust the remaining allocations so the total remains 100.
        8. Verify all allocation totals before returning the JSON.
        9. If the total exceeds or falls below 100, recalculate all allocation percentages before returning the response.

        =========================
        PORTFOLIO DATA
        =========================

        {json.dumps(dashboard, indent=2)}
    """

    result = ask_gemini(prompt)

    if result["success"]:
        return parse_ai_response(result)

    result = ask_openrouter(prompt)

    if result["success"]:
        return parse_ai_response(result)
    
    result = ask_groq(prompt)
    if result.get("success"):
        return parse_ai_response(result)
    return result

def ask_ai(question, portfolio):
    prompt = f"Portfolio:{portfolio}\nQuestion:{question}"

    # Try Gemini first
    result = ask_gemini(prompt)

    if result["success"]:
        return result

    # Final fallback to OpenRouter
    result = ask_openrouter(prompt)

    if result["success"]:
        return result

    # Final Fallback to Groq
    return ask_groq(prompt)
