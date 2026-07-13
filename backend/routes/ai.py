
from fastapi import APIRouter
from services.ai_service import generate_ai_data
from services.rebalance_service import generate_rebalancing

router = APIRouter(prefix="/api/ai", tags=["AI"])

@router.post("/analyze")
def analyze(dashboard: dict):
    return {
        "aiResponse": generate_ai_data(dashboard)
    }
