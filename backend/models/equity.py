
from pydantic import BaseModel

class Equity(BaseModel):
    symbol: str
    exchange: str
    quantity: float
    average_price: float
