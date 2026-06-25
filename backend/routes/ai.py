
from fastapi import APIRouter
from services.ai_service import generate_insights
from services.healthscore_service import calculate_health_score
from services.rebalance_service import generate_rebalancing

router = APIRouter(prefix="/api/ai", tags=["AI"])

@router.post("/analyze")
def analyze(dashboard: dict):
    return {
        "healthScore": calculate_health_score(dashboard),
        "insights": generate_insights(dashboard),
        "rebalancing": generate_rebalancing()
    }
