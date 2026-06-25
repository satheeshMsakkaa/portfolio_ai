
from fastapi import APIRouter, UploadFile, File, HTTPException
from services.excel_service import parse_excel

router = APIRouter(prefix="/api", tags=["Upload"])

@router.post("/upload")
async def upload_excel(file: UploadFile = File(...)):
    try:
        result = parse_excel(file.file)
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
