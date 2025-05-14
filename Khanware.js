const ver = "V3.1.1";
let isDev = false;

const repoPath = `https://raw.githubusercontent.com/Niximkk/Khanware/refs/heads/${isDev ? "dev/" : "main/"}`;

let device = {
    mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Mobile|Tablet|Kindle|Silk|PlayBook|BB10/i.test(navigator.userAgent),
    apple: /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(navigator.userAgent)
};

/* User */
let user = {
    username: "Username",
    nickname: "Nickname",
    UID: 0
}

let loadedPlugins = [];

/* Elements */
const unloader = document.createElement('unloader');
const dropdownMenu = document.createElement('dropDownMenu');
const watermark = document.createElement('watermark');
const statsPanel = document.createElement('statsPanel');
const splashScreen = document.createElement('splashScreen');

/* Globals */
window.features = {
    questionSpoof: true,
    videoSpoof: true,
    showAnswers: false,
    autoAnswer: false,
    customBanner: false,
    nextRecomendation: false,
    repeatQuestion: false,
    minuteFarmer: false,
    rgbLogo: false
};
window.featureConfigs = {
    autoAnswerDelay: 3,
    customUsername: "",
    customPfp: ""
};

/* Security */
document.addEventListener('contextmenu', (e) => !window.disableSecurity && e.preventDefault());
document.addEventListener('keydown', (e) => { if (!window.disableSecurity && (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key)))) { e.preventDefault(); } });
console.log(Object.defineProperties(new Error, { toString: { value() { (new Error).stack.includes('toString@') && location.reload(); } }, message: { get() { location.reload(); } }, }));

/* Misc Styles */
document.head.appendChild(Object.assign(document.createElement("style"), { innerHTML: "@font-face{font-family:'MuseoSans';src:url('https://corsproxy.io/?url=https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/ynddewua.ttf')format('truetype')}" }));
document.head.appendChild(Object.assign(document.createElement('style'), { innerHTML: "::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-track { background: #f1f1f1; } ::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; } ::-webkit-scrollbar-thumb:hover { background: #555; }" }));
document.querySelector("link[rel~='icon']").href = 'https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/ukh0rq22.png';

/* Emmiter */
class EventEmitter { constructor() { this.events = {} } on(t, e) { "string" == typeof t && (t = [t]), t.forEach(t => { this.events[t] || (this.events[t] = []), this.events[t].push(e) }) } off(t, e) { "string" == typeof t && (t = [t]), t.forEach(t => { this.events[t] && (this.events[t] = this.events[t].filter(t => t !== e)) }) } emit(t, ...e) { this.events[t] && this.events[t].forEach(t => { t(...e) }) } once(t, e) { "string" == typeof t && (t = [t]); let s = (...i) => { e(...i), this.off(t, s) }; this.on(t, s) } };
const plppdo = new EventEmitter();

new MutationObserver((mutationsList) => { for (let mutation of mutationsList) if (mutation.type === 'childList') plppdo.emit('domChanged'); }).observe(document.body, { childList: true, subtree: true });

/* Misc Functions */
window.debug = function (text) { /* QuickFix */ }
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const playAudio = url => { const audio = new Audio(url); audio.play(); debug(`🔊 Playing audio from ${url}`); };
const findAndClickBySelector = selector => { const element = document.querySelector(selector); if (element) { element.click(); sendToast(`⭕ Pressionando ${selector}...`, 1000); } };

function sendToast(text, duration = 5000, gravity = 'bottom') { Toastify({ text: text, duration: duration, gravity: gravity, position: "center", stopOnFocus: true, style: { background: "#000000" } }).showToast(); debug(text); };

async function showSplashScreen() {
    splashScreen.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background-color:#0a0a0a;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;opacity:0;transition:opacity 0.5s ease;user-select:none;color:white;font-family:MuseoSans,sans-serif;font-size:30px;text-align:center;overflow:hidden;";

    // Adicionar partículas ao background
    const particles = document.createElement('div');
    particles.className = 'particles';
    particles.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;z-index:-1;";

    // Criar 30 partículas
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 5 + 2;
        const duration = Math.random() * 20 + 10;
        const startPositionX = Math.random() * 100;
        const startPositionY = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.3;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(114, 255, 114, ${opacity});
            border-radius: 50%;
            top: ${startPositionY}%;
            left: ${startPositionX}%;
            filter: blur(1px);
            box-shadow: 0 0 10px rgba(114, 255, 114, 0.8);
            animation: float ${duration}s infinite linear;
            animation-delay: ${Math.random() * 5}s;
        `;

        particles.appendChild(particle);
    }

    splashScreen.appendChild(particles);

    // Linha horizontal superior com brilho
    const topLine = document.createElement('div');
    topLine.style.cssText = "position:absolute;top:0;left:0;width:100%;height:1px;background:linear-gradient(to right, rgba(114, 255, 114, 0), rgba(114, 255, 114, 0.8) 50%, rgba(114, 255, 114, 0));transform:translateY(-100%);transition:transform 0.8s cubic-bezier(.17,.67,.35,1.25) 0.2s;";
    splashScreen.appendChild(topLine);

    // Linha horizontal inferior com brilho
    const bottomLine = document.createElement('div');
    bottomLine.style.cssText = "position:absolute;bottom:0;left:0;width:100%;height:1px;background:linear-gradient(to right, rgba(114, 255, 114, 0), rgba(114, 255, 114, 0.8) 50%, rgba(114, 255, 114, 0));transform:translateY(100%);transition:transform 0.8s cubic-bezier(.17,.67,.35,1.25) 0.2s;";
    splashScreen.appendChild(bottomLine);

    // Container principal para conteúdo centralizado
    const contentContainer = document.createElement('div');
    contentContainer.style.cssText = "display:flex;flex-direction:column;align-items:center;justify-content:center;transform:scale(0.9);opacity:0;transition:all 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.5s;";

    // Logo animado
    const logoContainer = document.createElement('div');
    logoContainer.style.cssText = "position:relative;margin-bottom:20px;";

    const logoText = document.createElement('div');
    logoText.innerHTML = `
        <span class="logo-text" style="display:inline-block;overflow:hidden;position:relative;">
            <span style="color:white;display:inline-block;font-size:40px;font-weight:bold;transform:translateY(100%);transition:transform 0.5s cubic-bezier(.17,.67,.35,1.25) 0.8s;">K</span>
            <span style="color:white;display:inline-block;font-size:40px;font-weight:bold;transform:translateY(100%);transition:transform 0.5s cubic-bezier(.17,.67,.35,1.25) 0.85s;">H</span>
            <span style="color:white;display:inline-block;font-size:40px;font-weight:bold;transform:translateY(100%);transition:transform 0.5s cubic-bezier(.17,.67,.35,1.25) 0.9s;">A</span>
            <span style="color:white;display:inline-block;font-size:40px;font-weight:bold;transform:translateY(100%);transition:transform 0.5s cubic-bezier(.17,.67,.35,1.25) 0.95s;">N</span>
            <span style="color:white;display:inline-block;font-size:40px;font-weight:bold;transform:translateY(100%);transition:transform 0.5s cubic-bezier(.17,.67,.35,1.25) 1s;">W</span>
            <span style="color:white;display:inline-block;font-size:40px;font-weight:bold;transform:translateY(100%);transition:transform 0.5s cubic-bezier(.17,.67,.35,1.25) 1.05s;">A</span>
            <span style="color:white;display:inline-block;font-size:40px;font-weight:bold;transform:translateY(100%);transition:transform 0.5s cubic-bezier(.17,.67,.35,1.25) 1.1s;">R</span>
            <span style="color:white;display:inline-block;font-size:40px;font-weight:bold;transform:translateY(100%);transition:transform 0.5s cubic-bezier(.17,.67,.35,1.25) 1.15s;">E</span>
        </span>
    `;

    // Efeito glow sob o logo
    const logoGlow = document.createElement('div');
    logoGlow.style.cssText = "position:absolute;width:100%;height:20px;background:radial-gradient(ellipse at center, rgba(114, 255, 114, 0.5) 0%, rgba(114, 255, 114, 0) 70%);bottom:-20px;left:0;opacity:0;transition:opacity 1s ease 1.3s;filter:blur(5px);";

    logoContainer.appendChild(logoText);
    logoContainer.appendChild(logoGlow);
    contentContainer.appendChild(logoContainer);

    // Versão e desenvolvedor
    const credits = document.createElement('div');
    credits.style.cssText = "display:flex;flex-direction:column;align-items:center;opacity:0;transform:translateY(20px);transition:all 0.7s ease 1.5s;";

    const versionText = document.createElement('div');
    versionText.innerHTML = `<span style="font-size:14px;color:rgba(255,255,255,0.7);">${ver}</span>`;

    const authorText = document.createElement('div');
    authorText.innerHTML = `<span style="font-size:12px;color:rgba(255,255,255,0.5);margin-top:10px;">by <span style="color:#72ff72;">@im.nix</span> & <span style="color:#72ff72;">@mairinkdev</span></span>`;

    credits.appendChild(versionText);
    credits.appendChild(authorText);
    contentContainer.appendChild(credits);

    // Barra de loading animada
    const loadingBar = document.createElement('div');
    loadingBar.style.cssText = "width:200px;height:2px;background-color:rgba(50,50,50,0.5);margin-top:30px;border-radius:2px;overflow:hidden;opacity:0;transform:translateY(20px);transition:all 0.7s ease 1.7s;";

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
            25% { transform: translate(-20px, 20px) rotate(90deg); }
            50% { transform: translate(20px, 40px) rotate(180deg); }
            75% { transform: translate(-30px, -20px) rotate(270deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
        }

        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(animStyles);

    // Adicionar ao body
    document.body.appendChild(splashScreen);

    // Iniciar animações após um pequeno atraso
    setTimeout(() => {
        splashScreen.style.opacity = '1';
        topLine.style.transform = 'translateY(0)';
        bottomLine.style.transform = 'translateY(0)';
        contentContainer.style.opacity = '1';
        contentContainer.style.transform = 'scale(1)';

        // Animar cada letra do logo
        const letters = logoText.querySelectorAll('span > span');
        letters.forEach(letter => {
            letter.style.transform = 'translateY(0)';
        });

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
    // Fade out suave
    splashScreen.style.opacity = '0';
    setTimeout(() => splashScreen.remove(), 1000);
};

async function setupAfterSplash() {
    // Esconder o splash screen
    hideSplashScreen();

    // Continuar com o resto da inicialização
    hideSplashScreen();
    setupMenu();
    setupMain();

    console.clear();
}

async function loadScript(url, label) { return fetch(url).then(response => response.text()).then(script => { loadedPlugins.push(label); eval(script); }); }
async function loadCss(url) { return new Promise((resolve) => { const link = document.createElement('link'); link.rel = 'stylesheet'; link.type = 'text/css'; link.href = url; link.onload = () => resolve(); document.head.appendChild(link); }); }

/* Visual Functions */
function setupMenu() {
    loadScript(repoPath + 'visuals/mainMenu.js', 'mainMenu');
    loadScript(repoPath + 'visuals/statusPanel.js', 'statusPanel');
    loadScript(repoPath + 'visuals/widgetBot.js', 'widgetBot');
    if (isDev) loadScript(repoPath + 'visuals/devTab.js', 'devTab');
}

/* Main Functions */
function setupMain() {
    loadScript(repoPath + 'functions/questionSpoof.js', 'questionSpoof');
    loadScript(repoPath + 'functions/videoSpoof.js', 'videoSpoof');
    loadScript(repoPath + 'functions/minuteFarm.js', 'minuteFarm');
    loadScript(repoPath + 'functions/spoofUser.js', 'spoofUser');
    loadScript(repoPath + 'functions/answerRevealer.js', 'answerRevealer');
    loadScript(repoPath + 'functions/rgbLogo.js', 'rgbLogo');
    loadScript(repoPath + 'functions/customBanner.js', 'customBanner');
    loadScript(repoPath + 'functions/autoAnswer.js', 'autoAnswer');
}

/* Inject */
if (!/^https?:\/\/([a-z0-9-]+\.)?khanacademy\.org/.test(window.location.href)) { alert("❌ Khanware Failed to Injected!\n\nVocê precisa executar o Khanware no site do Khan Academy! (https://pt.khanacademy.org/)"); window.location.href = "https://pt.khanacademy.org/"; }

showSplashScreen();

loadScript('https://raw.githubusercontent.com/adryd325/oneko.js/refs/heads/main/oneko.js', 'onekoJs').then(() => { onekoEl = document.getElementById('oneko'); onekoEl.style.backgroundImage = "url('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif')"; onekoEl.style.display = "none"; });
loadScript('https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js', 'darkReaderPlugin').then(() => { DarkReader.setFetchMethod(window.fetch); DarkReader.enable(); })
loadCss('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css', 'toastifyCss');
loadScript('https://cdn.jsdelivr.net/npm/toastify-js', 'toastifyPlugin')
    .then(async () => {
        await fetch(`https://${window.location.hostname}/api/internal/graphql/getFullUserProfile`, { headers: { accept: "*/*", "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7", "content-type": "application/json", priority: "u=1, i", "sec-ch-ua": '"Chromium";v="134", "Not:A-Brand";v="24", "Brave";v="134"', "sec-ch-ua-mobile": "?0", "sec-ch-ua-platform": '"Windows"', "sec-fetch-dest": "empty", "sec-fetch-mode": "cors", "sec-fetch-site": "same-origin", "sec-gpc": "1", "x-ka-fkey": "1" }, referrer: "https://pt.khanacademy.org/profile/me/teacher/kaid_589810246138844031185299/class/6245691961556992", referrerPolicy: "strict-origin-when-cross-origin", body: '{"operationName":"getFullUserProfile","variables":{},"query":"query getFullUserProfile($kaid: String, $username: String) {\\n  user(kaid: $kaid, username: $username) {\\n    id\\n    kaid\\n    key\\n    userId\\n    email\\n    username\\n    profileRoot\\n    gaUserId\\n    isPhantom\\n    isDeveloper: hasPermission(name: \\"can_do_what_only_admins_can_do\\")\\n    isPublisher: hasPermission(name: \\"can_publish\\", scope: ANY_ON_CURRENT_LOCALE)\\n    isModerator: hasPermission(name: \\"can_moderate_users\\", scope: GLOBAL)\\n    isParent\\n    isTeacher\\n    isFormalTeacher\\n    isK4dStudent\\n    isKmapStudent\\n    isDataCollectible\\n    isChild\\n    isOrphan\\n    isCoachingLoggedInUser\\n    canModifyCoaches\\n    nickname\\n    hideVisual\\n    joined\\n    points\\n    countVideosCompleted\\n    bio\\n    profile {\\n      accessLevel\\n      __typename\\n    }\\n    soundOn\\n    muteVideos\\n    showCaptions\\n    prefersReducedMotion\\n    noColorInVideos\\n    newNotificationCount\\n    canHellban: hasPermission(name: \\"can_ban_users\\", scope: GLOBAL)\\n    canMessageUsers: hasPermission(\\n      name: \\"can_send_moderator_messages\\"\\n      scope: GLOBAL\\n    )\\n    isSelf: isActor\\n    hasStudents: hasCoachees\\n    hasClasses\\n    hasChildren\\n    hasCoach\\n    badgeCounts\\n    homepageUrl\\n    isMidsignupPhantom\\n    includesDistrictOwnedData\\n    includesKmapDistrictOwnedData\\n    includesK4dDistrictOwnedData\\n    canAccessDistrictsHomepage\\n    underAgeGate {\\n      parentEmail\\n      daysUntilCutoff\\n      approvalGivenAt\\n      __typename\\n    }\\n    authEmails\\n    signupDataIfUnverified {\\n      email\\n      emailBounced\\n      __typename\\n    }\\n    pendingEmailVerifications {\\n      email\\n      __typename\\n    }\\n    hasAccessToAIGuideCompanionMode\\n    hasAccessToAIGuideLearner\\n    hasAccessToAIGuideDistrictAdmin\\n    hasAccessToAIGuideParent\\n    hasAccessToAIGuideTeacher\\n    tosAccepted\\n    shouldShowAgeCheck\\n    birthMonthYear\\n    lastLoginCountry\\n    region\\n    userDistrictInfos {\\n      id\\n      isKAD\\n      district {\\n        id\\n        region\\n        __typename\\n      }\\n      __typename\\n    }\\n    schoolAffiliation {\\n      id\\n      location\\n      __typename\\n    }\\n    __typename\\n  }\\n  actorIsImpersonatingUser\\n  isAIGuideEnabled\\n  hasAccessToAIGuideDev\\n}"}', method: "POST", mode: "cors", credentials: "include" })
            .then(async response => { let data = await response.json(); user = { nickname: data.data.user.nickname, username: data.data.user.username, UID: data.data.user.id.slice(-5) }; })

        sendToast("🌿 Khanware injetado com sucesso!");

        playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/gcelzszy.wav');

        await delay(500);

        sendToast(`⭐ Bem vindo(a) de volta: ${user.nickname}`);
        if (device.apple) { await delay(500); sendToast(`🪽 Que tal comprar um Samsung?`); }

        loadedPlugins.forEach(plugin => sendToast(`🪝 ${plugin} Loaded!`, 2000, 'top'));

        // Modificar o splash screen para ter um botão de continuar
        setTimeout(() => {
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

            // Mostrar botão após um atraso
            setTimeout(() => {
                continueButton.style.opacity = '1';
                continueButton.style.transform = 'translateY(0)';
            }, 500);
        }, 4000); // Mostrar o botão após 4 segundos, dando tempo para ver a animação
    });

/* Thank you to everyone who has purchased access to my cheat as of 10/28/24.
@Thomaz015
@grazynabazio
@melyssaxavier
@WESLEY.SPREDEMANN
@carine.rech.alves
@nazare.de.maria
@jowsanth
@bielzy
@rafaeldeagostino
@AMFDS
@Jv010107
@Mattheusfreitas01
@Guilhermeoliveira2623
@Matt010101
@voncallis
@Thamiris0001
@Holmes1212
@Martinss0000
@zRoque
@LaryCouto.com.br
@IanyckFerreira
@sales7
@AleSobral
@wbzz2121
@Umunizzz
@ViniciusMancini
@ricardaosantista
@marcos10pc
@bzinxxx
@ryanmzmartins
@Kaleb1577
@brunopereirabarros
@RodrigoMartins1236751
@guixzf
@Leandrohenrq
@damnntiago
@WhoisMe777
@Gustavopc21
@matheus.hx2
@WSZL
@LeozinB2
@Davas123
@joaoviturino
@orickmaxx
@l55nar5
@nextbyhawk
@Bruninda019
@GabrielRibeiroP
@Shinjoia
@hy7pee
@arthurmondequedutra
@PedrooVsp
@zBlucker
@vitiintavares
@Holmes1212
@Anthony06927
@refinado
@ErickMarinelli
@pedroomelhor
@gabrielmonteiro0053
@Felipealexandre10
@saantzx7
@alvarosouzaribeiro
@gabrielejte
@Kevinzada
@antonio77xs
@marcus.floriano.oliveira
*/
