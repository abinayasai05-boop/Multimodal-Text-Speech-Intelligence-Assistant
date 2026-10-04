def get_response(text):

    message = text.lower().strip()

    if any(word in message for word in [
        "hello", "hi", "hey", "good morning",
        "good afternoon", "good evening"
    ]):
        return (
            "Hello! 👋 I'm your Multimodal Intelligence Assistant. "
            "You can type a message or use your microphone."
        )

    if "who are you" in message:
        return (
            "I am a multimodal text and speech intelligence assistant "
            "built with Python, Flask, NLP and browser speech technology."
        )

    if "what can you do" in message:
        return (
            "I can analyze text, detect sentiment, extract keywords, "
            "calculate text statistics, estimate reading time, "
            "convert speech to text and read responses aloud."
        )

    if "sentiment" in message:
        return (
            "I can identify whether your text is Positive, Negative, "
            "Neutral or Mixed based on its language patterns."
        )

    if "speech" in message or "microphone" in message:
        return (
            "Click the microphone button and start speaking. "
            "Your browser will convert your speech into text."
        )

    if "thank" in message:
        return (
            "You're welcome! 😊 I'm happy to help."
        )

    if "help" in message:
        return (
            "Try entering a sentence such as: "
            "'I am excited about my new project.'"
        )

    if "project" in message:
        return (
            "Your project demonstrates multimodal interaction by "
            "combining text processing, speech recognition, "
            "sentiment analysis and conversational responses."
        )

    if "bye" in message or "goodbye" in message:
        return (
            "Goodbye! 👋 Have a great day."
        )

    return (
        "I've analyzed your message. You can check the "
        "intelligence dashboard for detailed text statistics, "
        "keywords and sentiment."
    )
