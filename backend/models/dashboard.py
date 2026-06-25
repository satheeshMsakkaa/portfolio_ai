
from pydantic import BaseModel

class DashboardResponse(BaseModel):
    summary: dict
    equities: list
    mutualFunds: list
