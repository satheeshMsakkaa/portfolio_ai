
def calculate_health_score(dashboard):
    holdings = len(dashboard["equities"])
    score = 50
    if holdings >= 5: score += 10
    if holdings >= 10: score += 10
    if len(dashboard["mutualFunds"]) > 0: score += 10
    if dashboard["summary"]["profitLoss"] > 0: score += 20
    return min(score, 100)
