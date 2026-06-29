
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

def get_equity_stock_price(symbol, exchange, country_code):

    ticker_symbol = resolve_ticker(symbol, exchange, country_code)

    try:
        stock = yf.Ticker(symbol)
        data = stock.history(period="5d")

        if data.empty: 
            print(f"No data for {symbol}")
            return 0
        latest_price = data['Close'].iloc[-1]
        return round(latest_price, 2)
    except Exception as e:
        print(f"{ticker_symbol}: {e}")
        return 0

def get_yahoo_symbol(symbol, exchange):
    symbol = symbol.upper()

    if exchange.upper() in ["NSE", "NSEI"]:
        return f"{symbol}.NS"

    if exchange.upper() in ["BSE"]:
        return f"{symbol}.BO"

    return symbol

import yfinance as yf

def enrich_with_sector(equities):
    sector_mapping = {}

    for stock in equities:
        symbol = stock["Symbol"].upper()
        exchange = stock.get("Exchange", "")

        yahoo_symbol = get_yahoo_symbol(
            symbol,
            exchange
        )

        try:
            sector_mapping[symbol] = (
                yf.Ticker(yahoo_symbol)
                .info
                .get("sector", "Others")
            )
        except Exception as e:
            print(e)
            sector_mapping[symbol] = "Others"

    return sector_mapping
