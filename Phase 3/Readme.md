# Smart Local Service Orchestrator – Phase 3

## Overview

Phase 3 focuses on building the AI orchestration layer of the Smart Local Service Orchestrator. The backend integrates the Gemini API to understand natural language service requests, extract structured information, search the provider database, rank suitable providers, and generate an AI-powered explanation for the recommendation.

---

## Features

* Natural language intent extraction using **Google Gemini AI**
* Supports **English, Urdu, and Roman Urdu** queries
* Extracts:

  * Service
  * Location
  * Time
* Searches providers from the MySQL database
* Filters providers based on extracted information
* Ranks providers according to rating
* Generates an AI explanation for the selected provider
* JWT-protected API endpoint
* Interactive API documentation using Swagger UI

---

## Project Structure

```
Phase 3/
│
├── app/
│   ├── routes/
|   |   └── auth.py
|   |   └── bookings.py
│   │   └── orchestrator.py
│   ├── services/
│   │   ├── gemini_service.py
│   │   └── ranking_service.py
|   ├── auth.py
│   ├── config.py
│   ├── database.py
│   ├── dependencies.py
|   ├── limiter.py
|   ├── logger.py
│   ├── models.py
│   ├── schemas.py
│   ├── main.py
|   ├── token_blacklist.py
│
├── .env
├── requirements.txt
└── README.md
```

---

## Technologies Used

* Python
* FastAPI
* Google Gemini API
* MySQL
* SQLAlchemy
* JWT Authentication
* Swagger UI
* Uvicorn

---

## API Endpoint

### POST `/api/orchestrate`

Accepts a natural language request and returns:

* Extracted intent
* Best matching provider
* AI-generated explanation

### Example Request

```json
{
  "query": "I need an electrician in Gulshan tomorrow morning."
}
```

### Example Response

```json
{
  "intent": {
    "service": "Electrician",
    "location": "Gulshan",
    "time": "Tomorrow morning"
  },
  "provider": {
    "provider_id": 3,
    "name": "Ali Electric Services",
    "service_type": "Electrician",
    "location": "Gulshan",
    "phone_number": "0312XXXXXXX",
    "rating": 4.9,
    "availability": "Available"
  },
  "explanation": "Ali Electric Services is recommended because it serves the requested area, has a high customer rating, and matches your requested service."
}
```

---

## Workflow

1. User submits a natural language request.
2. Gemini extracts structured intent.
3. Backend queries the provider database.
4. Matching providers are filtered by service and location.
5. Providers are ranked based on rating.
6. Gemini generates a short explanation.
7. The final recommendation is returned to the user.

---

## Testing

The API was tested using:

* Swagger UI (`/docs`)
* JWT Authentication
* English queries
* Urdu queries
* Roman Urdu queries

---

## Future Improvements

* Multi-turn conversations for missing information (location, time, budget)
* Budget-based provider filtering
* Real-time provider availability
* Booking confirmation workflow
* Conversation memory
* AI chat interface
* Mobile application integration

---

## Author

**Syeda Maham Fatima**

CIS Community Summer Activity 2026

NED University of Engineering & Technology

