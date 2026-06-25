
from pydantic import BaseModel

class Investor(BaseModel):
    name: str
    email: str
