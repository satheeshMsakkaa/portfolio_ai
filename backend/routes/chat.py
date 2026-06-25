
from fastapi import APIRouter
from services.ai_service import ask_ai

router = APIRouter(prefix="/api/chat", tags=["Chat"])

@router.post("")
def chat(payload: dict):
    return {"answer": ask_ai(payload["question"], payload["portfolio"])}
