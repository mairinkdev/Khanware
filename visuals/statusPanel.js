// Status Panel - Design moderno e minimalista
Object.assign(statsPanel.style, {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    width: 'auto',
    height: 'auto',
    backgroundColor: 'rgba(10, 10, 10, 0.75)',
    color: 'white',
    fontSize: '13px',
    fontFamily: 'MuseoSans, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'default',
    borderRadius: '15px',
    userSelect: 'none',
    zIndex: '1000',
    transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(114, 255, 114, 0.2)',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
    padding: '10px 15px',
    gap: '15px'
});

// Mobile responsiveness
if (device.mobile) {
    statsPanel.style.width = 'calc(100% - 40px)';
    statsPanel.style.left = '20px';
    statsPanel.style.bottom = '10px';
    statsPanel.style.borderRadius = '10px';
    statsPanel.style.padding = '8px 12px';
    statsPanel.style.fontSize = '11px';
}

// Funções para obter métricas
const getPing = async () => {
    if (window.disablePing) return '-- ';
    try {
        const t = performance.now();
        await fetch('https://pt.khanacademy.org/', { method: 'HEAD' });
        return Math.round(performance.now() - t);
    } catch {
        return 'Error';
    }
};

let lastFrameTime = performance.now(), frameCount = 0, fps = 0;

(function calcFPS() {
    if (++frameCount && performance.now() - lastFrameTime >= 1000) {
        fps = Math.round(frameCount * 1000 / (performance.now() - lastFrameTime));
        frameCount = 0;
        lastFrameTime = performance.now();
    }
    requestAnimationFrame(calcFPS);
})();

const getTime = () => new Date().toLocaleTimeString();

// Criar componentes de métrica individuais com animações e ícones
const createMetricElement = (icon, value, unit, color = '#72ff72') => {
    const metricContainer = document.createElement('div');
    metricContainer.className = 'metric-container';
    metricContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        padding: 0 5px;
    `;

    // Adicionar separador exceto para o último item
    if (unit !== 'time') {
        const separator = document.createElement('div');
        separator.style.cssText = `
            position: absolute;
            right: -7.5px;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 70%;
            background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.1), rgba(255,255,255,0));
        `;
        metricContainer.appendChild(separator);
    }

    const iconElement = document.createElement('div');
    iconElement.className = 'metric-icon';
    iconElement.innerHTML = icon;
    iconElement.style.cssText = `
        font-size: 14px;
        color: ${color};
        margin-bottom: 2px;
        transition: transform 0.3s ease;
    `;

    const valueElement = document.createElement('div');
    valueElement.className = 'metric-value';
    valueElement.innerHTML = `${value}<span style="font-size:9px;opacity:0.7;margin-left:1px;">${unit}</span>`;
    valueElement.style.cssText = `
        font-size: 12px;
        font-weight: 500;
        transition: all 0.3s ease;
    `;

    metricContainer.appendChild(iconElement);
    metricContainer.appendChild(valueElement);

    return metricContainer;
};

// Inicializar o painel
const initPanel = () => {
    // Criar ícones SVG inline
    const icons = {
        kw: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4L9 12L3 20M14 4L20 12L14 20" stroke="#72ff72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        fps: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM16.59 16.59L11 12V6H13V11.17L17.17 15.35L16.59 16.59Z" fill="#72ff72" opacity="0.8"/>
        </svg>`,
        ping: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 19H11V17H13V19ZM13 15H11C11 11.4 15 11.4 15 9C15 7.34 13.66 6 12 6C10.34 6 9 7.34 9 9H7C7 6.2 9.2 4 12 4C14.8 4 17 6.2 17 9C17 12.6 13 13 13 15Z" fill="#72ff72" opacity="0.8"/>
        </svg>`,
        time: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="#72ff72" opacity="0.8"/>
        </svg>`,
        dev: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 7H7C5.9 7 5 7.9 5 9V15C5 16.1 5.9 17 7 17H17C18.1 17 19 16.1 19 15V9C19 7.9 18.1 7 17 7ZM7 15V9H9.5V15H7ZM14.5 15H12V9H14.5V15ZM17 15H16.5V9H17V15Z" fill="#72ff72" opacity="0.8"/>
        </svg>`
    };

    // Limpar conteúdo existente
    statsPanel.innerHTML = '';

    // Adicionar métricas
    statsPanel.appendChild(createMetricElement(icons.kw, 'KW', ''));

    const fpsElement = createMetricElement(icons.fps, fps, 'fps');
    statsPanel.appendChild(fpsElement);

    const pingContainer = createMetricElement(icons.ping, '...', 'ms');
    statsPanel.appendChild(pingContainer);

    const timeElement = createMetricElement(icons.time, getTime(), 'time');
    statsPanel.appendChild(timeElement);

    // Adicionar separador vertical e crédito do desenvolvedor (apenas no desktop)
    if (!device.mobile) {
        const devElement = createMetricElement(icons.dev, '@mairinkdev', '', '#72ff72');
        statsPanel.appendChild(devElement);
    }
};

// Atualizar valores das métricas
const updateMetrics = async () => {
    const metricElements = statsPanel.querySelectorAll('.metric-value');

    // Aplicar efeito de "pulso" nos valores quando atualizados
    metricElements[1].style.transform = 'scale(1.1)';
    setTimeout(() => metricElements[1].style.transform = 'scale(1)', 150);
    metricElements[1].innerHTML = `${fps}<span style="font-size:9px;opacity:0.7;margin-left:1px;">fps</span>`;

    // Atualizar ping com animação
    const pingValue = await getPing();
    metricElements[2].style.transform = 'scale(1.1)';
    setTimeout(() => metricElements[2].style.transform = 'scale(1)', 150);
    metricElements[2].innerHTML = `${pingValue}<span style="font-size:9px;opacity:0.7;margin-left:1px;">ms</span>`;

    // Atualizar relógio
    metricElements[3].innerHTML = getTime();
};

// Adicionar efeitos de hover
const addHoverEffects = () => {
    // Adicionar efeito de hover no painel completo
    statsPanel.addEventListener('mouseenter', () => {
        statsPanel.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
        statsPanel.style.transform = 'translateY(-3px)';
        statsPanel.style.borderColor = 'rgba(114, 255, 114, 0.4)';

        // Animar os ícones no hover
        const icons = statsPanel.querySelectorAll('.metric-icon');
        icons.forEach(icon => {
            icon.style.transform = 'translateY(-2px)';
        });
    });

    statsPanel.addEventListener('mouseleave', () => {
        statsPanel.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        statsPanel.style.transform = 'translateY(0)';
        statsPanel.style.borderColor = 'rgba(114, 255, 114, 0.2)';

        const icons = statsPanel.querySelectorAll('.metric-icon');
        icons.forEach(icon => {
            icon.style.transform = 'translateY(0)';
        });
    });
};

// Adicionar animações de entrada
const addEntryAnimation = () => {
    statsPanel.style.opacity = '0';
    statsPanel.style.transform = 'translateY(20px)';

    setTimeout(() => {
        statsPanel.style.opacity = '1';
        statsPanel.style.transform = 'translateY(0)';

        // Animar cada elemento de métrica sequencialmente
        const metrics = statsPanel.querySelectorAll('.metric-container');
        metrics.forEach((metric, index) => {
            metric.style.opacity = '0';
            metric.style.transform = 'translateY(10px)';

            setTimeout(() => {
                metric.style.transition = 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)';
                metric.style.opacity = '1';
                metric.style.transform = 'translateY(0)';
            }, 100 + (index * 70));
        });
    }, 500);
};

// Implementar arrastar e soltar
let isDragging = false, offsetX, offsetY;

statsPanel.onmousedown = e => {
    isDragging = true;
    offsetX = e.clientX - statsPanel.offsetLeft;
    offsetY = e.clientY - statsPanel.offsetTop;
    statsPanel.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
    statsPanel.style.opacity = '0.8';
    statsPanel.style.cursor = 'grabbing';
};

statsPanel.onmouseup = () => {
    isDragging = false;
    statsPanel.style.transition = 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)';
    statsPanel.style.opacity = '1';
    statsPanel.style.cursor = 'grab';
};

document.onmousemove = e => {
    if (isDragging) {
        Object.assign(statsPanel.style, {
            left: `${Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - statsPanel.offsetWidth))}px`,
            top: `${Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - statsPanel.offsetHeight))}px`,
            bottom: 'auto'
        });
    }
};

// Adicionar um efeito sonoro quando o painel for clicado
statsPanel.addEventListener('click', () => {
    playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/3kd01iyj.wav');

    // Efeito de onda ao clicar
    const clickEffect = document.createElement('div');
    clickEffect.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        background-color: rgba(114, 255, 114, 0.8);
        border-radius: 50%;
        pointer-events: none;
        animation: ripple 0.7s ease-out;
        z-index: -1;
    `;

    const rippleStyle = document.createElement('style');
    rippleStyle.innerHTML = `
        @keyframes ripple {
            0% {
                width: 0;
                height: 0;
                opacity: 0.8;
            }
            100% {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    statsPanel.appendChild(clickEffect);
    setTimeout(() => clickEffect.remove(), 700);
});

// Adicionar CSS global para animações
const styleElement = document.createElement('style');
styleElement.innerHTML = `
    @keyframes borderPulse {
        0% { border-color: rgba(114, 255, 114, 0.2); }
        50% { border-color: rgba(114, 255, 114, 0.5); }
        100% { border-color: rgba(114, 255, 114, 0.2); }
    }

    statsPanel {
        animation: borderPulse 4s infinite ease-in-out;
        cursor: grab;
    }

    .metric-container {
        transition: all 0.3s ease;
    }

    .metric-container:hover .metric-icon {
        transform: translateY(-2px) !important;
        color: white !important;
    }

    .metric-container:hover .metric-value {
        color: white !important;
    }

    @media (max-width: 768px) {
        statsPanel {
            gap: 10px !important;
            padding: 8px 10px !important;
        }

        .metric-icon {
            font-size: 12px !important;
        }

        .metric-value {
            font-size: 10px !important;
        }
    }
`;
document.head.appendChild(styleElement);

// Inicializar o painel
initPanel();
document.body.appendChild(statsPanel);
addHoverEffects();
addEntryAnimation();

// Atualizar regularmente
setInterval(updateMetrics, 1000);

// Comportamento específico para mobile
if (device.mobile) {
    plppdo.on('domChanged', () =>
        window.location.href.includes("khanacademy.org/profile")
            ? statsPanel.style.display = 'flex'
            : statsPanel.style.display = 'none'
    );
}
