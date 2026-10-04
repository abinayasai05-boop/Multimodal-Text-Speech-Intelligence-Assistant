from flask import Flask, render_template, request, jsonify
from utils.text_analyzer import analyze_text
from utils.sentiment import analyze_sentiment
from utils.chatbot import get_response

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        data = request.get_json()

        text = data.get("text", "").strip()

        if not text:
            return jsonify({
                "success": False,
                "error": "Please enter some text."
            }), 400

        analysis = analyze_text(text)
        sentiment = analyze_sentiment(text)
        response = get_response(text)

        return jsonify({
            "success": True,
            "analysis": analysis,
            "sentiment": sentiment,
            "response": response
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route("/health")
def health():
    return jsonify({
        "status": "online",
        "service": "Multimodal Text & Speech Intelligence Assistant"
    })


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)