import yfinance as yf
import math


def resolve_ticker(
    symbol: str,
    exchange: str,
    country_code: str
):
    country_code = country_code.upper()
    exchange = exchange.upper()

    if country_code == "IND":

        if exchange == "NSE":
            return f"{symbol}.NS"

        if exchange == "BSE":
            return f"{symbol}.BO"

    return symbol

SECTOR_MAPPING = {
    # India
    "TCS": "Technology",
    "INFY": "Technology",
    "WIPRO": "Technology",
    "SBIN": "Financial Services",
    "HDFCBANK": "Financial Services",
    "ICICIBANK": "Financial Services",
    "RELIANCE": "Energy",
    "NTPC": "Utilities",
    "LT": "Industrials",
    "ADANIPOWER": "Utilities",
    "RVNL": "Industrials",
    "IRFC":" Financial Services",
    "HINDUNILVR": "Consumer Staples",
    "HDFC": "Financial Services",
    "ITC": "Consumer Staples",
    "MARUTI": "Consumer Discretionary",
    "BAJAJ-AUTO": "Consumer Discretionary",
    "BHARTIARTL": "Communication Services",
    "AXISBANK": "Financial Services",
    "ONGC": "Energy",
    "TATASTEEL": "Materials",
    "JSWSTEEL": "Materials",
    "HCLTECH": "Technology",
    "SUNPHARMA": "Healthcare",
    "DIVISLAB": "Healthcare",
    "DRREDDY": "Healthcare",
    "COALINDIA": "Energy",
    "GRASIM": "Materials",
    "ULTRACEMCO": "Materials",
    "ADANIENT": "Industrials",
    "ADANIGREEN": "Utilities",
    "ADANITRANS": "Industrials",
    "ADANIPORTS": "Industrials",
    "POWERGRID": "Utilities",
    "HINDALCO": "Materials",
    "BAJFINANCE": "Financial Services",
    "EICHERMOT": "Consumer Discretionary",
    "BRITANNIA": "Consumer Staples",
    "CIPLA": "Healthcare",
    "HDFCLIFE": "Financial Services",
    "TITAN": "Consumer Discretionary",
    "M&M": "Consumer Discretionary",
    "BPCL": "Energy",
    "IOC": "Energy",
    "GAIL": "Energy",
    "VEDL": "Materials",
    "ADANIGAS": "Utilities",
    "HINDPETRO": "Energy",
    "TATAMOTORS": "Consumer Discretionary",
    "TATAPOWER": "Utilities",
    "BAJAJFINSV": "Financial Services",
    "HAVELLS": "Industrials",
    "LUPIN": "Healthcare",
    "SHREECEM": "Materials",
    "MCDOWELL-N": "Consumer Staples",
    "INDUSINDBK": "Financial Services",
    "SBILIFE": "Financial Services",

    # USA
    "AAPL": "Technology",
    "MSFT": "Technology",
    "NVDA": "Technology",
    "GOOGL": "Communication Services",
    "AMZN": "Consumer Discretionary",
    "TSLA": "Consumer Discretionary",
    "JPM": "Financial Services",
    "V": "Financial Services",
    "JNJ": "Healthcare",
    "PFE": "Healthcare",
    "XOM": "Energy",
    "CVX": "Energy",
    "META": "Communication Services",
    "WMT": "Consumer Staples",
    "PG": "Consumer Staples",
    "KO": "Consumer Staples",
    "PEP": "Consumer Staples",
    "DIS": "Communication Services",
    "MA": "Financial Services",
    "UNH": "Healthcare",
    "HD": "Consumer Discretionary",
    "BAC": "Financial Services",
    "VZ": "Communication Services",
    "CSCO": "Technology",
    "ADBE": "Technology",
    "NFLX": "Communication Services",
    "ORCL": "Technology",
    "ABT": "Healthcare",
    "MRK": "Healthcare",
    "T": "Communication Services",
    "NKE": "Consumer Discretionary",
    "MCD": "Consumer Discretionary",
    "COST": "Consumer Staples",
    "CRM": "Technology",
    "WFC": "Financial Services",
    "INTC": "Technology",
    "BA": "Industrials",
    "MMM": "Industrials",
    "GE": "Industrials",
    "CAT": "Industrials",
    "UPS": "Industrials",
    "FDX": "Industrials",
    "HON": "Industrials",
    "LMT": "Industrials",
    "RTX": "Industrials",
    "DE": "Industrials",
    "GS": "Industrials",
    "BLK": "Financial Services",
    "AXP": "Financial Services",
    "C": "Financial Services",
    "SCHW": "Financial Services",
    "BK": "Financial Services",
    "USB": "Financial Services",
    "PNC": "Financial Services",
    "TMO": "Healthcare",
    "MDT": "Healthcare",
    "BMY": "Healthcare",
    "AMGN": "Healthcare",
    "GILD": "Healthcare",
    "VRTX": "Healthcare",
    "REGN": "Healthcare",
    "ILMN": "Healthcare",
    "ISRG": "Healthcare",
    "ZTS": "Healthcare",
    "BIIB": "Healthcare",
    "AZN": "Healthcare",
    "JNJ": "Healthcare",
    "ABBV": "Healthcare",
    "MRNA": "Healthcare",
    "BNTX": "Healthcare",
    "PFE": "Healthcare",
    "MRK": "Healthcare",
    "LVS": "Consumer Discretionary",
    "MGM": "Consumer Discretionary",
    "WYNN": "Consumer Discretionary",
    "RCL": "Consumer Discretionary",
    "CCL": "Consumer Discretionary",
    "NCLH": "Consumer Discretionary",
    "DAL": "Industrials",
    "UAL": "Industrials",
    "AAL": "Industrials",
    "LUV": "Industrials",
    "JBLU": "Industrials",
    "ALK": "Industrials",
    "SAVE": "Industrials",
    "SKYW": "Industrials",
    "S": "Industrials",
    "UAL": "Industrials"
}

def get_stock_details(
    symbol,
    exchange,
    country_code
):
    ticker_symbol = resolve_ticker(
        symbol,
        exchange,
        country_code
    )

    try:
        stock = yf.Ticker(
            ticker_symbol
        )

        # Get latest price
        hist = stock.history(
            period="1d"
        )

        if hist.empty:
            print(
                f"No data for {ticker_symbol}"
            )

            return {
                "price": 0,
                "sector": "Others"
            }

        price = float(
            hist["Close"].iloc[-1]
        )

        if math.isnan(price):
            price = 0

        # Get sector
        try:
            info = stock.get_info()

            sector = info.get(
                "sector",
                "Others"
            )

        except Exception as e:
            print(
                f"Sector error for {ticker_symbol}: {e}"
            )

            sector = "Others"
        # Fallback
        if (
            not sector
            or sector == "Others"
        ):
            sector = (
                SECTOR_MAPPING.get(
                    symbol.upper(),
                    "Others"
                )
            )

        return {
            "price": round(
                price,
                2
            ),
            "sector": sector
        }

    except Exception as e:

        print(
            f"{ticker_symbol}: {e}"
        )

        return {
            "price": 0,
            "sector": "Others"
        }