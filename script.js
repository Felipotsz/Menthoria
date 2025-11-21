// menthoria-script.js - Versão reorganizada e padronizada

// ===== INICIALIZAÇÃO GERAL =====
document.addEventListener('DOMContentLoaded', function () {
    initializeThemeSystem();
    initializeNavigation();
    initializeSmoothScroll();
    initializeFormHandlers();
    initializeAnimations();
    initializeEventHandlers();
    initializeAccessibilityAside();
    loadDynamicData();
});

// ===== SISTEMA DE TEMAS =====
function initializeThemeSystem() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Carregar preferências salvas
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedColorblind = localStorage.getItem('colorblind') === 'true';

    // Aplicar tema inicial
    applyTheme(savedTheme, savedColorblind);
    updateThemeIcon(themeIcon, savedTheme);
    updateColorblindButton(savedColorblind);

    // Alternar tema claro/escuro
    themeToggle.addEventListener('click', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme-mode');
        const isColorblind = document.documentElement.getAttribute('data-theme') === 'colorblind-friendly';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        applyTheme(newTheme, isColorblind);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(themeIcon, newTheme);
    });
}

function applyTheme(themeMode, isColorblind) {
    document.documentElement.setAttribute('data-theme', isColorblind ? 'colorblind-friendly' : 'default');
    document.documentElement.setAttribute('data-theme-mode', themeMode);
}

function updateThemeIcon(icon, themeMode) {
    if (themeMode === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

function updateColorblindButton(isActive) {
    const button = document.getElementById('alternar-daltonico');
    if (button) {
        if (isActive) {
            button.classList.add('ativo');
            button.querySelector('span').textContent = 'Modo Normal';
        } else {
            button.classList.remove('ativo');
            button.querySelector('span').textContent = 'Modo Daltônico';
        }
    }
}

// ===== NAVEGAÇÃO =====
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        });

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                navToggle.querySelector('i').className = 'fas fa-bars';
            });
        });
    }

    window.addEventListener('scroll', function () {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== SCROLL SUAVE =====
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== MANIPULAÇÃO DE FORMULÁRIOS =====
function initializeFormHandlers() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.textContent.includes('Saiba Mais') ||
            button.textContent.includes('Começar') ||
            button.textContent.includes('Ver Demonstração')) {

            button.addEventListener('click', function () {
                const action = this.textContent.trim();
                showNotification(`Ação "${action}" registrada com sucesso!`, 'success');
            });
        }
    });
}

// ===== ANIMAÇÕES =====
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.card, .section-header, .hero-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== MANIPULAÇÃO DE EVENTOS =====
function initializeEventHandlers() {
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.addEventListener('click', function (e) {
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                return;
            }
        });
    });
}

// ===== ASIDE DE ACESSIBILIDADE =====
function initializeAccessibilityAside() {
    const toggleBtn = document.getElementById('toggle-acessibilidade');
    const aside = document.getElementById('aside-acessibilidade');
    const closeBtn = document.getElementById('fechar-acessibilidade');
    const overlay = document.createElement('div');
    
    overlay.id = 'overlay-acessibilidade';
    overlay.className = 'overlay-aside';
    document.body.appendChild(overlay);

    // Abrir aside
    toggleBtn.addEventListener('click', function() {
        aside.setAttribute('aria-hidden', 'false');
        overlay.classList.add('ativo');
        document.body.style.overflow = 'hidden';
    });

    // Fechar aside
    function fecharAside() {
        aside.setAttribute('aria-hidden', 'true');
        overlay.classList.remove('ativo');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', fecharAside);
    overlay.addEventListener('click', fecharAside);

    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && aside.getAttribute('aria-hidden') === 'false') {
            fecharAside();
        }
    });

    // Configurações de acessibilidade
    const aumentarFonte = document.getElementById('aumentar-fonte');
    const diminuirFonte = document.getElementById('diminuir-fonte');
    const resetarFonte = document.getElementById('resetar-fonte');
    const alternarDaltonico = document.getElementById('alternar-daltonico');
    const ativarLeitor = document.getElementById('ativar-leitor');
    const atalhosTeclado = document.getElementById('atalhos-teclado');

    // Controle de fonte
    aumentarFonte.addEventListener('click', function() {
        alterarTamanhoFonte(1);
        highlightButton(this);
    });

    diminuirFonte.addEventListener('click', function() {
        alterarTamanhoFonte(-1);
        highlightButton(this);
    });

    resetarFonte.addEventListener('click', function() {
        document.documentElement.style.fontSize = '';
        highlightButton(this);
        showNotification('Tamanho da fonte resetado', 'success');
    });

    // Tema daltônico
    alternarDaltonico.addEventListener('click', function() {
        const isColorblind = document.documentElement.getAttribute('data-theme') === 'colorblind-friendly';
        const currentMode = document.documentElement.getAttribute('data-theme-mode');
        
        applyTheme(currentMode, !isColorblind);
        localStorage.setItem('colorblind', (!isColorblind).toString());
        
        updateColorblindButton(!isColorblind);
        highlightButton(this, !isColorblind);
        
        if (!isColorblind) {
            showNotification('Modo daltônico ativado', 'success');
        } else {
            showNotification('Modo daltônico desativado', 'info');
        }
    });

    // Leitor de tela (simulação)
    ativarLeitor.addEventListener('click', function() {
        highlightButton(this);
        showNotification('Recurso de leitor de tela em desenvolvimento', 'info');
    });

    // Atalhos de teclado
    atalhosTeclado.addEventListener('click', function() {
        highlightButton(this);
        mostrarAtalhosTeclado();
    });

    // Atalhos de teclado globais
    document.addEventListener('keydown', function(e) {
        // Ctrl + Alt + A para abrir acessibilidade
        if (e.ctrlKey && e.altKey && e.key === 'a') {
            e.preventDefault();
            toggleBtn.click();
        }
        
        // Ctrl + Alt + D para modo daltônico
        if (e.ctrlKey && e.altKey && e.key === 'd') {
            e.preventDefault();
            alternarDaltonico.click();
        }
        
        // Ctrl + Alt + T para alternar tema claro/escuro
        if (e.ctrlKey && e.altKey && e.key === 't') {
            e.preventDefault();
            document.getElementById('theme-toggle').click();
        }
    });
}

// ===== FUNÇÕES DE ACESSIBILIDADE =====
function highlightButton(button, manterAtivo = false) {
    const grupo = button.closest('.acessibilidade-grupo');
    if (grupo) {
        const botoes = grupo.querySelectorAll('.botao-acessibilidade');
        botoes.forEach(btn => {
            if (btn !== button || !manterAtivo) {
                btn.classList.remove('ativo');
            }
        });
    }
    
    if (manterAtivo) {
        button.classList.add('ativo');
    } else {
        button.classList.add('ativo');
        setTimeout(() => {
            if (button.parentNode) {
                button.classList.remove('ativo');
            }
        }, 1000);
    }
}

function alterarTamanhoFonte(direcao) {
    const html = document.documentElement;
    const tamanhoAtual = parseFloat(getComputedStyle(html).fontSize);
    const novoValor = tamanhoAtual + (direcao * 2);
    
    if (novoValor >= 12 && novoValor <= 24) {
        html.style.fontSize = novoValor + 'px';
        const acao = direcao > 0 ? 'aumentado' : 'diminuído';
        showNotification(`Tamanho da fonte ${acao}`, 'success');
    } else {
        showNotification('Tamanho limite atingido', 'warning');
    }
}

function mostrarAtalhosTeclado() {
    const atalhosHTML = `
        <div class="atalhos-lista">
            <h4>Atalhos de Teclado</h4>
            <div class="atalho-item">
                <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>A</kbd>
                <span>Abrir menu de acessibilidade</span>
            </div>
            <div class="atalho-item">
                <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>D</kbd>
                <span>Alternar modo daltônico</span>
            </div>
            <div class="atalho-item">
                <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd>
                <span>Alternar tema claro/escuro</span>
            </div>
            <div class="atalho-item">
                <kbd>Tab</kbd>
                <span>Navegar entre elementos</span>
            </div>
            <div class="atalho-item">
                <kbd>Enter</kbd>
                <span>Ativar elemento selecionado</span>
            </div>
            <div class="atalho-item">
                <kbd>Esc</kbd>
                <span>Fechar menus</span>
            </div>
        </div>
    `;
    
    showNotification(atalhosHTML, 'info', 10000);
}

// ===== SISTEMA DE NOTIFICAÇÕES =====
function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    if (message.includes('<')) {
        notification.innerHTML = message;
    } else {
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
    }

    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: hsl(var(--card));
        color: hsl(var(--card-foreground));
        padding: 1rem 1.5rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow-lg);
        border-left: 4px solid ${getNotificationColor(type)};
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        max-width: 400px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;

    if (message.includes('atalhos-lista')) {
        notification.style.maxWidth = '500px';
        notification.style.padding = '1.5rem';
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            closeNotification(notification);
        });
    }

    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification);
        }
    }, duration);
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#4ECDC4',
        error: '#FF6B6B',
        warning: '#FFD93D',
        info: 'hsl(var(--primary))'
    };
    return colors[type] || 'hsl(var(--primary))';
}

// ===== FUNÇÕES UTILITÁRIAS =====
function rolarParaSecao(secaoId) {
    const secao = document.getElementById(secaoId);
    if (secao) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = secao.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// ===== INICIALIZAÇÃO DE DADOS =====
function loadDynamicData() {
    setTimeout(() => {
        console.log('Sistema Menthoria carregado com sucesso!');
    }, 1000);
}
