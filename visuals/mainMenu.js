const setFeatureByPath = (path, value) => { let obj = window; const parts = path.split('.'); while (parts.length > 1) obj = obj[parts.shift()]; obj[parts[0]] = value; }

function addFeature(features) {
    const feature = document.createElement('feature');
    features.forEach(attribute => {
        let element = attribute.type === 'nonInput' ? document.createElement('label') : document.createElement('input');
        if (attribute.type === 'nonInput') element.innerHTML = attribute.name;
        else { element.type = attribute.type; element.id = attribute.name; }

        if (attribute.attributes) {
            attribute.attributes.split(' ').map(attr => attr.split('=')).forEach(([key, value]) => {
                value = value ? value.replace(/"/g, '') : '';
                key === 'style' ? element.style.cssText = value : element.setAttribute(key, value);
            });
        }

        if (attribute.variable) element.setAttribute('setting-data', attribute.variable);
        if (attribute.dependent) element.setAttribute('dependent', attribute.dependent);
        if (attribute.className) element.classList.add(attribute.className);

        if (attribute.labeled) {
            const label = document.createElement('label');
            if (attribute.className) label.classList.add(attribute.className);
            if (attribute.attributes) {
                attribute.attributes.split(' ').map(attr => attr.split('=')).forEach(([key, value]) => {
                    value = value ? value.replace(/"/g, '') : '';
                    key === 'style' ? label.style.cssText = value : label.setAttribute(key, value);
                });
            }

            // Adicionar elementos personalizados para melhorar a aparência dos botões
            if (attribute.type === 'checkbox') {
                label.innerHTML = `
                    <div class="kw-switch-container">
                        ${element.outerHTML}
                        <div class="kw-switch-track"></div>
                        <div class="kw-switch-thumb"></div>
                    </div>
                    <span class="kw-label-text">${attribute.label}</span>
                `;
            } else {
                label.innerHTML = `${element.outerHTML} <span class="kw-label-text">${attribute.label}</span>`;
            }

            // Adicionar indicador de sucesso para itens ativados
            if (attribute.type === 'checkbox') {
                const successIndicator = document.createElement('div');
                successIndicator.className = 'kw-success-indicator';
                successIndicator.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" fill="#72ff72" opacity="0"/>
                    </svg>
                `;
                label.appendChild(successIndicator);
            }

            // Adicionar efeito ripple para os cliques
            const rippleEffect = document.createElement('div');
            rippleEffect.className = 'kw-ripple-effect';
            label.appendChild(rippleEffect);

            feature.appendChild(label);
        } else {
            if (attribute.type === 'range') {
                const rangeContainer = document.createElement('div');
                rangeContainer.className = 'kw-range-container';
                rangeContainer.appendChild(element);

                // Adicionar marcadores para o slider
                const markers = document.createElement('div');
                markers.className = 'kw-range-markers';

                // Determinar min, max e step
                const min = parseInt(element.getAttribute('min') || '1');
                const max = parseInt(element.getAttribute('max') || '3');

                // Adicionar marcadores para o slider
                for (let i = min; i <= max; i++) {
                    const marker = document.createElement('div');
                    marker.className = 'kw-range-marker';
                    marker.setAttribute('data-value', i.toString());
                    markers.appendChild(marker);
                }

                rangeContainer.appendChild(markers);
                feature.appendChild(rangeContainer);
            } else {
                feature.appendChild(element);
            }
        }
    });
    dropdownMenu.innerHTML += feature.outerHTML;
}

function handleInput(ids, callback = null) {
    (Array.isArray(ids) ? ids.map(id => document.getElementById(id)) : [document.getElementById(ids)])
        .forEach(element => {
            if (!element) return;
            const setting = element.getAttribute('setting-data'),
                dependent = element.getAttribute('dependent'),
                handleEvent = (e, value) => {
                    setFeatureByPath(setting, value);
                    if (callback) callback(value, e);
                };

            if (element.type === 'checkbox') {
                element.addEventListener('change', (e) => {
                    playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/5os0bypi.wav');
                    handleEvent(e, e.target.checked);
                    if (dependent) dependent.split(',').forEach(dep =>
                        document.querySelectorAll(`.${dep}`).forEach(depEl =>
                            depEl.style.display = e.target.checked ? null : "none"));
                });
            } else {
                element.addEventListener('input', (e) => handleEvent(e, e.target.value));
            }
        });
}

/* Watermark - Design Moderno e Animado */
Object.assign(watermark.style, {
    position: 'fixed', top: '20px', right: '20px', width: 'auto', height: 'auto',
    backgroundColor: 'rgba(15, 15, 15, 0.75)', color: 'white', fontSize: '16px',
    fontFamily: 'MuseoSans, sans-serif', display: 'flex', justifyContent: 'center',
    alignItems: 'center', cursor: 'default', userSelect: 'none', padding: '12px 20px',
    borderRadius: '15px', zIndex: '1001', transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
    backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
    border: '1px solid rgba(114, 255, 114, 0.2)'
});

if (device.mobile) {
    watermark.style.top = '10px';
    watermark.style.right = '10px';
    watermark.style.padding = '8px 15px';
    watermark.style.fontSize = '14px';
}

watermark.innerHTML = `
    <div class="kw-logo-container">
        <span class="kw-logo">K</span>
        <span class="kw-logo" style="color:#72ff72;">W</span>
    </div>
    <div class="kw-info">
        <span class="kw-version">${ver}</span>
        <span class="kw-by">@mairinkdev</span>
    </div>
`;

document.body.appendChild(watermark);

let isDragging = false, offsetX, offsetY;

watermark.addEventListener('mousedown', e => {
    if (!dropdownMenu.contains(e.target)) {
        isDragging = true;
        offsetX = e.clientX - watermark.offsetLeft;
        offsetY = e.clientY - watermark.offsetTop;
        watermark.style.transform = 'scale(0.95)';
        watermark.style.opacity = '0.9';
    }
});

watermark.addEventListener('mouseup', () => {
    isDragging = false;
    watermark.style.transform = 'scale(1)';
    watermark.style.opacity = '1';
});

document.addEventListener('mousemove', e => {
    if (isDragging) {
        let newX = Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - watermark.offsetWidth));
        let newY = Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - watermark.offsetHeight));
        Object.assign(watermark.style, {
            left: `${newX}px`,
            top: `${newY}px`,
            right: 'auto'
        });
        dropdownMenu.style.display = 'none';
    }
});

/* Dropdown - Menu Moderno */
Object.assign(dropdownMenu.style, {
    position: 'absolute', top: 'calc(100% + 10px)', right: '0', width: '280px',
    backgroundColor: 'rgba(15, 15, 15, 0.85)', borderRadius: '15px', color: 'white',
    fontSize: '14px', fontFamily: 'MuseoSans, sans-serif', display: 'none',
    flexDirection: 'column', zIndex: '1000', padding: '15px', cursor: 'default',
    userSelect: 'none', transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
    border: '1px solid rgba(114, 255, 114, 0.2)',
    maxHeight: '80vh',
    overflowY: 'auto',
    overflowX: 'hidden'
});

if (device.mobile) {
    dropdownMenu.style.width = '220px';
    dropdownMenu.style.padding = '10px';
    dropdownMenu.style.fontSize = '12px';
    dropdownMenu.style.right = '0';
}

dropdownMenu.innerHTML = `
    <div class="kw-menu-header">
        <span class="kw-menu-title">KHANWARE</span>
        <span class="kw-menu-subtitle">CONTROLS</span>
    </div>
    <div class="kw-menu-divider"></div>

    <style>
        .kw-logo-container {
            display: flex;
            align-items: center;
            margin-right: 8px;
        }

        .kw-logo {
            font-size: 20px;
            font-weight: bold;
            letter-spacing: -1px;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
        }

        .kw-info {
            display: flex;
            flex-direction: column;
            margin-left: 5px;
            line-height: 1;
        }

        .kw-version {
            font-size: 10px;
            opacity: 0.7;
            margin-bottom: 2px;
        }

        .kw-by {
            font-size: 10px;
            color: #72ff72;
        }

        .kw-menu-header {
            text-align: center;
            margin-bottom: 12px;
        }

        .kw-menu-title {
            display: block;
            font-size: 16px;
            font-weight: bold;
            letter-spacing: 1px;
        }

        .kw-menu-subtitle {
            display: block;
            font-size: 10px;
            opacity: 0.6;
            letter-spacing: 2px;
            margin-top: -2px;
        }

        .kw-menu-divider {
            height: 1px;
            background: linear-gradient(to right, rgba(114, 255, 114, 0), rgba(114, 255, 114, 0.5), rgba(114, 255, 114, 0));
            margin: 5px 0 15px 0;
        }

        .kw-section-title {
            font-size: 12px;
            color: #72ff72;
            margin: 15px 0 8px 0;
            letter-spacing: 1px;
            font-weight: 600;
        }

        /* Estilos melhorados para os switches */
        .kw-switch-container {
            position: relative;
            width: 36px;
            height: 18px;
            margin-right: 10px;
        }

        input[type="checkbox"] {
            position: absolute;
            opacity: 0;
            width: 0;
            height: 0;
        }

        .kw-switch-track {
            position: absolute;
            top: 0;
            left: 0;
            width: 36px;
            height: 18px;
            background-color: rgba(50, 50, 50, 0.8);
            border-radius: 10px;
            transition: all 0.3s ease;
        }

        .kw-switch-thumb {
            position: absolute;
            top: 2px;
            left: 2px;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: white;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        input[type="checkbox"]:checked + .kw-switch-track {
            background-color: rgba(114, 255, 114, 0.6);
        }

        input[type="checkbox"]:checked ~ .kw-switch-thumb {
            left: 20px;
            background-color: white;
        }

        input[type="checkbox"]:checked ~ .kw-success-indicator svg path {
            opacity: 1;
            transition: opacity 0.3s ease 0.1s;
        }

        .kw-label-text {
            font-weight: 400;
            transition: all 0.3s ease;
        }

        label:hover .kw-label-text {
            transform: translateX(3px);
        }

        /* Efeito Ripple */
        .kw-ripple-effect {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 8px;
            overflow: hidden;
            pointer-events: none;
        }

        .kw-ripple-effect:after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 5px;
            height: 5px;
            background: rgba(255, 255, 255, 0.4);
            opacity: 0;
            border-radius: 100%;
            transform: scale(1, 1) translate(-50%);
            transform-origin: 50% 50%;
        }

        label:active .kw-ripple-effect:after {
            animation: ripple 0.4s ease-out;
        }

        @keyframes ripple {
            0% {
                transform: scale(0, 0);
                opacity: 0.5;
            }
            100% {
                transform: scale(20, 20);
                opacity: 0;
            }
        }

        /* Estilos melhorados para campos de texto */
        input[type="text"], input[type="number"] {
            width: calc(100% - 20px);
            border: none;
            background-color: rgba(50, 50, 50, 0.5);
            color: white;
            padding: 8px 10px;
            border-radius: 8px;
            margin: 5px 0;
            transition: all 0.3s ease;
            font-family: 'MuseoSans', sans-serif;
        }

        input[type="text"]:focus, input[type="number"]:focus {
            background-color: rgba(70, 70, 70, 0.7);
            outline: none;
            box-shadow: 0 0 0 2px rgba(114, 255, 114, 0.4);
        }

        /* Estilos melhorados para sliders */
        .kw-range-container {
            width: 100%;
            padding: 10px 0;
            position: relative;
        }

        input[type="range"] {
            width: 100%;
            height: 4px;
            -webkit-appearance: none;
            background: rgba(50, 50, 50, 0.7);
            border-radius: 2px;
            margin: 10px 0;
        }

        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 16px;
            height: 16px;
            background-color: #72ff72;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 0 5px rgba(114, 255, 114, 0.5);
        }

        input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.1);
        }

        .kw-range-markers {
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
        }

        .kw-range-marker {
            position: relative;
            width: 4px;
            height: 4px;
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
        }

        .kw-range-marker:after {
            content: attr(data-value);
            position: absolute;
            top: 8px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 9px;
            color: rgba(255, 255, 255, 0.5);
        }

        /* Melhorias gerais */
        label {
            display: flex;
            align-items: center;
            color: rgba(255, 255, 255, 0.8);
            padding: 8px 10px;
            border-radius: 8px;
            transition: all 0.2s ease;
            margin: 2px 0;
            font-weight: 300;
            position: relative;
            overflow: hidden;
        }

        label:hover {
            background-color: rgba(255, 255, 255, 0.05);
            transform: translateX(3px);
            color: white;
        }

        label:active {
            background-color: rgba(255, 255, 255, 0.08);
            transform: scale(0.98);
        }

        feature {
            display: block;
            margin-bottom: 4px;
        }

        .range-value {
            font-size: 10px;
            color: rgba(255, 255, 255, 0.6);
            margin-top: -10px;
            text-align: center;
        }

        .user-info {
            margin-top: 20px;
            padding: 10px;
            text-align: center;
            background-color: rgba(50, 50, 50, 0.3);
            border-radius: 8px;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
            transition: all 0.3s ease;
        }

        .user-info:hover {
            background-color: rgba(114, 255, 114, 0.1);
            transform: translateY(-2px);
        }

        /* Indicador de sucesso */
        .kw-success-indicator {
            margin-left: auto;
            opacity: 0.7;
            transition: all 0.3s ease;
        }

        label:hover .kw-success-indicator {
            opacity: 1;
        }

        /* Add these nice gradients for the categorized features */
        .cheats-section { color: rgba(255, 125, 125, 0.9); }
        .visuals-section { color: rgba(125, 255, 255, 0.9); }
        .settings-section { color: rgba(255, 255, 125, 0.9); }

        /* Botão para reiniciar configurações */
        .kw-reset-button {
            display: block;
            width: 100%;
            margin-top: 15px;
            padding: 8px 0;
            background-color: rgba(255, 100, 100, 0.1);
            border: 1px solid rgba(255, 100, 100, 0.3);
            border-radius: 8px;
            color: rgba(255, 255, 255, 0.8);
            font-size: 12px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .kw-reset-button:hover {
            background-color: rgba(255, 100, 100, 0.2);
            transform: translateY(-2px);
        }
    </style>
`;

watermark.appendChild(dropdownMenu);

// Recursos organizados por categorias
let featuresList = [
    { name: 'CHEATS', type: 'nonInput', attributes: 'class="kw-section-title cheats-section"' },
    { name: 'questionSpoof', type: 'checkbox', variable: 'features.questionSpoof', attributes: 'checked', labeled: true, label: 'Question Spoof' },
    { name: 'videoSpoof', type: 'checkbox', variable: 'features.videoSpoof', attributes: 'checked', labeled: true, label: 'Video Spoof' },
    { name: 'showAnswers', type: 'checkbox', variable: 'features.showAnswers', labeled: true, label: 'Answer Revealer' },
    { name: 'autoAnswer', type: 'checkbox', variable: 'features.autoAnswer', dependent: 'autoAnswerDelay,nextRecomendation,repeatQuestion', labeled: true, label: 'Auto Answer' },
    { name: 'repeatQuestion', className: 'repeatQuestion', type: 'checkbox', variable: 'features.repeatQuestion', attributes: 'style="display:none;"', labeled: true, label: 'Repeat Question' },
    { name: 'nextRecomendation', className: 'nextRecomendation', type: 'checkbox', variable: 'features.nextRecomendation', attributes: 'style="display:none;"', labeled: true, label: 'Recomendations' },
    { name: 'autoAnswerDelay', className: 'autoAnswerDelay', type: 'range', variable: 'features.autoAnswerDelay', attributes: 'style="display:none;" min="1" max="3" value="1"', labeled: false },
    { name: 'autoAnswerDelayValue', className: 'autoAnswerDelay range-value', type: 'nonInput', attributes: 'style="display:none;"' },
    { name: 'minuteFarm', type: 'checkbox', variable: 'features.minuteFarmer', labeled: true, label: 'Minute Farmer' },

    { name: 'VISUALS', type: 'nonInput', attributes: 'class="kw-section-title visuals-section"' },
    { name: 'customBanner', type: 'checkbox', variable: 'features.customBanner', labeled: true, label: 'Custom Banner' },
    { name: 'rgbLogo', type: 'checkbox', variable: 'features.rgbLogo', labeled: true, label: 'RGB Logo' },
    { name: 'darkMode', type: 'checkbox', variable: 'features.darkMode', attributes: 'checked', labeled: true, label: 'Dark Mode' },
    { name: 'onekoJs', type: 'checkbox', variable: 'features.onekoJs', labeled: true, label: 'oneko.js Animation' },

    { name: 'SETTINGS', type: 'nonInput', attributes: 'class="kw-section-title settings-section"' },
    { name: 'Username', type: 'nonInput', attributes: 'style="font-size:11px;opacity:0.8;margin:5px 0;"' },
    { name: 'customName', type: 'text', variable: 'featureConfigs.customUsername', attributes: 'autocomplete="off" placeholder="Custom Username"' },
    { name: 'Profile Image', type: 'nonInput', attributes: 'style="font-size:11px;opacity:0.8;margin:5px 0;"' },
    { name: 'customPfp', type: 'text', variable: 'featureConfigs.customPfp', attributes: 'autocomplete="off" placeholder="Image URL"' }
];

addFeature(featuresList);

// Adicionar informações do usuário no final do menu
const userInfoElement = document.createElement('div');
userInfoElement.className = 'user-info';
userInfoElement.innerHTML = `
    <div>${user.nickname}</div>
    <div style="font-size:10px;opacity:0.6;margin-top:2px;">UID: ${user.UID} | ${user.username}</div>
`;
dropdownMenu.appendChild(userInfoElement);

// Adicionar botão de reset no final do menu
const resetButton = document.createElement('div');
resetButton.className = 'kw-reset-button';
resetButton.textContent = 'Reiniciar Configurações';
resetButton.addEventListener('click', () => {
    // Efeito visual ao clicar
    resetButton.style.transform = 'scale(0.95)';
    setTimeout(() => resetButton.style.transform = '', 200);

    // Som de clique
    playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/5os0bypi.wav');

    // Confirmar reset
    const shouldReset = confirm('Deseja restaurar todas as configurações para os valores padrão?');
    if (shouldReset) {
        // Reset de configurações
        features.questionSpoof = true;
        features.videoSpoof = true;
        features.showAnswers = false;
        features.autoAnswer = false;
        features.repeatQuestion = false;
        features.nextRecomendation = false;
        features.minuteFarmer = false;
        features.customBanner = false;
        features.rgbLogo = false;
        features.darkMode = true;
        features.onekoJs = false;

        featureConfigs.autoAnswerDelay = 3;
        featureConfigs.customUsername = "";
        featureConfigs.customPfp = "";

        // Atualizar UI
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            const settingPath = checkbox.getAttribute('setting-data');
            if (settingPath) {
                const settingValue = settingPath.split('.').reduce((obj, prop) => obj[prop], window);
                checkbox.checked = settingValue;
            }
        });

        document.querySelectorAll('input[type="text"], input[type="range"]').forEach(input => {
            const settingPath = input.getAttribute('setting-data');
            if (settingPath) {
                const settingValue = settingPath.split('.').reduce((obj, prop) => obj[prop], window);
                input.value = settingValue;
            }
        });

        // Mostrar toast confirmando o reset
        sendToast("⚙️ Configurações restauradas!", 3000);
    }
});

// Adicionar após inicializar os recursos
handleInput(['questionSpoof', 'videoSpoof', 'showAnswers', 'nextRecomendation', 'repeatQuestion', 'minuteFarm', 'customBanner', 'rgbLogo']);
handleInput(['customName', 'customPfp'])
handleInput('autoAnswer', checked => checked && !features.questionSpoof && (document.querySelector('[setting-data="features.questionSpoof"]').checked = features.questionSpoof = true));
handleInput('autoAnswerDelay', value => {
    featureConfigs.autoAnswerDelay = 4 - value;
    document.querySelector('.range-value').textContent = `Delay: ${4 - value}s`;
});
handleInput('darkMode', checked => checked ? (DarkReader.setFetchMethod(window.fetch), DarkReader.enable()) : DarkReader.disable());
handleInput('onekoJs', checked => { onekoEl = document.getElementById('oneko'); if (onekoEl) { onekoEl.style.display = checked ? null : "none" } });

// Adicionar o botão de reset ao menu
dropdownMenu.appendChild(resetButton);

// Atualizar o valor do slider ao carregar
document.querySelector('.range-value').textContent = `Delay: ${featureConfigs.autoAnswerDelay}s`;

// Adicionar efeitos de hover e animações
watermark.addEventListener('mouseenter', () => {
    dropdownMenu.style.display = 'flex';
    playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/3kd01iyj.wav');

    // Animar os itens do menu ao abrir
    const items = dropdownMenu.querySelectorAll('feature, .kw-menu-header, .kw-menu-divider, .user-info');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';
        setTimeout(() => {
            item.style.transition = 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 50 + (index * 20));
    });
});

watermark.addEventListener('mouseleave', e => {
    if (!watermark.contains(e.relatedTarget)) {
        dropdownMenu.style.display = 'none';
        playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/rqizlm03.wav');
    }
});

// Estilos animados globais
const animationStyles = document.createElement('style');
animationStyles.innerHTML = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    @keyframes glow {
        0% { text-shadow: 0 0 5px rgba(114, 255, 114, 0.5); }
        50% { text-shadow: 0 0 15px rgba(114, 255, 114, 0.8), 0 0 5px rgba(114, 255, 114, 0.5); }
        100% { text-shadow: 0 0 5px rgba(114, 255, 114, 0.5); }
    }

    @keyframes borderGlow {
        0% { border-color: rgba(114, 255, 114, 0.2); }
        50% { border-color: rgba(114, 255, 114, 0.5); }
        100% { border-color: rgba(114, 255, 114, 0.2); }
    }

    watermark {
        animation: borderGlow 4s infinite;
    }

    .kw-logo {
        animation: glow 3s infinite;
    }

    .kw-menu-title {
        animation: glow 4s infinite;
    }

    @media (max-width: 768px) {
        watermark {
            padding: 10px 15px !important;
            font-size: 14px !important;
        }

        dropDownMenu {
            width: 220px !important;
        }

        .kw-logo {
            font-size: 16px !important;
        }
    }
`;

document.head.appendChild(animationStyles);
