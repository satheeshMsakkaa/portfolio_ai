
from utils.constants import VALID_EXCHANGES

def validate_exchange(exchange):
    if exchange.upper() not in VALID_EXCHANGES:
        raise ValueError(f"Invalid Exchange: {exchange}")
    return True
