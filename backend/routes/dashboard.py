
from fastapi import APIRouter, UploadFile, File
from services.excel_service import parse_excel
from services.portfolio_service import build_dashboard

from fastapi.responses import StreamingResponse
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from services.pdf_service import generate_portfolio_pdf
from datetime import datetime
import re

router = APIRouter(prefix="/api", tags=["Dashboard"])

@router.post("/dashboard")
async def dashboard(file: UploadFile = File(...)):
    data = parse_excel(file.file)
    return build_dashboard(data)

def generate_filename(dashboard):
    investor = dashboard.get("investor", {})

    name = investor.get("name", "Investor")

    # Remove invalid filename characters
    name = re.sub(r'[^a-zA-Z0-9_ ]', '', name)
    name = name.replace(" ", "_")

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    return f"{name}_Portfolio_Report_{timestamp}.pdf"

@router.post("/report")
def download_report(payload: dict):

    pdf_buffer = generate_portfolio_pdf(
        payload["dashboard"],
        payload["ai"]
    )

    investor = payload["dashboard"]["investor"]

    name = investor.get("name", "Investor")
    name = re.sub(r'[^a-zA-Z0-9 ]', '', name)
    name = name.replace(" ", "_")

    filename = (
        f"AI_Portfolio_Report_"
        f"{name}_"
        f"{datetime.now():%Y%m%d_%H%M%S}.pdf"
    )

    return StreamingResponse(
        pdf_buffer,
        media_type="application/pdf",
        headers={
            "Content-Disposition":
                f'attachment; filename="{filename}"'
        }
    )
