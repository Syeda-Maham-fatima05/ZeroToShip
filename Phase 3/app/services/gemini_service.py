import json
import google.generativeai as genai
from app.config import GEMINI_API_KEY

# Configure Gemini
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.0-flash")


def _fallback_extract_intent(user_query: str):
    query_lower = user_query.lower()

    # Service mappings (English, Roman Urdu, Urdu script)
    service_mappings = {
        "plumber": ["plumber", "plumb", "پلمبر", "نل ساز", "پائپ"],
        "electrician": ["electrician", "electric", "الیکٹریشن", "بجلی والا", "بجلی"],
        "AC technician": ["ac technician", "ac", "air condition", "اے سی", "ای سی", "ایسی"],
        "cleaner": ["cleaner", "clean", "صفائی", "سفائی", "خاکروب"],
        "carpenter": ["carpenter", "کارپینٹر", "بڑئی", "لکڑی"],
        "painter": ["painter", "پینٹر", "رنگ"],
        "gardener": ["gardener", "مالی"],
        "mechanic": ["mechanic", "مکینک", "مکینک"]
    }

    found_service = None
    for canonical, keywords in service_mappings.items():
        if any(kw in query_lower or kw in user_query for kw in keywords):
            found_service = canonical
            break

    # Location mappings (English, Roman Urdu, Urdu script)
    location_mappings = {
        "Gulshan": ["gulshan", "گلشن"],
        "DHA": ["dha", "ڈی ایچ اے", "ڈیایچاے"],
        "Clifton": ["clifton", "کلفٹن"],
        "Johar": ["johar", "جوہر"],
        "North Nazimabad": ["north nazimabad", "ناظم آباد", "ناظماباد"],
        "PECHS": ["pechs", "پی ایچ ایس"],
        "Bahria": ["bahria", "بحریہ"]
    }

    found_location = None
    for canonical, keywords in location_mappings.items():
        if any(kw in query_lower or kw in user_query for kw in keywords):
            found_location = canonical
            break

    # Time mappings (English, Roman Urdu, Urdu script)
    time_mappings = {
        "tomorrow morning": ["tomorrow morning", "kal subah", "کل صبح"],
        "tomorrow": ["tomorrow", "kal", "کل"],
        "today": ["today", "aaj", "آج"],
        "tonight": ["tonight", "aaj raat", "آج رات", "رات"]
    }

    found_time = None
    for canonical, keywords in time_mappings.items():
        if any(kw in query_lower or kw in user_query for kw in keywords):
            found_time = canonical
            break

    return {
        "service": found_service,
        "location": found_location,
        "time": found_time
    }


def extract_intent(user_query: str):
    """
    Extracts service, location, time using Gemini AI (with Urdu script support) and fallback.
    Returns a Python dictionary.
    """

    prompt = f"""
You are an AI assistant for a Smart Local Service Orchestrator.

Your task is to extract ONLY the following information from the user's request, regardless of whether the input is in English, Roman Urdu, or Urdu script (اردو).

Translate extracted values into standard English terms (e.g. "الیکٹریشن" -> "electrician", "گلشن" -> "Gulshan", "کل" -> "tomorrow").

Return ONLY valid JSON.

Required JSON format:

{{
    "service": "",
    "location": "",
    "time": ""
}}

Examples:

User: "I need a plumber in Gulshan tomorrow morning."
Output: {{"service":"plumber", "location":"Gulshan", "time":"tomorrow morning"}}

User: "Mujhe kal Gulshan mein AC technician chahiye."
Output: {{"service":"AC technician", "location":"Gulshan", "time":"tomorrow"}}

User: "مجھے گلشن میں الیکٹریشن چاہیے"
Output: {{"service":"electrician", "location":"Gulshan", "time":""}}

User: "ڈی ایچ اے میں پلمبر چاہیے کل"
Output: {{"service":"plumber", "location":"DHA", "time":"tomorrow"}}

User Request:
{user_query}
"""

    try:
        response = model.generate_content(prompt)
        text = response.text.strip()

        if text.startswith("```json"):
            text = text.replace("```json", "").replace("```", "").strip()
        elif text.startswith("```"):
            text = text.replace("```", "").strip()

        data = json.loads(text)
        if isinstance(data, dict) and "service" in data and data["service"]:
            return data
    except Exception as e:
        print(f"[Gemini Warning] AI intent extraction error: {e}")

    return _fallback_extract_intent(user_query)


def generate_provider_explanation(provider, intent):
    """
    Uses Gemini to generate a simple explanation with fallback.
    """
    fallback_exp = (
        f"{provider.name} was selected because they offer {provider.service_type} "
        f"in {provider.location or 'your area'} with a rating of {provider.rating}."
    )

    prompt = f"""
You are an AI assistant.
A provider has already been selected by the ranking algorithm.
Write ONE short, simple explanation (2-3 sentences maximum).

User Request:
Service: {intent.get("service")}
Location: {intent.get("location")}
Preferred Time: {intent.get("time")}

Selected Provider:
Name: {provider.name}
Service: {provider.service_type}
Location: {provider.location}
Rating: {provider.rating}
Availability: {provider.availability}

Explain why this provider is the best choice. Concise and friendly.
"""

    try:
        response = model.generate_content(prompt)
        if response.text and response.text.strip():
            return response.text.strip()
    except Exception as e:
        print(f"[Gemini Warning] AI explanation error: {e}")

    return fallback_exp