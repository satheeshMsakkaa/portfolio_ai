import requests
import yfinance as yf
import math

def get_current_nav(isin):
    try:
        url = "https://www.amfiindia.com/spages/NAVAll.txt"
        text = requests.get(url, timeout=10).text

        isin = isin.strip().upper()

        for line in text.splitlines():

            # skip headers / empty lines
            if ";" not in line:
                continue

            parts = line.split(";")
            #print(f"Line parts: {parts}")

            if len(parts) < 5:
                continue

            isin1 = parts[1].strip().upper()
            isin2 = parts[2].strip().upper()
            #print(f"Checking ISIN: {isin} against {isin1} and {isin2}")

            # NAV is ALWAYS second last column in AMFI format
            try:
                nav = float(parts[-2].strip())
            except:
                continue

            if isin == isin1 or isin == isin2:
                return nav

        return 0.0

    except Exception as e:
        print("ERROR:", e)
        return 0.0

import yfinance as yf
import math

def get_fund_price(ticker):

    try:

        fund = yf.Ticker(ticker)

        hist = fund.history(period="1d")

        if hist.empty:
            print(f"{ticker} -> EMPTY")
            return 0

        price = float(hist["Close"].iloc[-1])

        print(f"{ticker} -> {price}")

        if math.isnan(price):
            print(f"{ticker} -> NAN")
            return 0

        return round(price, 2)

    except Exception as e:

        print(f"{ticker} -> ERROR: {e}")
        return 0