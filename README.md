# 🤖 Multimodal Text & Speech Intelligence Assistant

A web-based **Text and Speech Intelligence Assistant** built using Python and Flask. The application combines text analysis, speech recognition, sentiment analysis, keyword extraction, text-to-speech, and a rule-based conversational assistant in a single interface.

## 🌐 Live Demo

🚀 **Try the application:**  
https://multimodal-text-speech-intelligence.onrender.com/

## 📌 Project Overview

The **Multimodal Text & Speech Intelligence Assistant** is designed to process user input through both text and speech.

Users can enter text manually or use the microphone to provide speech input. The application analyzes the provided content and displays useful information such as word count, character count, sentiment, keywords, reading time, and other text statistics.

The project demonstrates how multiple Natural Language Processing and browser-based speech technologies can be combined into one interactive application.

## 🚀 Features

### 📝 Text Analysis

The application analyzes the entered text and provides:

- Word count
- Character count
- Characters without spaces
- Sentence count
- Paragraph count
- Average word length
- Average sentence length
- Longest word
- Estimated reading time

### 😊 Sentiment Analysis

The assistant performs basic rule-based sentiment analysis and identifies whether the text is:

- Positive
- Negative
- Neutral

It also displays detected positive and negative words.

### 🔑 Keyword Extraction

Important keywords are extracted from the user's text to help identify the main topics or terms present in the content.

### 🎤 Speech Input

Users can use the microphone to speak instead of typing.

The browser's **Web Speech API** converts speech into text, which can then be analyzed by the application.

### 🔊 Text-to-Speech

The assistant can read responses aloud using the browser's built-in speech synthesis functionality.

### 💬 Intelligent Chatbot

The project includes a rule-based conversational assistant that can respond to common queries such as:

- Hello
- Help
- What can you do?
- Who are you?
- Tell me about the project
- Speech-related questions
- Sentiment-related questions

### 📊 Real-Time Statistics

The interface displays useful statistics and analysis results while interacting with the assistant.

### 🎨 Modern User Interface

The application provides a modern dark-themed interface with:

- Responsive layout
- Interactive dashboard
- Chat interface
- Analytics panel
- Speech controls
- Sentiment visualization
- Keyword tags

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Python | Backend programming |
| Flask | Web application framework |
| HTML5 | Application structure |
| CSS3 | User interface and styling |
| JavaScript | Frontend interaction |
| NLP | Text processing |
| Web Speech API | Speech recognition |
| SpeechSynthesis API | Text-to-speech |
| Gunicorn | Production server |
| Render | Deployment |

## 📂 Project Structure

```text
Multimodal-Text-Speech-Intelligence-Assistant/
│
├── app.py
├── requirements.txt
├── README.md
│
├── utils/
│   ├── __init__.py
│   ├── text_analyzer.py
│   ├── sentiment.py
│   └── chatbot.py
│
├── templates/
│   └── index.html
│
└── static/
    ├── style.css
    └── script.js
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/abinayasai05-boop/Multimodal-Text-Speech-Intelligence-Assistant.git
```

### 2. Open the project

```bash
cd Multimodal-Text-Speech-Intelligence-Assistant
```

### 3. Create a virtual environment

```bash
python -m venv venv
```

### 4. Activate the virtual environment

**Windows:**

```bash
venv\Scripts\activate
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

### 6. Run the application

```bash
python app.py
```

### 7. Open in browser

```text
http://127.0.0.1:5000
```

## 📦 Requirements

The main dependencies are:

```text
Flask
gunicorn
```

Additional functionality such as speech recognition and text-to-speech is handled through browser APIs, so external speech-processing libraries are not required.

## 🔄 Application Workflow

```text
             User
              │
       ┌──────┴──────┐
       │             │
     Text          Speech
       │             │
       │       Web Speech API
       │             │
       └──────┬──────┘
              ↓
        Text Processing
              ↓
       ┌──────┴───────┐
       │              │
 Text Analysis   Sentiment Analysis
       │              │
       └──────┬───────┘
              ↓
       Keyword Extraction
              ↓
       Chatbot Response
              ↓
       ┌──────┴──────┐
       │             │
    Display      Text-to-Speech
    Results         Output
```

## 🧠 How It Works

1. The user enters text or provides speech input.
2. Speech input is converted into text using the browser's Web Speech API.
3. The text is sent to the Flask backend.
4. The application analyzes the text.
5. Statistics such as word count and sentence count are calculated.
6. Keywords are extracted.
7. Sentiment is determined using predefined positive and negative word lists.
8. The rule-based chatbot generates an appropriate response.
9. Results are displayed in the dashboard.
10. The response can optionally be spoken using text-to-speech.

## 💬 Example

### User Input

```text
I really enjoyed working on this project. The interface is simple and useful.
```

### Analysis

```text
Sentiment: Positive

Keywords:
project
interface
simple
useful

The dashboard also displays:
- Word count
- Character count
- Sentence count
- Reading time
- Average word length
```

## 🌐 Deployment

The project is deployed using **Render**.

### Build Command

```bash
pip install -r requirements.txt
```

### Start Command

```bash
gunicorn app:app
```

### Live Application

https://multimodal-text-speech-intelligence.onrender.com/

## 🔐 Privacy

The application is designed as an educational project. Speech recognition is handled through the browser's Web Speech API, while text processing is performed by the application.

Users should avoid entering sensitive or confidential information.

## 🎓 Academic Purpose

This project demonstrates the practical application of:

- Natural Language Processing
- Text analysis
- Rule-based conversational systems
- Speech recognition
- Text-to-speech technology
- Web application development
- Flask backend development
- Frontend JavaScript interaction

It can be used as an academic project for demonstrating **Text and Speech Analysis / NLP / TSA concepts**.

## 🔮 Future Enhancements

Possible future improvements include:

- 🤖 AI-powered conversational responses
- 🌍 Multilingual speech recognition
- 🎤 Improved speech processing
- 📈 Advanced analytics
- 💾 Conversation history
- 👤 User accounts
- 🧠 Machine-learning-based sentiment analysis
- 📄 Document analysis
- 🔊 Voice-controlled assistant
- 📱 Progressive Web App support

## 🎯 Project Objective

The main objective of this project is to develop an interactive assistant that combines **text intelligence and speech interaction** in a single web application.

The project demonstrates how NLP, speech technologies, frontend development, and backend programming can work together to create an interactive intelligent assistant.

## 👩‍💻 Author

**Abinaya Sai**

GitHub:  
https://github.com/abinayasai05-boop

## 📄 License

This project is created for **educational and academic purposes**.
