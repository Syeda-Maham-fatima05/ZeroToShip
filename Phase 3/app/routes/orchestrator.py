from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user

from app.schemas import (
    OrchestrateRequest,
    OrchestrateResponse,
    ExtractedIntent,
    ProviderResponse
)

from app.services.gemini_service import (
    extract_intent,
    generate_provider_explanation
)
from app.services.ranking_service import rank_provider

router = APIRouter(
    prefix="/api",
    tags=["AI Orchestrator"]
)


@router.post(
    "/orchestrate",
    response_model=OrchestrateResponse
)
def orchestrate(
    request: OrchestrateRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    intent = extract_intent(request.query)

    if intent["service"] is None:
        raise HTTPException(
            status_code=400,
            detail="Unable to extract intent."
        )

    provider = rank_provider(
        db,
        intent["service"],
        intent["location"]
    )

    if provider is None:

        return OrchestrateResponse(
            intent=ExtractedIntent(**intent),
            provider=None,
            explanation="No provider found."
        )

    explanation = generate_provider_explanation(provider, intent)


    return OrchestrateResponse(

        intent=ExtractedIntent(**intent),

        provider=ProviderResponse.model_validate(provider),

        explanation=explanation
    )
