from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    ForeignKey,
    DateTime,
    Text,
    Boolean
)

from sqlalchemy.orm import relationship

from app.database import Base


# ==========================================
# Users Table
# ==========================================

class User(Base):
    __tablename__ = "Users"

    user_id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    email = Column(String(100), unique=True, nullable=False)

    password_hash = Column(String(255), nullable=False)

    phone_number = Column(String(15))

    neighborhood_zone = Column(String(100))

    is_verified = Column(Boolean, default=False, nullable=False)

    created_at = Column(DateTime)

    bookings = relationship(
        "Booking",
        back_populates="user"
    )


# ==========================================
# Providers Table
# ==========================================

class Provider(Base):
    __tablename__ = "Providers"

    provider_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)
    neighborhood_zone = Column(String(100))
    phone_number = Column(String(20))
    rating = Column(Float)
    availability = Column(String(50))
    experience_years = Column(Integer)
    service_price = Column(Float)
    description = Column(String(500))

    bookings = relationship(
        "Booking",
        back_populates="provider"
    )

    @property
    def service_type(self) -> str:
        return self.category

    @property
    def location(self) -> str:
        return self.neighborhood_zone



# ==========================================
# Bookings Table
# ==========================================

class Booking(Base):
    __tablename__ = "Bookings"

    booking_id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("Users.user_id")
    )

    provider_id = Column(
        Integer,
        ForeignKey("Providers.provider_id")
    )

    booking_time = Column(DateTime)

    status = Column(String(50))

    customer_address = Column(String(255))

    notes = Column(Text)

    created_at = Column(DateTime)

    user = relationship(
        "User",
        back_populates="bookings"
    )

    provider = relationship(
        "Provider",
        back_populates="bookings"
    )