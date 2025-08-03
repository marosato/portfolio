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
            appendMessage(answer, "bot", suggestions);
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
            // Si la respuesta contiene un link, se usa innerHTML
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

    // SECCIÓN DE RESPUESTAS DEL BOT
    function getBotResponse(input, withSuggestions = false) {
        const normalized = input.toLowerCase();

        if (normalized.includes("quién eres")) {
            const answer = "Soy Macarena Ayelén Rosato, una Desarrolladora Backend con experiencia en soporte técnico dentro de una holding fintech, operando con el mismo nivel de control, precisión y trazabilidad que una entidad bancaria.";
            const suggestions = [
                "¿Estás estudiando?",
                "¿Estás trabajando?",
                "¿Manejas alguna tecnología?",
                "¿Cómo puedo contactarte?"
            ];
            return withSuggestions ? { answer, suggestions } : answer;
        }
        if (normalized.includes("dónde estudias") ||
            normalized.includes("qué estudias") ||
            normalized.includes("estás estudiando") ||
            normalized.includes("qué estás estudiando") ||
            normalized.includes("estudios") ||
            normalized.includes("formación")) {
            const answer = "Actualmente estudio Analista de Sistemas en el Instituto Tecnológico ORT y también Ingeniería en Informática en UADE.";
            const suggestions = [
                "¿Estás haciendo algún curso?",
                "¿Qué cursos hiciste?",
                "¿Tenés experiencia laboral?",
                "¿Qué lenguajes de programación manejas?"
            ];
            return withSuggestions ? { answer, suggestions } : answer;
        }

        // EXPERIENCIA LABORAL
        if (
            normalized.includes("trabajaste") ||
            normalized.includes("trabajo") ||
            normalized.includes("experiencia laboral") ||
            normalized.includes("has trabajado") ||
            normalized.includes("has tenido experiencia laboral") ||
            normalized.includes("experiencia profesional")
        ) {
            const answer = "Tengo experiencia profesional en soporte técnico y operativo dentro de una holding fintech, donde gestioné y analicé operaciones financieras utilizando DBeaver sobre bases de datos MySQL y MariaDB. También participé en la automatización de procesos, resolución de incidencias complejas y trabajo colaborativo con equipos, asegurando precisión y trazabilidad en cada tarea.";
            const suggestions = [
                "¿Dónde trabajas actualmente?",
                // "¿Qué tecnologías o herramientas utilizas en tu trabajo?",
                "¿Cómo puedo contactarte?",
                "¿Qué estudias?"
            ];
            return withSuggestions ? { answer, suggestions } : answer;
        }
        if (normalized.includes("dónde trabajas") || normalized.includes("donde trabajas")) {
            const answer = "Actualmente trabajo en IBBA GROUP, una empresa del sector fintech con operaciones en varios países de Latinoamérica. Mi rol principal es el de dar soporte técnico, donde participo en la gestión y análisis de operaciones financieras, automatización de procesos y resolución de incidencias complejas.";
            const suggestions = [
                // "¿Qué tecnologías o herramientas utilizas en tu trabajo?",
                "¿Cuándo comenzaste a trabajar allí?",
                "¿Qué estudias?",
                "¿Cómo puedo contactarte?"
            ];
            return withSuggestions ? { answer, suggestions } : answer;
        }
        if (normalized.includes("cuándo comenzaste a trabajar allí") || normalized.includes("cuando comenzaste a trabajar allí")) {
            const answer = "Comencé a trabajar en IBBA GROUP el 28 de noviembre de 2024.";
            const suggestions = [
                // "¿Qué herramientas utilizas en tu trabajo?",
                "¿Qué estudias?",
                "¿Cómo puedo contactarte?"
            ];
            return withSuggestions ? { answer, suggestions } : answer;
        }
        // if (normalized.includes("qué herramientas utilizas en tu trabajo?") ||
        //     normalized.includes("qué herramientas utilizas en tu trabajo") ||
        //     normalized.includes("qué herramientas utilizas") ||
        //     normalized.includes("qué herramientas manejas") ||
        //     normalized.includes("qué herramientas manejas en tu trabajo") ||
        //     normalized.includes("qué herramientas manejas en tu trabajo?") ||
        //     normalized.includes("qué herramientas usas") ||
        //     normalized.includes("qué herramientas usas en tu trabajo")) {
        //     const answer = "Utilizo herramientas como DBeaver para la administración de bases de datos MySQL/MariaDB, y Postman para pruebas de APIs REST. También trabajo con Excel y SQL para el desarrollo de reportes financieros automatizados.";
        //     const suggestions = [
        //         "¿Qué lenguajes de programación manejas?",
        //         "¿Qué bases de datos utilizas?",
        //         "¿Cómo puedo contactarte?"
        //     ];
        //     return withSuggestions ? { answer, suggestions } : answer;
        // }

        if (
            normalized.includes("curso actual") ||
            normalized.includes("curso reciente") ||
            normalized.includes("curso más reciente") ||
            normalized.includes("curso mas reciente") ||
            normalized.includes("estás haciendo algún curso") ||
            normalized.includes("que estas estudiando ahora") ||
            normalized.includes("qué estás estudiando ahora")
        ) {
            const answer = "Actualmente estoy cursando la Carrera de Desarrollo Backend en Coderhouse.";
            const suggestions = [
                "¿Cuándo inició la carrera de Coderhouse?",
                "¿Qué otros cursos hiciste?"
            ];
            return withSuggestions ? { answer, suggestions } : answer;
        }
        if (
            normalized.includes("cuándo comenzó la carrera en coderhouse") ||
            normalized.includes("cuando comenzó la carrera en coderhouse") ||
            normalized.includes("cuando comenzo la carrera en coderhouse") ||
            normalized.includes("cuándo inició la carrera de coderhouse") ||
            normalized.includes("cuando inició la carrera de coderhouse") ||
            normalized.includes("cuando inicio la carrera de coderhouse")
        ) {
            const answer = "La Carrera de Desarrollo Backend en Coderhouse comenzó el 2 de agosto de 2025 y se estima que finaliza el 8 de agosto de 2026.";
            const suggestions = [
                "¿Qué estudio estás priorizando actualmente?",
                "¿Tenés experiencia laboral?"
            ];
            return withSuggestions ? { answer, suggestions } : answer;
        }
        if (
            normalized.includes("qué estudio estas priorizando hoy mismo") ||
            normalized.includes("qué estudio estás priorizando hoy mismo") ||
            normalized.includes("qué estudio estas priorizando actualmente") ||
            normalized.includes("qué estudio estás priorizando actualmente") ||
            normalized.includes("qué estudio priorizas hoy") ||
            normalized.includes("qué estudio priorizas actualmente") ||
            normalized.includes("priorizas algún estudio") ||
            normalized.includes("prioridad de estudio")
        ) {
            const answer = "En este momento, mi prioridad académica es la carrera de Analista de Sistemas en el Instituto Tecnológico ORT, ya que esta formación me brinda una base sólida en programación, análisis y desarrollo de software, lo que considero que es fundamental para mi crecimiento profesional.";
            const suggestions = [
                "¿Tenés experiencia laboral?",
                "¿Qué lenguajes de programación manejas?",
                "¿Cómo puedo contactarte?"
            ];
            return withSuggestions ? { answer, suggestions } : answer;
        }
        if (normalized.includes("cursos") || normalized.includes("certificados")) {
            const answer = "He realizado cursos de Desarrollo Full Stack con Python y Java, AWS Cloud Computing, Habilidades Blandas y actualmente estoy cursando la Carrera de Desarrollo Backend en Coderhouse.";
            const suggestions = [
                "¿Dónde estudias?",
                "¿Qué lenguajes de programación manejas?",
                "¿Dónde trabajas?",
                "¿Cómo puedo contactarte?"
            ];
            return withSuggestions ? { answer, suggestions } : answer;
        }

        // LENGUAJES DE PROGRAMACIÓN
        if (normalized.includes("qué lenguajes de programación manejas") ||
            normalized.includes("qué lenguajes de programación manejas?") ||
            normalized.includes("qué lenguajes de programación usas") ||
            normalized.includes("qué lenguajes de programación usas?") ||
            normalized.includes("qué lenguajes de programación utilizas") ||
            normalized.includes("qué lenguajes de programación utilizas?")) {
            const answer = "Manejo HTML, CSS, JavaScript, Java, SQL, MySQL, MariaDB, Go, PHP y Python.";
            const suggestions = [
                // "¿Qué bases de datos utilizas?",
                // "¿Qué frameworks o librerías usas?",
                "¿Cómo puedo contactarte?"
            ];
            return withSuggestions ? { answer, suggestions } : answer;
        }

        // CONTACTO
        if (normalized.includes("contacto") || normalized.includes("contactar") || normalized.includes("cómo te contacto") || normalized.includes("como te contacto") || normalized.includes("cómo puedo contactarte") || normalized.includes("como puedo contactarte")) {
            const answer = `Puedes contactarme por email:<br>
            <a href="mailto:rosatomacarena@outlook.com">rosatomacarena@outlook.com</a> <br><br>
            O bien, puedes contactarme por LinkedIn: <br>
            https://www.linkedin.com/in/macarena-ayelen-rosato/`;
            const suggestions = [
                "¿Quién eres?",
                "¿Qué lenguajes de programación manejas?",
                "¿Dónde estudias?",
                "¿Dónde trabajas?"
            ];
            return withSuggestions ? { answer, suggestions } : answer;
        }

        // INICIO
        if (normalized === "inicio" || normalized === "hola") {
            const answer = "¡Hola! Soy el chatbot de Macarena.\n¿En qué puedo ayudarte?";
            const suggestions = [
                "¿Quién eres?",
                "¿Qué estudias?",
                "¿Tenés experiencia laboral?",
                "¿Qué lenguajes de programación manejas?",
                "¿Cómo puedo contactarte?",
                "¿Cuál es tu curso actual?"
            ];
            return withSuggestions ? { answer, suggestions } : answer;
        }
        // Por defecto
        const answer = "¡Gracias por tu mensaje! ¿Hay algo más en lo que pueda ayudarte?";
        const suggestions = [
            "¿Quién eres?",
            "¿Qué lenguajes de programación manejas?",
            "¿Dónde estudias?",
            "¿Dónde trabajas?"
        ];
        return withSuggestions ? { answer, suggestions } : answer;
    }

    // Inicializar chatbot al cargar
    resetChatbot();
});
