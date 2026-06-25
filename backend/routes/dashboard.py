
from fastapi import APIRouter, UploadFile, File
from services.excel_service import parse_excel
from services.portfolio_service import build_dashboard

router = APIRouter(prefix="/api", tags=["Dashboard"])

@router.post("/dashboard")
async def dashboard(file: UploadFile = File(...)):
    data = parse_excel(file.file)
    return build_dashboard(data)
