from typing import Optional
from sqlalchemy.orm import Session
from app.models import Provider


def rank_provider(
    db: Session,
    service: str,
    location: Optional[str] = None
) -> Optional[Provider]:
    """
    Ranks and selects the best provider based on service/category matching,
    location/neighborhood_zone matching, and rating.
    """
    if not service:
        return None

    query = db.query(Provider).filter(
        Provider.category.ilike(f"%{service}%")
    )

    if location:
        location_match = (
            query.filter(Provider.neighborhood_zone.ilike(f"%{location}%"))
            .order_by(Provider.rating.desc())
            .first()
        )
        if location_match:
            return location_match

    return query.order_by(Provider.rating.desc()).first()
