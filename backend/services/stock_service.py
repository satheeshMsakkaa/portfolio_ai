
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

    elif country_code == "USA":

        return symbol

    return symbol

def get_current_stock_price(
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

        hist = stock.history(
            period="1d"
        )

        if hist.empty:

            print(
                f"No data for {ticker_symbol}"
            )

            return 0

        price = float(
            hist["Close"].iloc[-1]
        )

        if math.isnan(price):

            return 0

        return round(price, 2)

    except Exception as e:

        print(
            f"{ticker_symbol}: {e}"
        )

        return 0