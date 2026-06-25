
from services.stock_service import get_current_stock_price
from services.mutualfund_service import get_current_nav, get_fund_price

COUNTRY_CONFIG = {
    "IND": {
        "countryName": "India",
        "currencyCode": "INR",
        "currencySymbol": "₹",
        "market": "NSE/BSE"
    },
    "USA": {
        "countryName": "United States",
        "currencyCode": "USD",
        "currencySymbol": "$",
        "market": "NASDAQ/NYSE"
    },
    "GBR": {
        "countryName": "United Kingdom",
        "currencyCode": "GBP",
        "currencySymbol": "£",
        "market": "LSE"
    }
}

def calculate_equity_portfolio(equities, country_code):
    processed=[]
    total_investment=0
    total_current_value=0
    for stock in equities:
        qty=float(stock["Quantity"])
        avg_price=float(stock["Average_Price"])
        if country_code == "IND":
            current_price=get_current_stock_price(stock["Symbol"], stock["Exchange"], country_code)
        elif country_code == "USA":
            current_price=get_current_stock_price(stock["Symbol"], stock["Exchange"], country_code)
        else:
            current_price=0
        investment=qty*avg_price
        current_value=qty*current_price
        profit=current_value-investment
        return_pct=(profit/investment*100) if investment>0 else 0
        processed.append({**stock,"CurrentPrice":round(current_price,2),"Investment":round(investment,2),"CurrentValue":round(current_value,2),"ProfitLoss":round(profit,2),"ReturnPct":round(return_pct,2)})
        total_investment += investment
        total_current_value += current_value
    return processed,total_investment,total_current_value

def calculate_mutual_funds(funds, country_code):
    processed=[]
    total_investment=0
    total_current_value=0
    for fund in funds:
        units=float(fund["units"])
        avg_nav=float(fund["average_nav"])
        if country_code == "IND":
            current_nav=get_current_nav(fund["isin"])
        elif country_code == "USA":
            current_nav=get_fund_price(fund["ticker"])
        else:
            current_nav=0
        investment=units*avg_nav
        current_value=units*current_nav
        profit=current_value-investment
        return_pct=(profit/investment*100) if investment>0 else 0
        processed.append({**fund,"CurrentNAV":round(current_nav,2),"Investment":round(investment,2),"CurrentValue":round(current_value,2),"ProfitLoss":round(profit,2),"ReturnPct":round(return_pct,2)})
        total_investment += investment
        total_current_value += current_value
    return processed,total_investment,total_current_value

SECTOR_MAPPING = {
    "TCS": "IT",
    "INFY": "IT",
    "WIPRO": "IT",
    "SBIN": "Banking",
    "HDFCBANK": "Banking",
    "ICICIBANK": "Banking",
    "RELIANCE": "Energy"
}

def get_portfolio_allocation(equities, mutual_funds):
    equity_value = sum(x["CurrentValue"] for x in equities)
    mf_value = sum(x["CurrentValue"] for x in mutual_funds)

    return [
        {
            "name": "Equity",
            "value": round(equity_value, 2)
        },
        {
            "name": "Mutual Fund",
            "value": round(mf_value, 2)
        }
    ]


def get_sector_allocation(equities):
    sectors = {}

    for stock in equities:
        sector = SECTOR_MAPPING.get(
            stock["Symbol"].upper(),
            "Others"
        )

        sectors[sector] = (
            sectors.get(sector, 0)
            + stock["CurrentValue"]
        )

    return [
        {
            "sector": sector,
            "value": round(value, 2)
        }
        for sector, value in sectors.items()
    ]

def build_dashboard(excel_data):
    investor_list = excel_data.get("investor", [])
    investor = (
    investor_list[0]
    if investor_list
    else {}
    )

    country_code = (
        investor.get("Country", "IND")
        .strip()
        .upper()
    )

    config = COUNTRY_CONFIG.get(
        country_code,
        COUNTRY_CONFIG["IND"]
    )
    pe,eq_inv,eq_cur = calculate_equity_portfolio(excel_data["equities"], country_code)
    pm,mf_inv,mf_cur = calculate_mutual_funds(excel_data["mutualFunds"], country_code)
    total_investment = eq_inv + mf_inv
    total_current = eq_cur + mf_cur
    profit = total_current - total_investment
    return_pct = (profit/total_investment*100) if total_investment>0 else 0
    portfolio_allocation = get_portfolio_allocation(pe,pm)
    sector_allocation = get_sector_allocation(pe)
    return {
        "investor": {
            "name": investor.get("Name"),
            "email": investor.get("Email"),
            "country": config["countryName"],
            "countryCode": country_code
        },
        "currencyCode": config["currencyCode"],
        "currencySymbol": config["currencySymbol"],
        "summary":{
            "investment":round(total_investment,2),
            "currentValue":round(total_current,2),
            "profitLoss":round(profit,2),
            "returnPct":round(return_pct,2)
        },
        "portfolioAllocation": portfolio_allocation,
        "sectorAllocation": sector_allocation,
        "equities":pe if country_code == "IND" else [],
        "mutualFunds":pm
    }
