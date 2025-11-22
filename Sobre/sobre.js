// sobre.js - Script para a página sobre do Menthoria

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
    inicializarSobre();
    inicializarAnimacoesNumeros();
    inicializarCarrosselDepoimentos();
    inicializarFAQ();
    inicializarAcessibilidadeSobre();
});

// Inicializa o sistema da página sobre
function inicializarSobre() {
    console.log('📖 Página sobre inicializada');
    
    // Adiciona animação de entrada para os elementos
    const elementosAnimados = document.querySelectorAll('.timeline-item, .mvv-card, .vantagem-card, .depoimento-card, .faq-item');
    elementosAnimados.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
}

// Animação dos números
function inicializarAnimacoesNumeros() {
    const numeros = document.querySelectorAll('.numero-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numero = entry.target;
                const valorFinal = parseInt(numero.getAttribute('data-count'));
                animarContagem(numero, valorFinal);
                observer.unobserve(numero);
            }
        });
    }, { threshold: 0.5 });

    numeros.forEach(numero => {
        observer.observe(numero);
    });
}

function animarContagem(elemento, valorFinal) {
    let valorAtual = 0;
    const incremento = valorFinal / 100;
    const duracao = 2000; // 2 segundos
    const intervalo = duracao / 100;
    
    elemento.classList.add('animated');
    
    const timer = setInterval(() => {
        valorAtual += incremento;
        if (valorAtual >= valorFinal) {
            valorAtual = valorFinal;
            clearInterval(timer);
        }
        elemento.textContent = Math.floor(valorAtual);
    }, intervalo);
}

// Sistema de carrossel de depoimentos
function inicializarCarrosselDepoimentos() {
    const track = document.getElementById('depoimentos-track');
    const depoimentos = track.querySelectorAll('.depoimento-card');
    const btnPrev = document.querySelector('.carrossel-prev');
    const btnNext = document.querySelector('.carrossel-next');
    
    let indiceAtual = 0;
    const totalDepoimentos = depoimentos.length;
    
    // Configura largura do track baseado no número de depoimentos
    track.style.width = `calc(${totalDepoimentos * 100}% + ${(totalDepoimentos - 1) * 2}rem)`;
    
    function atualizarCarrossel() {
        const translateX = -indiceAtual * (100 + (2 / totalDepoimentos * 100));
        track.style.transform = `translateX(${translateX}%)`;
        
        // Atualiza atributos ARIA
        depoimentos.forEach((depoimento, index) => {
            depoimento.setAttribute('aria-hidden', index !== indiceAtual);
        });
        
        // Anuncia mudança para leitores de tela
        anunciarParaLeitorDeTela(`Depoimento ${indiceAtual + 1} de ${totalDepoimentos}`);
    }
    
    function proximoDepoimento() {
        indiceAtual = (indiceAtual + 1) % totalDepoimentos;
        atualizarCarrossel();
    }
    
    function depoimentoAnterior() {
        indiceAtual = (indiceAtual - 1 + totalDepoimentos) % totalDepoimentos;
        atualizarCarrossel();
    }
    
    // Event listeners
    btnNext.addEventListener('click', proximoDepoimento);
    btnPrev.addEventListener('click', depoimentoAnterior);
    
    // Navegação por teclado
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
            proximoDepoimento();
        } else if (e.key === 'ArrowLeft') {
            depoimentoAnterior();
        }
    });
    
    // Inicializa carrossel
    atualizarCarrossel();
    
    // Auto-rotacionar (opcional)
    let autoRotate = setInterval(proximoDepoimento, 8000);
    
    // Pausar auto-rotação quando hover
    track.addEventListener('mouseenter', () => clearInterval(autoRotate));
    track.addEventListener('mouseleave', () => {
        autoRotate = setInterval(proximoDepoimento, 8000);
    });
}

// Sistema de FAQ
function inicializarFAQ() {
    const faqPerguntas = document.querySelectorAll('.faq-pergunta');
    
    faqPerguntas.forEach(pergunta => {
        pergunta.addEventListener('click', function () {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            const resposta = this.nextElementSibling;
            
            // Fecha todas as outras respostas
            faqPerguntas.forEach(p => {
                if (p !== this) {
                    p.setAttribute('aria-expanded', 'false');
                    p.nextElementSibling.setAttribute('aria-hidden', 'true');
                }
            });
            
            // Alterna estado atual
            this.setAttribute('aria-expanded', !expanded);
            resposta.setAttribute('aria-hidden', expanded);
            
            // Anuncia mudança para leitores de tela
            const perguntaTexto = this.querySelector('span').textContent;
            if (!expanded) {
                anunciarParaLeitorDeTela(`Resposta expandida para: ${perguntaTexto}`);
            }
        });
        
        // Navegação por teclado
        pergunta.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
            
            // Navegação com setas
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const next = this.parentElement.nextElementSibling?.querySelector('.faq-pergunta');
                if (next) next.focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prev = this.parentElement.previousElementSibling?.querySelector('.faq-pergunta');
                if (prev) prev.focus();
            }
        });
    });
}

// Acessibilidade
function inicializarAcessibilidadeSobre() {
    // Navegação por teclado na timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'article');
        item.setAttribute('aria-label', `Evento ${index + 1} da nossa história`);
        
        item.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Poderia expandir mais informações aqui
                const year = this.querySelector('.timeline-year').textContent;
                const title = this.querySelector('h3').textContent;
                anunciarParaLeitorDeTela(`${year}: ${title}`);
            }
        });
    });
    
    // Navegação nos cards de missão, visão e valores
    const mvvCards = document.querySelectorAll('.mvv-card');
    mvvCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
        
        const tipo = index === 0 ? 'Missão' : index === 1 ? 'Visão' : 'Valores';
        card.setAttribute('aria-label', `${tipo} do Menthoria`);
    });
}

// Funções auxiliares
function anunciarParaLeitorDeTela(mensagem) {
    // Cria um elemento para anunciar mudanças para leitores de tela
    const anuncio = document.createElement('div');
    anuncio.setAttribute('aria-live', 'polite');
    anuncio.setAttribute('aria-atomic', 'true');
    anuncio.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    anuncio.textContent = mensagem;
    
    document.body.appendChild(anuncio);
    
    // Remove após um tempo
    setTimeout(() => {
        if (anuncio.parentNode) {
            anuncio.parentNode.removeChild(anuncio);
        }
    }, 1000);
}

// Atalhos de teclado globais para a página sobre
document.addEventListener('keydown', function (e) {
    // Ctrl/Cmd + 1 para focar na timeline
    if ((e.ctrlKey || e.metaKey) && e.key === '1') {
        e.preventDefault();
        const primeiroItem = document.querySelector('.timeline-item');
        if (primeiroItem) primeiroItem.focus();
    }
    
    // Ctrl/Cmd + 2 para focar no FAQ
    if ((e.ctrlKey || e.metaKey) && e.key === '2') {
        e.preventDefault();
        const primeiraPergunta = document.querySelector('.faq-pergunta');
        if (primeiraPergunta) primeiraPergunta.focus();
    }
    
    // Ctrl/Cmd + 3 para focar nos depoimentos
    if ((e.ctrlKey || e.metaKey) && e.key === '3') {
        e.preventDefault();
        const primeiroDepoimento = document.querySelector('.depoimento-card');
        if (primeiroDepoimento) primeiroDepoimento.focus();
    }
});

// Exporta funções para uso global
window.SobreApp = {
    abrirFAQ: (index) => {
        const perguntas = document.querySelectorAll('.faq-pergunta');
        if (perguntas[index]) perguntas[index].click();
    },
    irParaDepoimento: (index) => {
        const track = document.getElementById('depoimentos-track');
        const depoimentos = track.querySelectorAll('.depoimento-card');
        if (depoimentos[index]) {
            const btnNext = document.querySelector('.carrossel-next');
            const clicksNeeded = (index - 0 + depoimentos.length) % depoimentos.length;
            for (let i = 0; i < clicksNeeded; i++) {
                btnNext.click();
            }
        }
    }
};