
from fastapi import APIRouter
from services.news_service import get_news

router = APIRouter(prefix="/api/news", tags=["News"])

@router.get("")
def news(query: str):
    return {"articles": get_news(query)}
