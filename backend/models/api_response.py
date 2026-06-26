from pydantic import BaseModel
from typing import Optional


class ApiResponse(BaseModel):
    success: bool

    provider: Optional[str] = None
    model: Optional[str] = None

    message: Optional[str] = None
    response: Optional[str] = None

    error: Optional[str] = None

    response_time_ms: Optional[int] = None

    prompt_tokens: Optional[int] = None
    completion_tokens: Optional[int] = None
    total_tokens: Optional[int] = None