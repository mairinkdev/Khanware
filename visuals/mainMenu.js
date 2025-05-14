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
            label.innerHTML = `${element.outerHTML} ${attribute.label}`;
            feature.appendChild(label);
        } else {
            feature.appendChild(element);
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

        input[type="checkbox"] {
            appearance: none;
            width: 36px;
            height: 18px;
            background-color: rgba(50, 50, 50, 0.8);
            border-radius: 10px;
            margin-right: 10px;
            cursor: pointer;
            position: relative;
            transition: all 0.3s ease;
        }

        input[type="checkbox"]:before {
            content: '';
            position: absolute;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            top: 2px;
            left: 2px;
            background-color: white;
            transition: all 0.3s ease;
        }

        input[type="checkbox"]:checked {
            background-color: rgba(114, 255, 114, 0.6);
        }

        input[type="checkbox"]:checked:before {
            left: 20px;
        }

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
        }

        input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.1);
        }

        label {
            display: flex;
            align-items: center;
            color: rgba(255, 255, 255, 0.8);
            padding: 8px 0;
            border-radius: 8px;
            transition: all 0.2s ease;
            margin: 2px 0;
            font-weight: 300;
        }

        label:hover {
            background-color: rgba(255, 255, 255, 0.05);
            transform: translateX(3px);
            color: white;
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
        }

        /* Add these nice gradients for the categorized features */
        .cheats-section { color: rgba(255, 125, 125, 0.9); }
        .visuals-section { color: rgba(125, 255, 255, 0.9); }
        .settings-section { color: rgba(255, 255, 125, 0.9); }
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

handleInput(['questionSpoof', 'videoSpoof', 'showAnswers', 'nextRecomendation', 'repeatQuestion', 'minuteFarm', 'customBanner', 'rgbLogo']);
handleInput(['customName', 'customPfp'])
handleInput('autoAnswer', checked => checked && !features.questionSpoof && (document.querySelector('[setting-data="features.questionSpoof"]').checked = features.questionSpoof = true));
handleInput('autoAnswerDelay', value => {
    featureConfigs.autoAnswerDelay = 4 - value;
    document.querySelector('.range-value').textContent = `Delay: ${4 - value}s`;
});
handleInput('darkMode', checked => checked ? (DarkReader.setFetchMethod(window.fetch), DarkReader.enable()) : DarkReader.disable());
handleInput('onekoJs', checked => { onekoEl = document.getElementById('oneko'); if (onekoEl) { onekoEl.style.display = checked ? null : "none" } });

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
