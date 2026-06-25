
from pydantic import BaseModel

class MutualFund(BaseModel):
    fund_name: str
    isin: str
    units: float
    average_nav: float
