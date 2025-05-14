let loadedPlugins = [];

/* Element(s?) */
const splashScreen = document.createElement('splashScreen');

/* Misc Styles */
document.head.appendChild(Object.assign(document.createElement("style"), { innerHTML: "@font-face{font-family:'MuseoSans';src:url('https://corsproxy.io/?url=https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/ynddewua.ttf')format('truetype')}" }));
document.head.appendChild(Object.assign(document.createElement('style'), { innerHTML: "::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-track { background: #f1f1f1; } ::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; } ::-webkit-scrollbar-thumb:hover { background: #555; }" }));
document.querySelector("link[rel~='icon']").href = 'https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/ukh0rq22.png';

/* Emmiter */
class EventEmitter { constructor() { this.events = {} } on(t, e) { "string" == typeof t && (t = [t]), t.forEach(t => { this.events[t] || (this.events[t] = []), this.events[t].push(e) }) } off(t, e) { "string" == typeof t && (t = [t]), t.forEach(t => { this.events[t] && (this.events[t] = this.events[t].filter(t => t !== e)) }) } emit(t, ...e) { this.events[t] && this.events[t].forEach(t => { t(...e) }) } once(t, e) { "string" == typeof t && (t = [t]); let s = (...i) => { e(...i), this.off(t, s) }; this.on(t, s) } };
const plppdo = new EventEmitter();

new MutationObserver((mutationsList) => { for (let mutation of mutationsList) if (mutation.type === 'childList') plppdo.emit('domChanged'); }).observe(document.body, { childList: true, subtree: true });

/* Misc Functions */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const playAudio = url => { const audio = new Audio(url); audio.play(); };
const findAndClickBySelector = selector => { const element = document.querySelector(selector); if (element) { element.click(); sendToast(`⭕ Pressionando ${selector}...`, 1000); } };

function sendToast(text, duration = 5000, gravity = 'bottom') { Toastify({ text: text, duration: duration, gravity: gravity, position: "center", stopOnFocus: true, style: { background: "#000000" } }).showToast(); };

async function showSplashScreen() {
    splashScreen.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background-color:#0a0a0a;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;opacity:0;transition:opacity 0.5s ease;user-select:none;color:white;font-family:MuseoSans,sans-serif;font-size:30px;text-align:center;overflow:hidden;";

    // Adicionar partículas ao background
    const particles = document.createElement('div');
    particles.className = 'particles';
    particles.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;z-index:-1;";

    // Criar 20 partículas
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 15 + 10;
        const startPositionX = Math.random() * 100;
        const startPositionY = Math.random() * 100;
        const opacity = Math.random() * 0.4 + 0.2;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(114, 255, 114, ${opacity});
            border-radius: 50%;
            top: ${startPositionY}%;
            left: ${startPositionX}%;
            filter: blur(1px);
            box-shadow: 0 0 10px rgba(114, 255, 114, 0.4);
            animation: float ${duration}s infinite linear;
            animation-delay: ${Math.random() * 5}s;
        `;

        particles.appendChild(particle);
    }

    splashScreen.appendChild(particles);

    // Container principal para conteúdo centralizado
    const contentContainer = document.createElement('div');
    contentContainer.style.cssText = "display:flex;flex-direction:column;align-items:center;justify-content:center;transform:scale(0.9);opacity:0;transition:all 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.5s;";

    // Logo animado
    const logoContainer = document.createElement('div');
    logoContainer.style.cssText = "position:relative;margin-bottom:25px;";

    const logoText = document.createElement('div');
    logoText.innerHTML = `
        <span style="color:white;font-size:35px;font-weight:bold;letter-spacing:-1px;">KHANWARE</span>
        <span style="color:#72ff72;font-size:35px;font-weight:bold;letter-spacing:-1px;">.LITE</span>
    `;

    // Efeito glow sob o logo
    const logoGlow = document.createElement('div');
    logoGlow.style.cssText = "position:absolute;width:100%;height:15px;background:radial-gradient(ellipse at center, rgba(114, 255, 114, 0.3) 0%, rgba(114, 255, 114, 0) 70%);bottom:-15px;left:0;opacity:0;transition:opacity 1s ease 1.3s;filter:blur(5px);";

    logoContainer.appendChild(logoText);
    logoContainer.appendChild(logoGlow);
    contentContainer.appendChild(logoContainer);

    // Créditos
    const credits = document.createElement('div');
    credits.style.cssText = "display:flex;flex-direction:column;align-items:center;opacity:0;transform:translateY(20px);transition:all 0.7s ease 1.5s;";

    const authorText = document.createElement('div');
    authorText.innerHTML = `<span style="font-size:12px;color:rgba(255,255,255,0.5);">by <span style="color:#72ff72;">@im.nix</span> & <span style="color:#72ff72;">@mairinkdev</span></span>`;

    credits.appendChild(authorText);
    contentContainer.appendChild(credits);

    // Barra de loading animada
    const loadingBar = document.createElement('div');
    loadingBar.style.cssText = "width:180px;height:2px;background-color:rgba(50,50,50,0.5);margin-top:25px;border-radius:2px;overflow:hidden;opacity:0;transform:translateY(20px);transition:all 0.7s ease 1.7s;";

    const loadingProgress = document.createElement('div');
    loadingProgress.style.cssText = "width:0%;height:100%;background:linear-gradient(to right, #72ff72, #a0ff9d);border-radius:2px;transition:width 1.5s cubic-bezier(.08,.82,.17,1) 2s;";

    loadingBar.appendChild(loadingProgress);
    contentContainer.appendChild(loadingBar);

    // Adicionar o container de conteúdo ao splash screen
    splashScreen.appendChild(contentContainer);

    // Adicionar animações CSS
    const animStyles = document.createElement('style');
    animStyles.innerHTML = `
        @keyframes float {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(-15px, 15px) rotate(90deg); }
            50% { transform: translate(15px, 30px) rotate(180deg); }
            75% { transform: translate(-20px, -15px) rotate(270deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
        }
    `;
    document.head.appendChild(animStyles);

    // Adicionar ao body
    document.body.appendChild(splashScreen);

    // Iniciar animações após um pequeno atraso
    setTimeout(() => {
        splashScreen.style.opacity = '1';
        contentContainer.style.opacity = '1';
        contentContainer.style.transform = 'scale(1)';

        // Mostrar o glow
        logoGlow.style.opacity = '1';

        // Mostrar os créditos
        credits.style.opacity = '1';
        credits.style.transform = 'translateY(0)';

        // Mostrar e animar a barra de progresso
        loadingBar.style.opacity = '1';
        loadingBar.style.transform = 'translateY(0)';
        loadingProgress.style.width = '100%';
    }, 100);
}

async function hideSplashScreen() {
    splashScreen.style.opacity = '0';
    setTimeout(() => splashScreen.remove(), 1000);
};

// Função para continuar após o splash screen
async function setupAfterSplash() {
    // Esconder o splash screen
    hideSplashScreen();

    // Continuar com o setup
    setupMain();

    console.clear();
}

async function loadScript(url, label) { return fetch(url).then(response => response.text()).then(script => { loadedPlugins.push(label); eval(script); }); }
async function loadCss(url) { return new Promise((resolve) => { const link = document.createElement('link'); link.rel = 'stylesheet'; link.type = 'text/css'; link.href = url; link.onload = () => resolve(); document.head.appendChild(link); }); }

/* Main Functions */
function setupMain() {
    /* QuestionSpoof */
    (function () {
        const phrases = [
            "🔥 Get good, get [Khanware](https://github.com/Niximkk/khanware/)!",
            "🤍 Made by [@im.nix](https://e-z.bio/sounix).",
            "☄️ By [Niximkk/khanware](https://github.com/Niximkk/khanware/).",
            "🌟 Star the project on [GitHub](https://github.com/Niximkk/khanware/)!",
            "🪶 Lite mode @ KhanwareMinimal.js",
            "✨ Enhanced by [mairinkdev](https://github.com/mairinkdev)!",
            "🚀 Customized version by [mairinkdev](https://github.com/mairinkdev)!",
            "🌈 Special thanks to [@mairinkdev](https://github.com/mairinkdev)!",
            "💎 Melhorado por [mairinkdev](https://github.com/mairinkdev)!"
        ];

        const originalFetch = window.fetch;

        window.fetch = async function (input, init) {
            let body;
            if (input instanceof Request) body = await input.clone().text();
            else if (init && init.body) body = init.body;

            const originalResponse = await originalFetch.apply(this, arguments);
            const clonedResponse = originalResponse.clone();

            try {
                const responseBody = await clonedResponse.text();
                let responseObj = JSON.parse(responseBody);
                if (responseObj?.data?.assessmentItem?.item?.itemData) {
                    let itemData = JSON.parse(responseObj.data.assessmentItem.item.itemData);
                    if (itemData.question.content[0] === itemData.question.content[0].toUpperCase()) {
                        itemData.answerArea = { "calculator": false, "chi2Table": false, "periodicTable": false, "tTable": false, "zTable": false }
                        itemData.question.content = phrases[Math.floor(Math.random() * phrases.length)] + `[[☃ radio 1]]`;
                        itemData.question.widgets = { "radio 1": { type: "radio", options: { choices: [{ content: "Resposta correta.", correct: true }, { content: "Resposta incorreta.", correct: false }] } } };
                        responseObj.data.assessmentItem.item.itemData = JSON.stringify(itemData);
                        sendToast("🔓 Questão exploitada.", 1000);
                        return new Response(JSON.stringify(responseObj), { status: originalResponse.status, statusText: originalResponse.statusText, headers: originalResponse.headers });
                    }
                }
            } catch (e) { }
            return originalResponse;
        };
    })();

    /* VideoSpoof */
    (function () {
        const originalFetch = window.fetch;

        window.fetch = async function (input, init) {
            let body;
            if (input instanceof Request) body = await input.clone().text();
            else if (init && init.body) body = init.body;
            if (body && body.includes('"operationName":"updateUserVideoProgress"')) {
                try {
                    let bodyObj = JSON.parse(body);
                    if (bodyObj.variables && bodyObj.variables.input) {
                        const durationSeconds = bodyObj.variables.input.durationSeconds;
                        bodyObj.variables.input.secondsWatched = durationSeconds;
                        bodyObj.variables.input.lastSecondWatched = durationSeconds;
                        body = JSON.stringify(bodyObj);
                        if (input instanceof Request) { input = new Request(input, { body: body }); }
                        else init.body = body;
                        sendToast("🔓 Vídeo exploitado.", 1000)
                    }
                } catch (e) { debug(`🚨 Error @ videoSpoof.js\n${e}`); }
            }
            return originalFetch.apply(this, arguments);
        };
    })();

    /* MinuteFarm */
    (function () {
        const originalFetch = window.fetch;

        window.fetch = async function (input, init = {}) {
            let body;
            if (input instanceof Request) body = await input.clone().text();
            else if (init.body) body = init.body;
            if (body && input.url.includes("mark_conversions")) {
                try {
                    if (body.includes("termination_event")) { sendToast("🚫 Limitador de tempo bloqueado.", 1000); return; }
                } catch (e) { debug(`🚨 Error @ minuteFarm.js\n${e}`); }
            }
            return originalFetch.apply(this, arguments);
        };
    })();

    /* AutoAnswer */
    (function () {
        const baseSelectors = [
            `[data-testid="choice-icon__library-choice-icon"]`,
            `[data-testid="exercise-check-answer"]`,
            `[data-testid="exercise-next-question"]`,
            `._1udzurba`,
            `._awve9b`
        ];

        khanwareDominates = true;

        (async () => {
            while (khanwareDominates) {
                const selectorsToCheck = [...baseSelectors];

                for (const q of selectorsToCheck) {
                    findAndClickBySelector(q);
                    if (document.querySelector(q + "> div") && document.querySelector(q + "> div").innerText === "Mostrar resumo") {
                        sendToast("🎉 Exercício concluído!", 3000);
                        playAudio("https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/4x5g14gj.wav");
                    }
                }
                await delay(800);
            }
        })();
    })();

    /* Adicionar indicador visual flutuante */
    (function () {
        // Criar o indicador
        const indicator = document.createElement('div');
        indicator.className = 'kw-indicator';
        indicator.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: rgba(10, 10, 10, 0.75);
            color: white;
            font-family: MuseoSans, sans-serif;
            font-size: 12px;
            padding: 10px 15px;
            border-radius: 15px;
            z-index: 1000;
            user-select: none;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border: 1px solid rgba(114, 255, 114, 0.2);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            gap: 8px;
            transform: translateY(100px);
            transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
            animation: pulse-border 4s infinite ease-in-out;
        `;

        // Adicionar conteúdo ao indicador
        indicator.innerHTML = `
            <div style="width: 10px; height: 10px; background-color: #72ff72; border-radius: 50%; animation: pulse 2s infinite;"></div>
            <div>KhanwareLite está ativo</div>
        `;

        // Adicionar estilos para animações
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes pulse {
                0% { transform: scale(0.8); opacity: 0.7; }
                50% { transform: scale(1.2); opacity: 1; }
                100% { transform: scale(0.8); opacity: 0.7; }
            }

            @keyframes pulse-border {
                0% { border-color: rgba(114, 255, 114, 0.2); }
                50% { border-color: rgba(114, 255, 114, 0.5); }
                100% { border-color: rgba(114, 255, 114, 0.2); }
            }
        `;
        document.head.appendChild(style);

        // Adicionar o indicador ao body
        document.body.appendChild(indicator);

        // Mostrar o indicador após um atraso
        setTimeout(() => {
            indicator.style.transform = 'translateY(0)';

            // Esconder o indicador após 5 segundos
            setTimeout(() => {
                indicator.style.transform = 'translateY(100px)';

                // Remover depois de completar a animação
                setTimeout(() => {
                    indicator.remove();
                }, 1000);
            }, 5000);
        }, 2000);
    })();
}
/* Inject */
if (!/^https?:\/\/([a-z0-9-]+\.)?khanacademy\.org/.test(window.location.href)) { alert("❌ Khanware Failed to Injected!\n\nVocê precisa executar o Khanware no site do Khan Academy! (https://pt.khanacademy.org/)"); window.location.href = "https://pt.khanacademy.org/"; }

showSplashScreen();

loadScript('https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js', 'darkReaderPlugin').then(() => { DarkReader.setFetchMethod(window.fetch); DarkReader.enable(); })
loadCss('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css', 'toastifyCss');
loadScript('https://cdn.jsdelivr.net/npm/toastify-js', 'toastifyPlugin')
    .then(async () => {
        sendToast("🪶 Khanware Minimal injetado com sucesso!");

        playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/gcelzszy.wav');

        await delay(500);

        // Adicionar botão de continuar ao splash screen após um atraso
        setTimeout(() => {
            // Criar botão de continuar
            const continueButton = document.createElement('div');
            continueButton.style.cssText = `
                margin-top: 30px;
                padding: 10px 25px;
                background-color: rgba(114, 255, 114, 0.2);
                border: 1px solid rgba(114, 255, 114, 0.5);
                border-radius: 8px;
                color: white;
                font-size: 14px;
                cursor: pointer;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
                user-select: none;
            `;
            continueButton.innerHTML = "Continuar";

            // Adicionar eventos ao botão
            continueButton.addEventListener('click', setupAfterSplash);
            continueButton.addEventListener('mouseenter', () => {
                continueButton.style.backgroundColor = "rgba(114, 255, 114, 0.3)";
                continueButton.style.transform = "translateY(-2px)";
            });
            continueButton.addEventListener('mouseleave', () => {
                continueButton.style.backgroundColor = "rgba(114, 255, 114, 0.2)";
                continueButton.style.transform = "translateY(0)";
            });

            // Adicionar botão ao splash screen
            let contentContainer = splashScreen.querySelector('div');
            if (!contentContainer) {
                contentContainer = splashScreen;
            }
            contentContainer.appendChild(continueButton);

            // Mostrar botão com animação
            setTimeout(() => {
                continueButton.style.opacity = '1';
                continueButton.style.transform = 'translateY(0)';
            }, 500);
        }, 3000); // Mostrar botão após 3 segundos para dar tempo de ver a animação
    });
