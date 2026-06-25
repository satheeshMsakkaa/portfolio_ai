
def analyze_sentiment(news_articles):
    positive = 0
    negative = 0
    for article in news_articles:
        title = article.get("title","").lower()
        if any(w in title for w in ["gain","growth","up","strong","beat"]):
            positive += 1
        if any(w in title for w in ["fall","loss","down","weak","miss"]):
            negative += 1
    score = positive - negative
    return {"positive": positive, "negative": negative, "score": score}
