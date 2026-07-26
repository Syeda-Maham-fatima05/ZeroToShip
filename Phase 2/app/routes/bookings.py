from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models import Booking, User

router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"]
)


# ==========================================
# Get My Bookings
# ==========================================

@router.get("/my-bookings")
def get_my_bookings(

    current_user: User = Depends(get_current_user),

    db: Session = Depends(get_db)

):

    bookings = (

        db.query(Booking)

        .filter(
            Booking.user_id == current_user.user_id
        )

        .all()

    )

    return bookings


# ==========================================
# Booking Details
# ==========================================

@router.get("/{booking_id}")
def booking_details(

    booking_id: int,

    current_user: User = Depends(get_current_user),

    db: Session = Depends(get_db)

):

    booking = (

        db.query(Booking)

        .filter(
            Booking.booking_id == booking_id
        )

        .first()

    )

    if booking is None:

        return {
            "message": "Booking not found."
        }

    if booking.user_id != current_user.user_id:

        return {
            "message": "Access denied."
        }

    return booking