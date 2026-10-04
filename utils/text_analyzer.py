import re
from collections import Counter


STOP_WORDS = {
    "the", "is", "a", "an", "and", "or", "but",
    "to", "of", "in", "on", "for", "with",
    "this", "that", "it", "as", "at", "be",
    "are", "was", "were", "am", "i", "you",
    "he", "she", "they", "we", "my", "your",
    "our", "their", "from", "by", "about",
    "can", "could", "would", "should", "will",
    "have", "has", "had", "do", "does", "did",
    "not", "so", "if", "then", "than", "into"
}


def analyze_text(text):

    words = re.findall(r"\b[\w']+\b", text)

    sentences = re.split(r"[.!?]+", text)
    sentences = [s.strip() for s in sentences if s.strip()]

    characters = len(text)
    characters_no_spaces = len(re.sub(r"\s", "", text))

    word_count = len(words)
    sentence_count = len(sentences)

    paragraphs = [
        p.strip()
        for p in text.split("\n")
        if p.strip()
    ]

    paragraph_count = len(paragraphs)

    average_word_length = (
        sum(len(word) for word in words) / word_count
        if word_count else 0
    )

    average_sentence_length = (
        word_count / sentence_count
        if sentence_count else 0
    )

    reading_time = max(1, round(word_count / 200))

    lowercase_words = [
        word.lower()
        for word in words
        if word.lower() not in STOP_WORDS
        and len(word) > 2
    ]

    frequency = Counter(lowercase_words)

    keywords = [
        {
            "word": word,
            "count": count
        }
        for word, count in frequency.most_common(8)
    ]

    longest_word = max(words, key=len) if words else ""

    return {
        "word_count": word_count,
        "sentence_count": sentence_count,
        "character_count": characters,
        "characters_no_spaces": characters_no_spaces,
        "paragraph_count": paragraph_count,
        "average_word_length": round(average_word_length, 2),
        "average_sentence_length": round(average_sentence_length, 2),
        "reading_time": reading_time,
        "longest_word": longest_word,
        "keywords": keywords
    }