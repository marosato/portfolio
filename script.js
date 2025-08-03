// Navbar Toggler Animation
document.addEventListener("DOMContentLoaded", function () {
    const toggler = document.querySelector(".navbar-toggler");
    const listIcon = toggler.querySelector(".bi-list");
    const xIcon = toggler.querySelector(".bi-x");

    toggler.addEventListener("click", function () {
        if (toggler.getAttribute("aria-expanded") === "true") {
            listIcon.style.display = "none";
            xIcon.style.display = "block";
        } else {
            listIcon.style.display = "block";
            xIcon.style.display = "none";
        }
    });
});

// Chatbot Personal
document.addEventListener("DOMContentLoaded", function () {
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotBox = document.getElementById("chatbot-box");
    const chatbotClose = document.getElementById("chatbot-close");
    const chatbotForm = document.getElementById("chatbot-form");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotMessages = document.getElementById("chatbot-messages");

    // Preguntas frecuentes
    const faqs = [
        {
            q: "¿Quién eres?",
            a: "Soy Macarena Ayelén Rosato, una Desarrolladora Backend con experiencia en soporte técnico dentro de una holding fintech, operando con el mismo nivel de control, precisión y trazabilidad que una entidad bancaria."      
        },
        {
            q: "¿Qué tecnologías manejas?",
            a: `Manejo HTML, CSS, JavaScript, Java, SQL, MySQL, MariaDB, Go, PHP, Python, Git y más. Puedo desarrollar aplicaciones web y backend, así como manejar bases de datos y control de versiones.`
        },
        {
            q: "¿Qué estudias?",
            a: "Actualmente estoy estudiando Analista de Sistemas en el Instituto Tecnológico ORT y también Ingeniería en Informática en UADE."
        },
        {
            q: "¿Tenés experiencia laboral?",
            a: "Tengo experiencia en soporte técnico y operativo en una holding fintech, revisando operaciones financieras en DBeaver sobre bases MySQL y MariaDB."
        },
        {
            q: "¿Cómo puedo contactarte?",
            a: `Puedes contactarme por email:<br>
            <a href="mailto:rosatomacarena@outlook.com">rosatomacarena@outlook.com</a> <br><br>
            O bien, puedes contactarme por LinkedIn: <br>
            https://www.linkedin.com/in/macarena-ayelen-rosato/`
        }
    ];

    // Renderiza los botones FAQ
    function renderFaqButtons(container) {
        const div = document.createElement("div");
        div.className = "mb-2";
        faqs.forEach(faq => {
            const btn = document.createElement("button");
            btn.className = "btn btn-outline-secondary btn-sm mb-1 chatbot-faq";
            btn.textContent = faq.q;
            btn.addEventListener("click", () => handleFaqClick(faq.q));
            div.appendChild(btn);
        });
        container.appendChild(div);
    }

    // Maneja el click en los botones FAQ
    function handleFaqClick(question) {
        appendMessage(question, "user");
        setTimeout(() => {
            appendMessage(getBotResponse(question), "bot");
        }, 400);
    }

    // Inicializa el mensaje de bienvenida y los botones FAQ
    function resetChatbot() {
        if (chatbotMessages) {
            chatbotMessages.innerHTML = "";
            const { answer, suggestions } = getBotResponse("inicio", true);
            appendMessage("¡Hola! Soy el chatbot de Macarena.\n¿En qué puedo ayudarte?", "bot", suggestions);
        }
    }

    // Mostrar/ocultar chatbot
    if (chatbotToggle && chatbotBox) {
        chatbotToggle.addEventListener("click", function () {
            const isHidden = chatbotBox.style.display === "none" || !chatbotBox.style.display;
            chatbotBox.style.display = isHidden ? "block" : "none";
            if (isHidden) resetChatbot();
        });
    }

    // Cerrar chatbot
    if (chatbotClose && chatbotBox) {
        chatbotClose.addEventListener("click", function () {
            chatbotBox.style.display = "none";
            resetChatbot();
        });
    }

    // Enviar mensaje por formulario
    if (chatbotForm && chatbotInput && chatbotMessages) {
        chatbotForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const userMsg = chatbotInput.value.trim();
            if (userMsg) {
                appendMessage(userMsg, "user");
                chatbotInput.value = "";
                setTimeout(() => {
                    const { answer, suggestions } = getBotResponse(userMsg, true);
                    appendMessage(answer, "bot", suggestions);
                }, 400);
            }
        });
    }

    // Añade mensaje al chat
    function appendMessage(msg, sender, suggestions = []) {
        const div = document.createElement("div");
        if (sender === "user") {
            div.className = "mb-2 text-end";
            div.textContent = msg;
        } else {
            div.className = "mb-2 chatbot-bot-msg";
            // Si la respuesta contiene un link, usar innerHTML
            if (/<a\s|https?:\/\//i.test(msg)) {
                const urlRegex = /(https?:\/\/[^\s<]+)/g;
                div.innerHTML = msg.replace(urlRegex, url =>
                    `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
                );
            } else {
                div.textContent = msg;
            }
            // Sugerencias de preguntas
            if (suggestions.length > 0) {
                const sugDiv = document.createElement("div");
                sugDiv.className = "chatbot-suggestions mt-2";
                suggestions.forEach(sug => {
                    const btn = document.createElement("button");
                    btn.className = "btn btn-outline-secondary btn-sm mb-1 chatbot-faq";
                    btn.textContent = sug;
                    btn.onclick = () => {
                        appendMessage(sug, "user");
                        setTimeout(() => {
                            const { answer, suggestions: nextSugs } = getBotResponse(sug, true);
                            appendMessage(answer, "bot", nextSugs);
                        }, 400);
                    };
                    sugDiv.appendChild(btn);
                });
                div.appendChild(sugDiv);
            }
        }
        chatbotMessages.appendChild(div);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Respuestas del bot
    function getBotResponse(input, withSuggestions = false) {
        const normalized = input.toLowerCase();

        if (normalized.includes("quién eres")) {
            const answer = "Soy Macarena Ayelén Rosato, desarrolladora backend junior.";
            const suggestions = [
                "¿Qué tecnologías manejas?",
                "¿Dónde estudias?",
                "¿Dónde trabajas?",
                "¿Cómo puedo contactarte?"
            ];
            return withSuggestions ? { answer, suggestions } : answer;
        }

        if (normalized.includes("tecnologías") || normalized.includes("lenguajes") || normalized.includes("programación")) {
            const answer = "Manejo HTML, CSS, JavaScript, Bootstrap, Java, SQL, MySQL, MariaDB, Go, PHP, Python, Git y más.";
            const suggestions = [
                "¿Dónde estudias?",
                "¿Dónde trabajas?",
                "¿Tienes experiencia laboral?",
                "¿Cómo puedo contactarte?"
            ];
            return withSuggestions ? { answer, suggestions } : answer;
        }

        if (normalized.includes("dónde estudias") || normalized.includes("estudios") || normalized.includes("formación")) {
            const answer = "Actualmente estudio Analista de Sistemas en el Instituto Tecnológico ORT y también Ingeniería en Informática en UADE.";
            const suggestions = [
                "¿Qué tecnologías manejas?",
                "¿Tienes experiencia laboral?",
                "¿Qué cursos hiciste?",
                "¿Dónde trabajas?"
            ];
            return withSuggestions ? { answer, suggestions } : answer;
        }

        if (normalized.includes("trabajaste") || normalized.includes("trabajo") || normalized.includes("experiencia laboral")) {
            const answer = "Tengo experiencia en soporte técnico y operativo en una holding fintech, revisando operaciones financieras en DBeaver sobre bases MySQL y MariaDB.";
            const suggestions = [
                "¿Dónde trabajas?",
                "¿Qué tecnologías manejas?",
                "¿Cómo puedo contactarte?",
                "¿Qué cursos hiciste?"
            ];
            return withSuggestions ? { answer, suggestions } : answer;
        }

        if (normalized.includes("dónde trabajas") || normalized.includes("donde trabajas")) {
            const answer = "Actualmente estoy trabajando en IBBA GROUP, una empresa que forma parte de un holding fintech y tiene presencia en varios países de Latinoamérica.";
            const suggestions = [
                "¿Qué tecnologías manejas?",
                "¿Tienes experiencia laboral?",
                "¿Cómo puedo contactarte?",
                "¿Qué cursos hiciste?"
            ];
            return withSuggestions ? { answer, suggestions } : answer;
        }

        if (
            normalized.includes("curso actual") ||
            normalized.includes("curso reciente") ||
            normalized.includes("curso más reciente") ||
            normalized.includes("curso mas reciente") ||
            normalized.includes("qué estás estudiando ahora") ||
            normalized.includes("que estas estudiando ahora")
        ) {
            const answer = "Actualmente estoy cursando la Carrera de Desarrollo Backend en Coderhouse. Inició el 2 de agosto de 2025 y se estima que finaliza el 8 de agosto de 2026.";
            const suggestions = [
                "¿Qué tecnologías manejas?",
                "¿Dónde estudias?",
                "¿Tienes experiencia laboral?",
                "¿Cómo puedo contactarte?"
            ];
            return withSuggestions ? { answer, suggestions } : answer;
        }

        if (normalized.includes("cursos") || normalized.includes("certificados")) {
            const answer = "He realizado cursos de Desarrollo Full Stack con Python y Java, AWS Cloud Computing, Habilidades Blandas y actualmente estoy cursando la Carrera de Desarrollo Backend en Coderhouse.";
            const suggestions = [
                "¿Dónde estudias?",
                "¿Qué tecnologías manejas?",
                "¿Dónde trabajas?",
                "¿Cómo puedo contactarte?"
            ];
            return withSuggestions ? { answer, suggestions } : answer;
        }

        if (normalized.includes("contacto") || normalized.includes("contactar") || normalized.includes("cómo te contacto") || normalized.includes("como te contacto") || normalized.includes("cómo puedo contactarte") || normalized.includes("como puedo contactarte")) {
            const answer = `Puedes contactarme por email:<br>
            <a href="mailto:rosatomacarena@outlook.com">rosatomacarena@outlook.com</a> <br><br>
            O bien, puedes contactarme por LinkedIn: <br>
            https://www.linkedin.com/in/macarena-ayelen-rosato/`;
            const suggestions = [
                "¿Quién eres?",
                "¿Qué tecnologías manejas?",
                "¿Dónde estudias?",
                "¿Dónde trabajas?"
            ];
            return withSuggestions ? { answer, suggestions } : answer;
        }

        if (normalized === "inicio") {
            const answer = "¡Hola! Soy el chatbot de Macarena.\n¿En qué puedo ayudarte?";
            const suggestions = [
                "¿Quién eres?",
                "¿Qué tecnologías manejas?",
                "¿Dónde estudias?",
                "¿Dónde trabajas?"
            ];
            return withSuggestions ? { answer, suggestions } : answer;
        }

        // Por defecto
        const answer = "¡Gracias por tu mensaje! ¿Hay algo más en lo que pueda ayudarte?";
        const suggestions = [
            "¿Quién eres?",
            "¿Qué tecnologías manejas?",
            "¿Dónde estudias?",
            "¿Dónde trabajas?"
        ];
        return withSuggestions ? { answer, suggestions } : answer;
    }

    // Inicializar chatbot al cargar
    resetChatbot();
});
