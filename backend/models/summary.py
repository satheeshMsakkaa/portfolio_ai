
from pydantic import BaseModel

class PortfolioSummary(BaseModel):
    investment: float
    current_value: float
    profit_loss: float
    return_percentage: float
