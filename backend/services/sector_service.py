
def sector_allocation(equities):
    allocation = {}
    for stock in equities:
        sector = stock.get("Sector", "Unknown")
        allocation[sector] = allocation.get(sector, 0) + stock.get("CurrentValue", 0)
    return allocation
