from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak
)
from io import BytesIO
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch
from datetime import datetime


def add_page_number(canvas, doc):
    canvas.saveState()

    canvas.setFont(
        "Helvetica",
        9
    )

    page_num = canvas.getPageNumber()

    canvas.drawRightString(
        560,
        20,
        f"Page {page_num}"
    )

    canvas.restoreState()

def generate_portfolio_pdf(dashboard, ai_data):

    buffer = BytesIO()

    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        leftMargin=20,
        rightMargin=20,
        topMargin=30,
        bottomMargin=30
    )
    styles = getSampleStyleSheet()
    elements = []

    summary = dashboard["summary"]
    ai_response = ai_data["aiResponse"]
    currencySymbol = dashboard.get("currencyCode", "USD")

    # ==================================================
    # TITLE
    # ==================================================

    elements.append(
        Paragraph(
            "<font size='20'><b>AI Portfolio Analytics Report (POC)</b></font>",
            styles["Title"]
        )
    )

    elements.append(Spacer(1, 20))

    elements.append(
        Paragraph(
            f"<para alignment='right'>"
            f"Generated: "
            f"{datetime.now().strftime('%d-%b-%Y %H:%M %p')}"
            f"</para>",
            styles["Normal"]
        )
    )

    elements.append(Spacer(1, 20))

    # ==================================================
    # INVESTOR DETAILS
    # ==================================================

    investor = dashboard["investor"]

    elements.append(
        Paragraph(
            "<b><u>Investor Details</u></b>",
            styles["Heading2"]
        )
    )

    investor_table = [
        ["Name", investor.get("name", "-")],
        ["Email", investor.get("email", "-")],
        ["Country", investor.get("country", "-")],
        ["Currency", dashboard.get("currencyCode", "USD")],
    ]

    table = Table(
        investor_table,
        colWidths=[150, 350]
    )

    table.setStyle(
        TableStyle([
            ("BACKGROUND",(0,0),(0,-1),colors.lightgrey),
            ("GRID",(0,0),(-1,-1),1,colors.black),
            ("PADDING",(0,0),(-1,-1),8),
            ("FONTNAME",(0,0),(-1,-1),"Helvetica"),
        ])
    )

    elements.append(table)
    elements.append(Spacer(1,20))

    # ==================================================
    # SUMMARY
    # ==================================================

    elements.append(
        Paragraph(
            "<center><b><u>Portfolio Summary</u></b></center>",
            styles["Heading2"]
        )
    )

    summary_table = [
        ["Investment",
         f"{currencySymbol} {summary['investment']:,.2f}"],

        ["Current Value",
         f"{currencySymbol} {summary['currentValue']:,.2f}"],

        ["Profit / Loss",
         f"{currencySymbol} {summary['profitLoss']:,.2f}"],

        ["Return %",
         f"{summary['returnPct']}%"]
    ]

    table = Table(summary_table, colWidths=[250, 250])

    table.setStyle(
        TableStyle([
            ("BACKGROUND", (0,0), (-1,0), colors.lightgrey),
            ("GRID",(0,0),(-1,-1),1,colors.black),
            ("FONTNAME",(0,0),(-1,-1),"Helvetica"),
            ("PADDING",(0,0),(-1,-1),8),
        ])
    )

    elements.append(table)
    elements.append(Spacer(1,20))

    # ==================================================
    # EQUITIES
    # ==================================================

    elements.append(
        Paragraph(
            "<b><u>Equity</u></b>",
            styles["Heading2"]
        )
    )

    equity_data = [[
        "Symbol",
        "Qty",
        "Buy",
        "Current",
        "Investment",
        "Current Value",
        "P/L",
        "Return %"
    ]]

    for e in dashboard["equities"]:
        equity_data.append([
            e["Symbol"],
            e["Quantity"],
            f"{currencySymbol} {e['Average_Price']:,.2f}",
            f"{currencySymbol} {e['CurrentPrice']:,.2f}",
            f"{currencySymbol} {e['Investment']:,.2f}",
            f"{currencySymbol} {e['CurrentValue']:,.2f}",
            f"{currencySymbol} {e['ProfitLoss']:,.2f}",
            f"{e['ReturnPct']}%"
        ])

    table = Table(
        equity_data,
        colWidths=[
            70,   # Symbol
            40,   # Qty
            60,   # Buy
            60,   # Current
            80,   # Investment
            90,   # Current Value
            70,   # P/L
            60    # Return
        ]
    )

    table.setStyle(
        TableStyle([
            ("BACKGROUND",(0,0),(-1,0),
             colors.darkblue),
            ("TEXTCOLOR",(0,0),(-1,0),
             colors.white),
            ("GRID",(0,0),(-1,-1),
             1,colors.black),
            ("FONTSIZE",(0,0),(-1,-1),9),
            ("PADDING",(0,0),(-1,-1),6),
        ])
    )

    elements.append(table)
    elements.append(Spacer(1,20))

    # ==================================================
    # MUTUAL FUNDS
    # ==================================================

    if dashboard["mutualFunds"]:

        elements.append(
            Paragraph(
                "<b><u>Funds</u></b>",
                styles["Heading2"]
            )
        )

        mf_data = [[
            "Fund",
            "NAV",
            "Units",
            "Investment",
            "Current",
            "P/L",
            "Return%"
        ]]

        for mf in dashboard["mutualFunds"]:
            mf_data.append([
                mf["fund_name"],
                mf["CurrentNAV"],
                mf["units"],
                f"{currencySymbol} {mf['Investment']:,.2f}",
                f"{currencySymbol} {mf['CurrentValue']:,.2f}",
                f"{currencySymbol} {mf['ProfitLoss']:,.2f}",
                f"{mf['ReturnPct']}%"
            ])

        table = Table(
            mf_data,
            colWidths=[
                200,
                40,
                40,
                60,
                60,
                70,
                60
            ]
        )

        table.setStyle(
            TableStyle([
                ("BACKGROUND",
                 (0,0),(-1,0),
                 colors.green),

                ("TEXTCOLOR",
                 (0,0),(-1,0),
                 colors.white),

                ("GRID",
                 (0,0),(-1,-1),
                 1,colors.black),

                ("FONTSIZE",
                 (0,0),(-1,-1),
                 8),
            ])
        )

        elements.append(table)
        elements.append(Spacer(1,20))

    # ==================================================
    # AI HEALTH
    # ==================================================

    elements.append(PageBreak())
    elements.append(
        Paragraph(
            "<b><u>AI Portfolio Health Score</u></b>",
            styles["Heading2"]
        )
    )

    elements.append(
        Paragraph(
            f"<font size='16'><b>{ai_response['healthScore']}/100</b></font>",
            styles["Normal"]
        )
    )

    elements.append(Spacer(1,20))

    # ==================================================
    # AI INSIGHTS
    # ==================================================

    elements.append(
        Paragraph(
            "<b>AI Insights</b>",
            styles["Heading2"]
        )
    )

    insights = str(ai_response["insights"])

    insights = insights.replace(
        "\n",
        "<br/>"
    )

    elements.append(
        Paragraph(
            insights,
            styles["Normal"]
        )
    )

    elements.append(Spacer(1,20))

    # ==================================================
    # REBALANCING
    # ==================================================

    elements.append(
        Paragraph(
            "<b>AI Rebalancing Suggestions</b>",
            styles["Heading2"]
        )
    )

    for action in ai_response["rebalancing"]["actions"]:
        elements.append(
            Paragraph(
                f"• {action}",
                styles["Normal"]
            )
        )
    
    # ==================================================
    # EXECUTIVE SUMMARY
    # ==================================================

    if ai_response.get("executiveSummary"):
        elements.append(
            Paragraph(
                "<b><u>Executive Summary</u></b>",
                styles["Heading2"]
            )
        )

        elements.append(
            Paragraph(
                ai_response["executiveSummary"],
                styles["Normal"]
            )
        )

        elements.append(Spacer(1, 15))
    
    # ==================================================
    # NARRATIVE INSIGHTS
    # ==================================================

    if ai_response.get("narrativeInsights"):

        elements.append(
            Paragraph(
                "<b><u>Narrative Insights</u></b>",
                styles["Heading2"]
            )
        )

        for item in ai_response["narrativeInsights"]:
            elements.append(
                Paragraph(
                    f"• {item}",
                    styles["Normal"]
                )
            )

        elements.append(Spacer(1,15))
    
    # ==================================================
    # PORTFOLIO STRENGTHS
    # ==================================================

    if ai_response.get("portfolioStrengths"):

        elements.append(
            Paragraph(
                "<b><u>Portfolio Strengths</u></b>",
                styles["Heading2"]
            )
        )

        for item in ai_response["portfolioStrengths"]:
            elements.append(
                Paragraph(
                    f"✓ {item}",
                    styles["Normal"]
                )
            )

        elements.append(Spacer(1,15))
    
    # ==================================================
    # PORTFOLIO WEAKNESSES
    # ==================================================

    if ai_response.get("portfolioWeaknesses"):

        elements.append(
            Paragraph(
                "<b><u>Portfolio Weaknesses</u></b>",
                styles["Heading2"]
            )
        )

        for item in ai_response["portfolioWeaknesses"]:
            elements.append(
                Paragraph(
                    f"• {item}",
                    styles["Normal"]
                )
            )

        elements.append(Spacer(1,15))
    
    # ==================================================
    # NEXT BEST ACTIONS
    # ==================================================

    if ai_response.get("nextBestActions"):

        elements.append(
            Paragraph(
                "<b><u>Next Best Actions</u></b>",
                styles["Heading2"]
            )
        )

        for action in ai_response["nextBestActions"]:
            elements.append(
                Paragraph(
                    f"✓ {action}",
                    styles["Normal"]
                )
            )

        elements.append(Spacer(1,15))

    # ==================================================
    # REBALANCE SUGGESTIONS
    # ==================================================

    if ai_response.get("rebalanceSuggestions"):

        elements.append(
            Paragraph(
                "<b><u>Rebalance Suggestions</u></b>",
                styles["Heading2"]
            )
        )

        for item in ai_response["rebalanceSuggestions"]:
            elements.append(
                Paragraph(
                    f"• {item}",
                    styles["Normal"]
                )
            )

        elements.append(Spacer(1,15))

    # ==================================================
    # MARKET OUTLOOK
    # ==================================================

    market = ai_response.get("marketOutlook")

    if market:

        elements.append(
            Paragraph(
                "<b><u>Market Outlook</u></b>",
                styles["Heading2"]
            )
        )

        elements.append(
            Paragraph(
                f"<b>Outlook:</b> {market.get('outlook','')}",
                styles["Normal"]
            )
        )

        elements.append(Spacer(1,5))

        for trend in market.get("trends",[]):
            elements.append(
                Paragraph(
                    f"• {trend}",
                    styles["Normal"]
                )
            )

        elements.append(Spacer(1,15))

    doc.build(
        elements,
        onFirstPage=add_page_number,
        onLaterPages=add_page_number
    )

    buffer.seek(0)

    return buffer