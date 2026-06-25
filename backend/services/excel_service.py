
import pandas as pd
from utils.validators import validate_exchange

def parse_excel(file):
    investor_df = pd.read_excel(file, sheet_name="Investor")
    equity_df = pd.read_excel(file, sheet_name="Equity")
    mf_df = pd.read_excel(file, sheet_name="Funds")

    investor_df.columns = investor_df.columns.str.replace(" ", "_")
    equity_df.columns = equity_df.columns.str.replace(" ", "_")
    mf_df.columns = mf_df.columns.str.strip().str.lower().str.replace(" ", "_")

    equities = equity_df.to_dict(orient="records")

    for row in equities:
        validate_exchange(row["Exchange"])

    return {
        "investor": investor_df.to_dict(orient="records"),
        "equities": equities,
        "mutualFunds": mf_df.to_dict(orient="records")
    }
