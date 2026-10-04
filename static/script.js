let recognition = null;
let isListening = false;


/* DOM */

const input = document.getElementById("messageInput");
const messages = document.getElementById("messages");
const typing = document.getElementById("typing");
const micButton = document.getElementById("micButton");
const voiceStatus = document.getElementById("voiceStatus");


/* AUTO RESIZE */

input.addEventListener("input", () => {

    input.style.height = "auto";

    input.style.height =
        Math.min(input.scrollHeight, 140) + "px";

});


/* ENTER KEY */

function handleKey(event) {

    if (
        event.key === "Enter" &&
        !event.shiftKey
    ) {

        event.preventDefault();

        sendMessage();

    }
}


/* SEND MESSAGE */

async function sendMessage() {

    const text = input.value.trim();

    if (!text) {
        return;
    }

    addMessage(text, "user");

    input.value = "";
    input.style.height = "auto";

    showTyping(true);

    try {

        const response = await fetch("/analyze", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                text: text
            })

        });


        const data = await response.json();


        if (!data.success) {
            throw new Error(data.error);
        }


        updateDashboard(
            data.analysis,
            data.sentiment
        );


        showTyping(false);


        addMessage(
            data.response,
            "assistant"
        );


        speakText(data.response);


    } catch (error) {

        showTyping(false);

        addMessage(
            "⚠️ Something went wrong while analyzing your message. Please try again.",
            "assistant"
        );

        console.error(error);

    }
}


/* ADD MESSAGE */

function addMessage(text, sender) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        `message ${sender}`;


    const avatar =
        document.createElement("div");

    avatar.className = "avatar";

    avatar.textContent =
        sender === "assistant" ? "AI" : "YOU";


    const content =
        document.createElement("div");

    content.className =
        "message-content";


    const name =
        document.createElement("div");

    name.className =
        "message-name";

    name.textContent =
        sender === "assistant"
            ? "Intelligence Assistant"
            : "You";


    const bubble =
        document.createElement("div");

    bubble.className = "bubble";

    bubble.textContent = text;


    content.appendChild(name);
    content.appendChild(bubble);

    wrapper.appendChild(avatar);
    wrapper.appendChild(content);

    messages.appendChild(wrapper);


    messages.scrollTop =
        messages.scrollHeight;
}


/* QUICK PROMPT */

function quickPrompt(text) {

    input.value = text;

    input.focus();

    sendMessage();
}


/* TYPING */

function showTyping(show) {

    if (show) {
        typing.classList.remove("hidden");
    } else {
        typing.classList.add("hidden");
    }

    messages.scrollTop =
        messages.scrollHeight;
}


/* DASHBOARD */

function updateDashboard(
    analysis,
    sentiment
) {

    document.getElementById(
        "wordCount"
    ).textContent =
        analysis.word_count;


    document.getElementById(
        "charCount"
    ).textContent =
        analysis.character_count;


    document.getElementById(
        "sentenceCount"
    ).textContent =
        analysis.sentence_count;


    document.getElementById(
        "readingTime"
    ).textContent =
        analysis.reading_time + "m";


    document.getElementById(
        "avgWordLength"
    ).textContent =
        analysis.average_word_length;


    document.getElementById(
        "avgSentenceLength"
    ).textContent =
        analysis.average_sentence_length;


    document.getElementById(
        "paragraphCount"
    ).textContent =
        analysis.paragraph_count;


    document.getElementById(
        "longestWord"
    ).textContent =
        analysis.longest_word || "—";


    document.getElementById(
        "sentimentLabel"
    ).textContent =
        sentiment.label;


    document.getElementById(
        "confidence"
    ).textContent =
        sentiment.confidence + "%";


    updateSentimentBar(
        sentiment
    );


    updateKeywords(
        analysis.keywords
    );
}


/* SENTIMENT BAR */

function updateSentimentBar(sentiment) {

    const bar =
        document.getElementById(
            "sentimentBar"
        );


    let value = 50;


    if (sentiment.label === "Positive") {

        value =
            Math.min(
                100,
                50 + Math.abs(sentiment.score)
            );

    } else if (
        sentiment.label === "Negative"
    ) {

        value =
            Math.max(
                0,
                50 - Math.abs(sentiment.score)
            );

    }


    bar.style.width =
        value + "%";
}


/* KEYWORDS */

function updateKeywords(keywords) {

    const container =
        document.getElementById(
            "keywords"
        );


    container.innerHTML = "";


    if (!keywords || keywords.length === 0) {

        container.innerHTML =
            '<span class="empty">No keywords detected</span>';

        return;
    }


    keywords.forEach(item => {

        const tag =
            document.createElement("span");

        tag.className = "keyword";

        tag.textContent =
            `${item.word} ×${item.count}`;

        container.appendChild(tag);

    });
}


/* SPEECH RECOGNITION */

function setupRecognition() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        voiceStatus.textContent =
            "Speech recognition unavailable";

        return;
    }


    recognition =
        new SpeechRecognition();


    recognition.continuous = false;

    recognition.interimResults = true;

    recognition.lang = "en-US";


    recognition.onstart = () => {

        isListening = true;

        micButton.classList.add(
            "listening"
        );

        voiceStatus.textContent =
            "Listening...";

    };


    recognition.onresult = event => {

        let transcript = "";


        for (
            let i = event.resultIndex;
            i < event.results.length;
            i++
        ) {

            transcript +=
                event.results[i][0].transcript;

        }


        input.value =
            transcript;

    };


    recognition.onerror = event => {

        console.error(
            "Speech recognition error:",
            event.error
        );

        voiceStatus.textContent =
            "Voice error: " + event.error;

    };


    recognition.onend = () => {

        isListening = false;

        micButton.classList.remove(
            "listening"
        );

        voiceStatus.textContent =
            "Ready to listen";

        input.style.height = "auto";

        input.style.height =
            Math.min(
                input.scrollHeight,
                140
            ) + "px";

    };

}


/* TOGGLE LISTENING */

function toggleListening() {

    if (!recognition) {

        alert(
            "Speech recognition is not supported by this browser. Try Google Chrome."
        );

        return;
    }


    if (isListening) {

        recognition.stop();

    } else {

        recognition.start();

    }
}


/* DIRECT START */

function startListening() {

    if (!recognition) {

        alert(
            "Speech recognition is not supported by this browser."
        );

        return;
    }

    recognition.start();
}


/* TEXT TO SPEECH */

function speakText(text) {

    if (!("speechSynthesis" in window)) {
        return;
    }


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(
            text
        );


    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;

    speech.lang = "en-US";


    window.speechSynthesis.speak(
        speech
    );
}


/* NEW CONVERSATION */

function newConversation() {

    messages.innerHTML = `

        <div class="message assistant">

            <div class="avatar">
                AI
            </div>

            <div class="message-content">

                <div class="message-name">
                    Intelligence Assistant
                </div>

                <div class="bubble">

                    <h3>
                        New conversation started ✨
                    </h3>

                    <p>
                        How can I help you today?
                    </p>

                </div>

            </div>

        </div>

    `;


    resetDashboard();

    input.focus();
}


/* RESET DASHBOARD */

function resetDashboard() {

    document.getElementById(
        "wordCount"
    ).textContent = "0";


    document.getElementById(
        "charCount"
    ).textContent = "0";


    document.getElementById(
        "sentenceCount"
    ).textContent = "0";


    document.getElementById(
        "readingTime"
    ).textContent = "0m";


    document.getElementById(
        "avgWordLength"
    ).textContent = "0";


    document.getElementById(
        "avgSentenceLength"
    ).textContent = "0";


    document.getElementById(
        "paragraphCount"
    ).textContent = "0";


    document.getElementById(
        "longestWord"
    ).textContent = "—";


    document.getElementById(
        "sentimentLabel"
    ).textContent = "Neutral";


    document.getElementById(
        "confidence"
    ).textContent = "50%";


    document.getElementById(
        "keywords"
    ).innerHTML =
        '<span class="empty">Keywords will appear here</span>';


    document.getElementById(
        "sentimentBar"
    ).style.width = "50%";
}


/* INITIALIZE */

setupRecognition();