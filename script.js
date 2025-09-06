// Elementos do DOM
const alternarContraste = document.getElementById('alternar-contraste');
const aumentarFonte = document.getElementById('aumentar-fonte');
const diminuirFonte = document.getElementById('diminuir-fonte');
const resetarFonte = document.getElementById('resetar-fonte');
const alternarMenuMobile = document.getElementById('alternar-menu-mobile');
const menuMobile = document.getElementById('menu-mobile');

// Inicializa os ícones Lucide
document.addEventListener('DOMContentLoaded', function () {
    lucide.createIcons();
});

// Funcionalidades de Acessibilidade
let tamanhoFonteBase = 16; // Tamanho base da fonte
let altoContrasteAtivo = false;

// Alterna o Alto Contraste
function alternarAltoContraste() {
    altoContrasteAtivo = !altoContrasteAtivo;
    document.body.classList.toggle('alto-contraste', altoContrasteAtivo);
    localStorage.setItem('altoContrasteAtivo', altoContrasteAtivo);

    // Atualiza o texto do botão
    const span = alternarContraste.querySelector('span');
    span.textContent = altoContrasteAtivo ? 'Contraste Normal' : 'Alto Contraste';

    // Anuncia a mudança para leitores de tela
    anunciarParaLeitorDeTela(
        altoContrasteAtivo ? 'Alto contraste ativado' : 'Alto contraste desativado'
    );
}

// Controles de Tamanho da Fonte
function aumentarTamanhoFonte() {
    if (tamanhoFonteBase < 24) {
        tamanhoFonteBase += 2;
        atualizarTamanhoFonte();
        anunciarParaLeitorDeTela(`Fonte aumentada para ${tamanhoFonteBase}px`);
    }
}

function diminuirTamanhoFonte() {
    if (tamanhoFonteBase > 12) {
        tamanhoFonteBase -= 2;
        atualizarTamanhoFonte();
        anunciarParaLeitorDeTela(`Fonte diminuída para ${tamanhoFonteBase}px`);
    }
}

function resetarTamanhoFonte() {
    tamanhoFonteBase = 16;
    atualizarTamanhoFonte();
    anunciarParaLeitorDeTela('Fonte resetada para tamanho padrão');
}

function atualizarTamanhoFonte() {
    document.documentElement.style.setProperty('--tamanho-da-fonte-base', tamanhoFonteBase + 'px');
    localStorage.setItem('tamanhoFonte', tamanhoFonteBase);
}

// Anúncios para Leitores de Tela
function anunciarParaLeitorDeTela(mensagem) {
    const anuncio = document.createElement('div');
    anuncio.setAttribute('aria-live', 'polite');
    anuncio.setAttribute('aria-atomic', 'true');
    anuncio.className = 'sr-only';
    anuncio.style.cssText = `
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
    `;

    document.body.appendChild(anuncio);
    anuncio.textContent = mensagem;

    setTimeout(() => {
        document.body.removeChild(anuncio);
    }, 1000);
}

// Alterna o Menu Mobile
function alternarMenuMobile() {
    const estaAberto = menuMobile.classList.contains('active');
    menuMobile.classList.toggle('active');

    // Atualiza atributos ARIA
    alternarMenuMobile.setAttribute('aria-expanded', !estaAberto);
    alternarMenuMobile.setAttribute('aria-label',
        estaAberto ? 'Abrir menu de navegação' : 'Fechar menu de navegação'
    );

    // Altera o ícone
    const icone = alternarMenuMobile.querySelector('i');
    if (estaAberto) {
        icone.setAttribute('data-lucide', 'menu');
    } else {
        icone.setAttribute('data-lucide', 'x');
    }

    // Recria os ícones
    lucide.createIcons();
}

// Função para Rolagem Suave
function rolarParaSecao(sectionId) {
    const secao = document.getElementById(sectionId);
    if (secao) {
        secao.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Foca a seção para acessibilidade
        secao.setAttribute('tabindex', '-1');
        secao.focus();

        // Remove o tabindex após o foco
        setTimeout(() => {
            secao.removeAttribute('tabindex');
        }, 100);
    }
}

// Lida com cliques em links para rolagem suave
function lidarComCliqueDoLink(evento) {
    const href = evento.target.getAttribute('href');

    if (href && href.startsWith('#')) {
        evento.preventDefault();
        const sectionId = href.substring(1);
        rolarParaSecao(sectionId);

        // Fecha o menu móvel se estiver aberto
        if (menuMobile.classList.contains('active')) {
            alternarMenuMobile();
        }
    }
}

// Navegação por Teclado
function lidarComNavegacaoDoTeclado(evento) {
    // Tecla ESC fecha o menu móvel
    if (evento.key === 'Escape' && menuMobile.classList.contains('active')) {
        alternarMenuMobile();
        alternarMenuMobile.focus();
    }

    // Teclas de seta para a barra de ferramentas de acessibilidade
    if (evento.target.classList.contains('botao-barra')) {
        const botoes = document.querySelectorAll('.botao-barra');
        const indiceAtual = Array.from(botoes).indexOf(evento.target);

        let proximoIndice;
        if (evento.key === 'ArrowLeft' || evento.key === 'ArrowUp') {
            proximoIndice = indiceAtual > 0 ? indiceAtual - 1 : botoes.length - 1;
        } else if (evento.key === 'ArrowRight' || evento.key === 'ArrowDown') {
            proximoIndice = indiceAtual < botoes.length - 1 ? indiceAtual + 1 : 0;
        }

        if (proximoIndice !== undefined) {
            evento.preventDefault();
            botoes[proximoIndice].focus();
        }
    }
}

// Validação de Formulário (para futura página de login)
function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

function mostrarErroDoFormulario(input, mensagem) {
    const elementoErro = input.parentNode.querySelector('.mensagem-de-erro') ||
        document.createElement('div');
    elementoErro.className = 'mensagem-de-erro';
    elementoErro.textContent = mensagem;
    elementoErro.style.cssText = `
        color: var(--destrutivo);
        font-size: var(--tamanho-da-fonte-sm);
        margin-top: var(--espacamento-1);
    `;

    if (!input.parentNode.querySelector('.mensagem-de-erro')) {
        input.parentNode.appendChild(elementoErro);
    }

    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', elementoErro.id || 'erro-' + input.name);
}

function limparErroDoFormulario(input) {
    const elementoErro = input.parentNode.querySelector('.mensagem-de-erro');
    if (elementoErro) {
        elementoErro.remove();
    }

    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
}

// Carrega Preferências Salvas
function carregarPreferencias() {
    // Carrega a preferência de alto contraste
    const contrasteSalvo = localStorage.getItem('altoContrasteAtivo');
    if (contrasteSalvo === 'true') {
        alternarAltoContraste();
    }

    // Carrega a preferência de tamanho da fonte
    const tamanhoFonteSalvo = localStorage.getItem('tamanhoFonte');
    if (tamanhoFonteSalvo) {
        tamanhoFonteBase = parseInt(tamanhoFonteSalvo);
        atualizarTamanhoFonte();
    }
}

// Inicializa os Listeners de Eventos
function inicializarEventListeners() {
    // Barra de ferramentas de acessibilidade
    if (alternarContraste) {
        alternarContraste.addEventListener('click', alternarAltoContraste);
    }

    if (aumentarFonte) {
        aumentarFonte.addEventListener('click', aumentarTamanhoFonte);
    }

    if (diminuirFonte) {
        diminuirFonte.addEventListener('click', diminuirTamanhoFonte);
    }

    if (resetarFonte) {
        resetarFonte.addEventListener('click', resetarTamanhoFonte);
    }

    // Menu móvel
    if (alternarMenuMobile) {
        alternarMenuMobile.addEventListener('click', alternarMenuMobile);
    }

    // Rolagem suave para todos os links âncora
    document.addEventListener('click', function (evento) {
        if (evento.target.tagName === 'A' || evento.target.closest('a')) {
            const link = evento.target.tagName === 'A' ? evento.target : evento.target.closest('a');
            lidarComCliqueDoLink({ target: link, preventDefault: () => evento.preventDefault() });
        }
    });

    // Navegação por teclado
    document.addEventListener('keydown', lidarComNavegacaoDoTeclado);

    // Fecha o menu móvel ao clicar fora
    document.addEventListener('click', function (evento) {
        if (menuMobile && menuMobile.classList.contains('active') &&
            !menuMobile.contains(evento.target) &&
            !alternarMenuMobile.contains(evento.target)) {
            alternarMenuMobile();
        }
    });

    // Lida com o redimensionamento da janela
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && menuMobile && menuMobile.classList.contains('active')) {
            alternarMenuMobile();
        }
    });
}

// Otimização de Performance - Intersection Observer para animações
function inicializarIntersectionObserver() {
    const opcoesObserver = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entradas) {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('animate-in');
                observer.unobserve(entrada.target);
            }
        });
    }, opcoesObserver);

    // Observa os elementos que devem ser animados
    const elementosAnimados = document.querySelectorAll('.cartao-funcionalidade, .funcionalidade-sobre');
    elementosAnimados.forEach(el => observer.observe(el));
}

// Tratamento de Erros
window.addEventListener('error', function (evento) {
    console.error('Erro de JavaScript:', evento.error);
    // Em produção, você pode querer enviar isso para um serviço de rastreamento de erros
});

// Análise de Carregamento da Página (placeholder)
function rastrearCarregamentoPagina() {
    // Placeholder para rastreamento de análises
    console.log('Página carregada:', {
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    });
}

// Inicializa a Aplicação
document.addEventListener('DOMContentLoaded', function () {
    carregarPreferencias();
    inicializarEventListeners();
    inicializarIntersectionObserver();
    rastrearCarregamentoPagina();

    // Inicializa os ícones Lucide
    lucide.createIcons();

    // Adiciona o link para pular para acessibilidade
    const linkPular = document.createElement('a');
    linkPular.href = '#main';
    linkPular.className = 'link-pular';
    linkPular.textContent = 'Pular para o conteúdo principal';
    linkPular.addEventListener('click', function (e) {
        e.preventDefault();
        const main = document.querySelector('main');
        if (main) {
            main.setAttribute('tabindex', '-1');
            main.focus();
            setTimeout(() => main.removeAttribute('tabindex'), 100);
        }
    });
    document.body.insertBefore(linkPular, document.body.firstChild);

    // Adiciona o marco principal
    const main = document.querySelector('main');
    if (main) {
        main.id = 'main';
    }
});

// Exporta funções para uso potencial em outros scripts
window.MenthoriaApp = {
    rolarParaSecao,
    alternarAltoContraste,
    aumentarTamanhoFonte,
    diminuirTamanhoFonte,
    resetarTamanhoFonte,
    validarEmail,
    anunciarParaLeitorDeTela
};