import re


POSITIVE_WORDS = {
    "good", "great", "excellent", "amazing", "awesome",
    "happy", "love", "like", "wonderful", "fantastic",
    "best", "success", "successful", "helpful", "nice",
    "perfect", "beautiful", "enjoy", "enjoyed", "positive",
    "thank", "thanks", "brilliant", "smart", "easy",
    "excited", "confident", "improve", "improved"
}


NEGATIVE_WORDS = {
    "bad", "terrible", "awful", "hate", "sad",
    "angry", "problem", "problems", "difficult",
    "failure", "failed", "worst", "poor", "wrong",
    "error", "errors", "issue", "issues", "negative",
    "hard", "confused", "confusing", "stress",
    "stressed", "disappointed", "disappointing",
    "boring", "danger", "dangerous"
}


def analyze_sentiment(text):

    words = re.findall(r"\b[a-zA-Z]+\b", text.lower())

    positive = sum(
        1 for word in words
        if word in POSITIVE_WORDS
    )

    negative = sum(
        1 for word in words
        if word in NEGATIVE_WORDS
    )

    total = positive + negative

    if total == 0:
        label = "Neutral"
        score = 0
    elif positive > negative:
        label = "Positive"
        score = round(
            (positive - negative) / total * 100
        )
    elif negative > positive:
        label = "Negative"
        score = round(
            (negative - positive) / total * 100
        )
    else:
        label = "Mixed"
        score = 0

    if score > 0:
        confidence = min(100, 50 + score // 2)
    elif score < 0:
        confidence = min(100, 50 + abs(score) // 2)
    else:
        confidence = 50

    return {
        "label": label,
        "score": score,
        "confidence": confidence,
        "positive_words": positive,
        "negative_words": negative
    }