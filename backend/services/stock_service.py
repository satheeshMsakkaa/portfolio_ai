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