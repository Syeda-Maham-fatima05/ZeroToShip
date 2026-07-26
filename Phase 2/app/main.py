from fastapi import FastAPI
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.database import engine, Base
from app.limiter import limiter
from app.routes.auth import router as auth_router
from app.routes.bookings import router as bookings_router
from app.logger import logger

# Create tables if not existing
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Smart Local Service Orchestrator",
    version="1.0.0"
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.include_router(auth_router)
app.include_router(bookings_router)


@app.on_event("startup")
def startup_event():
    logger.info("Application starting up...")


@app.get("/")
def home():
    return {
        "message": "Backend Running Successfully"
    }


@app.get("/health")
def health():
    return {
        "status": "OK"
    }