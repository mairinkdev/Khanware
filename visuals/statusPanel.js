Object.assign(statsPanel.style, {
    position: 'fixed', top: '95%', left: '20px', width: '250px', height: '30px',
    backgroundColor: 'rgb(0,0,0,0.2)', color: 'white', fontSize: '13px', fontFamily: 'Arial, sans-serif',
    display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'default', borderRadius: '10px',
    userSelect: 'none', zIndex: '1000', transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
    backdropFilter: 'blur(1.5px)', WebkitBackdropFilter: 'blur(1.5px)',
    border: '1px solid rgba(114, 255, 114, 0.1)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
});

const getPing = async () => { if (window.disablePing) return ':( '; try { const t = performance.now(); await fetch('https://pt.khanacademy.org/', { method: 'HEAD' }); return Math.round(performance.now() - t); } catch { return 'Error'; } };

let lastFrameTime = performance.now(), frameCount = 0, fps = 0;

(function calcFPS() { if (++frameCount && performance.now() - lastFrameTime >= 1000) { fps = Math.round(frameCount * 1000 / (performance.now() - lastFrameTime)); frameCount = 0; lastFrameTime = performance.now(); } requestAnimationFrame(calcFPS); })();

const getTime = () => new Date().toLocaleTimeString();
const update = async () => statsPanel.innerHTML = `
    <span style="text-shadow: -1px 0.5px 0 #72ff72, -2px 0px 0 #2f672e;" class="kw-logo-small">KW</span>
    <span style="margin: 0 8px;">|</span><span>${fps}<span style="font-size:10px;opacity:0.7">fps</span></span>
    <span style="margin: 0 8px;">|</span><span>${await getPing()}<span style="font-size:10px;opacity:0.7">ms</span></span>
    <span style="margin: 0 8px;">|</span><span>${getTime()}</span>
    <span style="margin: 0 8px;">|</span><span style="color:#72ff72;font-size:10px;">@mairinkdev</span>
`;

// Adicionando estilos de animação para o status panel
const statusStyle = document.createElement('style');
statusStyle.innerHTML = `
    @keyframes blinkBorder {
        0% { border-color: rgba(114, 255, 114, 0.1); }
        50% { border-color: rgba(114, 255, 114, 0.5); }
        100% { border-color: rgba(114, 255, 114, 0.1); }
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes smallPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }

    .kw-logo-small {
        display: inline-block;
        animation: smallPulse 2s infinite;
    }

    statsPanel {
        animation: fadeIn 0.5s ease, blinkBorder 3s infinite;
    }

    statsPanel:hover {
        background-color: rgba(0, 0, 0, 0.4);
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
`;
document.head.appendChild(statusStyle);

update(); document.body.appendChild(statsPanel); setInterval(update, 1000);

let isDragging = false, offsetX, offsetY;

statsPanel.onmousedown = e => { isDragging = true; offsetX = e.clientX - statsPanel.offsetLeft; offsetY = e.clientY - statsPanel.offsetTop; statsPanel.style.transform = 'scale(0.9)'; };
statsPanel.onmouseup = () => { isDragging = false; statsPanel.style.transform = 'scale(1)'; };

document.onmousemove = e => { if (isDragging) { Object.assign(statsPanel.style, { left: `${Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - statsPanel.offsetWidth))}px`, top: `${Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - statsPanel.offsetHeight))}px` }); } };

// Adicionar um efeito sonoro quando o painel for clicado
statsPanel.addEventListener('click', () => {
    playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/3kd01iyj.wav');
});

if (device.mobile) plppdo.on('domChanged', () => window.location.href.includes("khanacademy.org/profile") ? statsPanel.style.display = 'flex' : statsPanel.style.display = 'none');
