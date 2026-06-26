import pandas as pd
from utils.validators import validate_exchange


def parse_excel(file):

    xls = pd.ExcelFile(file)
    sheet_names = xls.sheet_names

    print("Available sheets:", sheet_names)

    # Investor
    investor_df = (
        pd.read_excel(xls, sheet_name="Investor")
        if "Investor" in sheet_names
        else pd.DataFrame()
    )

    # Equity
    equity_df = (
        pd.read_excel(xls, sheet_name="Equity")
        if "Equity" in sheet_names
        else pd.DataFrame()
    )

    # Funds
    mf_df = (
        pd.read_excel(xls, sheet_name="Funds")
        if "Funds" in sheet_names
        else pd.DataFrame()
    )

    # Standardize columns
    if not investor_df.empty:
        investor_df.columns = (
            investor_df.columns
            .str.replace(" ", "_")
        )

    if not equity_df.empty:
        equity_df.columns = (
            equity_df.columns
            .str.replace(" ", "_")
        )

    if not mf_df.empty:
        mf_df.columns = (
            mf_df.columns
            .str.strip()
            .str.lower()
            .str.replace(" ", "_")
        )

    equities = (
        equity_df.to_dict(orient="records")
        if not equity_df.empty
        else []
    )

    # Validate exchanges only if equities exist
    for row in equities:
        exchange = row.get("Exchange")
        if exchange:
            validate_exchange(exchange)

    mutual_funds = (
        mf_df.to_dict(orient="records")
        if not mf_df.empty
        else []
    )

    return {
        "investor": (
            investor_df.to_dict(orient="records")
            if not investor_df.empty
            else []
        ),
        "equities": equities,
        "mutualFunds": mutual_funds
    }