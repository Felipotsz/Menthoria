// contato.js - Script para a página de contato do Menthoria

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
    inicializarContato();
    inicializarFormularioContato();
    inicializarCanaisContato();
    inicializarModalAgendamento();
    inicializarAcessibilidadeContato();
});

// Inicializa o sistema da página de contato
function inicializarContato() {
    console.log('📞 Página de contato inicializada');
    
    // Adiciona animação de entrada para os elementos
    const elementosAnimados = document.querySelectorAll('.canal-card, .faq-rapido-item, .formulario-container, .localizacao-info, .mapa-placeholder');
    elementosAnimados.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
}

// Sistema do formulário de contato
function inicializarFormularioContato() {
    const formulario = document.getElementById('form-contato');
    const campoMensagem = document.getElementById('mensagem');
    const contador = document.getElementById('contador');
    const btnEnviar = formulario.querySelector('button[type="submit"]');
    
    // Contador de caracteres da mensagem
    campoMensagem.addEventListener('input', function () {
        const caracteres = this.value.length;
        contador.textContent = caracteres;
        
        if (caracteres > 1000) {
            contador.style.color = 'hsl(var(--destructive))';
            this.classList.add('error');
        } else {
            contador.style.color = 'hsl(var(--muted-foreground))';
            this.classList.remove('error');
        }
    });
    
    // Validação em tempo real
    const campos = formulario.querySelectorAll('.form-input');
    campos.forEach(campo => {
        campo.addEventListener('blur', validarCampoContato);
        campo.addEventListener('input', limparErroCampo);
    });
    
    // Submissão do formulário
    formulario.addEventListener('submit', enviarFormularioContato);
    
    function validarCampoContato(evento) {
        const campo = evento.target;
        const valor = campo.value.trim();
        let valido = true;
        let mensagem = '';
        
        limparErroCampo(evento);
        
        // Validação de campo obrigatório
        if (campo.required && !valor) {
            valido = false;
            mensagem = 'Este campo é obrigatório';
        }
        
        // Validação de e-mail
        else if (campo.type === 'email' && valor) {
            if (!validarEmail(valor)) {
                valido = false;
                mensagem = 'Digite um e-mail válido';
            }
        }
        
        // Validação de telefone
        else if (campo.type === 'tel' && valor) {
            if (!validarTelefone(valor)) {
                valido = false;
                mensagem = 'Digite um telefone válido';
            }
        }
        
        // Validação de mensagem
        else if (campo.id === 'mensagem' && valor) {
            if (valor.length > 1000) {
                valido = false;
                mensagem = 'A mensagem deve ter no máximo 1000 caracteres';
            } else if (valor.length < 10) {
                valido = false;
                mensagem = 'A mensagem deve ter pelo menos 10 caracteres';
            }
        }
        
        if (!valido) {
            mostrarErroCampo(campo, mensagem);
        }
        
        return valido;
    }
    
    function limparErroCampo(evento) {
        const campo = evento.target;
        campo.classList.remove('error');
        
        const elementoErro = campo.parentNode.querySelector('.error-message');
        if (elementoErro) {
            elementoErro.classList.remove('show');
        }
    }
    
    function mostrarErroCampo(campo, mensagem) {
        campo.classList.add('error');
        
        const elementoErro = campo.parentNode.querySelector('.error-message');
        if (elementoErro) {
            elementoErro.textContent = mensagem;
            elementoErro.classList.add('show');
        }
        
        // Anuncia erro para leitores de tela
        anunciarParaLeitorDeTela(`Erro: ${mensagem}`);
    }
    
    async function enviarFormularioContato(evento) {
        evento.preventDefault();
        
        // Valida todos os campos
        const campos = formulario.querySelectorAll('.form-input');
        let valido = true;
        
        campos.forEach(campo => {
            if (!validarCampoContato({ target: campo })) {
                valido = false;
            }
        });
        
        if (!valido) {
            // Foca no primeiro campo com erro
            const primeiroErro = formulario.querySelector('.form-input.error');
            if (primeiroErro) {
                primeiroErro.focus();
            }
            return;
        }
        
        // Mostra estado de carregamento
        const btnTexto = btnEnviar.querySelector('.btn-text');
        const btnLoading = btnEnviar.querySelector('.btn-loading');
        
        btnTexto.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        btnEnviar.disabled = true;
        
        try {
            // Simula envio do formulário
            await simularEnvioFormulario();
            
            // Sucesso
            mostrarMensagemSucesso();
            formulario.reset();
            contador.textContent = '0';
            
        } catch (erro) {
            console.error('Erro ao enviar formulário:', erro);
            mostrarErroFormulario('Erro ao enviar mensagem. Tente novamente.');
        } finally {
            btnTexto.style.display = 'inline';
            btnLoading.style.display = 'none';
            btnEnviar.disabled = false;
        }
    }
    
    function mostrarMensagemSucesso() {
        if (typeof showNotification === 'function') {
            showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        } else {
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        }
        
        anunciarParaLeitorDeTela('Mensagem enviada com sucesso');
    }
    
    function mostrarErroFormulario(mensagem) {
        if (typeof showNotification === 'function') {
            showNotification(mensagem, 'error');
        } else {
            alert(mensagem);
        }
        
        anunciarParaLeitorDeTela('Erro ao enviar mensagem');
    }
}

// Sistema dos canais de contato
function inicializarCanaisContato() {
    const botoesCanal = document.querySelectorAll('.btn-canal');
    
    botoesCanal.forEach(botao => {
        botao.addEventListener('click', function () {
            const canal = this.dataset.canal;
            abrirCanalContato(canal);
        });
    });
    
    function abrirCanalContato(canal) {
        switch (canal) {
            case 'email':
                window.location.href = 'mailto:contato@menthoria.com?subject=Contato%20Menthoria';
                break;
                
            case 'whatsapp':
                window.open('https://wa.me/5511999999999?text=Olá! Gostaria de mais informações sobre o Menthoria', '_blank');
                break;
                
            case 'telefone':
                window.location.href = 'tel:+551133333333';
                break;
                
            case 'suporte':
                // Em um cenário real, abriria um chat
                if (typeof showNotification === 'function') {
                    showNotification('Sistema de chat em desenvolvimento. Use o WhatsApp para atendimento imediato.', 'info');
                } else {
                    alert('Sistema de chat em desenvolvimento. Use o WhatsApp para atendimento imediato.');
                }
                break;
        }
        
        // Anuncia ação para leitores de tela
        anunciarParaLeitorDeTela(`Abrindo ${canal} para contato`);
    }
}

// Sistema do modal de agendamento
function inicializarModalAgendamento() {
    const modal = document.getElementById('modal-agendamento');
    const btnAbrir = document.getElementById('agendar-demo');
    const btnFechar = document.getElementById('modal-fechar');
    const btnCancelar = document.getElementById('cancelar-agendamento');
    const formulario = document.getElementById('form-agendamento');
    const overlay = modal.querySelector('.modal-overlay');
    
    // Abrir modal
    btnAbrir.addEventListener('click', function () {
        abrirModalAgendamento();
    });
    
    // Fechar modal
    btnFechar.addEventListener('click', fecharModalAgendamento);
    btnCancelar.addEventListener('click', fecharModalAgendamento);
    overlay.addEventListener('click', fecharModalAgendamento);
    
    // Fechar com ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
            fecharModalAgendamento();
        }
    });
    
    // Submissão do formulário de agendamento
    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Simula agendamento
        if (typeof showNotification === 'function') {
            showNotification('Demonstração agendada com sucesso! Enviamos um e-mail de confirmação.', 'success');
        } else {
            alert('Demonstração agendada com sucesso! Enviamos um e-mail de confirmação.');
        }
        
        fecharModalAgendamento();
        anunciarParaLeitorDeTela('Demonstração agendada com sucesso');
    });
    
    function abrirModalAgendamento() {
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Foca no primeiro campo
        setTimeout(() => {
            const primeiroCampo = formulario.querySelector('input');
            if (primeiroCampo) primeiroCampo.focus();
        }, 100);
        
        anunciarParaLeitorDeTela('Modal de agendamento aberto');
    }
    
    function fecharModalAgendamento() {
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        formulario.reset();
        
        anunciarParaLeitorDeTela('Modal de agendamento fechado');
    }
}

// Sistema de mapa
document.addEventListener('DOMContentLoaded', function () {
    const btnMapa = document.getElementById('abrir-mapa');
    
    if (btnMapa) {
        btnMapa.addEventListener('click', function () {
            // Em um cenário real, abriria o Google Maps ou mapa integrado
            window.open('https://www.google.com/maps/place/Av.+Paulista,+1000+-+Bela+Vista,+São+Paulo+-+SP,+01310-100', '_blank');
            
            anunciarParaLeitorDeTela('Abrindo localização no mapa');
        });
    }
});

// FAQ Rápido
document.addEventListener('DOMContentLoaded', function () {
    const botoesFAQ = document.querySelectorAll('.btn-link[data-pergunta]');
    
    botoesFAQ.forEach(botao => {
        botao.addEventListener('click', function () {
            const pergunta = this.dataset.pergunta;
            
            // Em um cenário real, redirecionaria para a seção específica
            if (typeof showNotification === 'function') {
                showNotification(`Redirecionando para informações sobre ${pergunta}...`, 'info');
            }
            
            anunciarParaLeitorDeTela(`Buscando informações sobre ${pergunta}`);
        });
    });
});

// Acessibilidade
function inicializarAcessibilidadeContato() {
    // Navegação por teclado nos canais de contato
    const canais = document.querySelectorAll('.canal-card');
    
    canais.forEach((canal, index) => {
        canal.setAttribute('tabindex', '0');
        canal.setAttribute('role', 'button');
        
        canal.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const botao = this.querySelector('.btn-canal');
                if (botao) botao.click();
            }
            
            // Navegação com setas
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextCanal = canais[index + 1] || canais[0];
                nextCanal.focus();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevCanal = canais[index - 1] || canais[canais.length - 1];
                prevCanal.focus();
            }
        });
    });
    
    // Navegação no FAQ rápido
    const faqItems = document.querySelectorAll('.faq-rapido-item');
    
    faqItems.forEach((item, index) => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'article');
        
        item.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const botao = this.querySelector('.btn-link');
                if (botao) botao.click();
            }
        });
    });
}

// Funções auxiliares
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarTelefone(telefone) {
    const regex = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/;
    return regex.test(telefone);
}

async function simularEnvioFormulario() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simula falhas ocasionais
            if (Math.random() > 0.9) {
                reject(new Error('Erro de rede simulado'));
            } else {
                resolve();
            }
        }, 1500);
    });
}

function anunciarParaLeitorDeTela(mensagem) {
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
    
    setTimeout(() => {
        if (anuncio.parentNode) {
            anuncio.parentNode.removeChild(anuncio);
        }
    }, 1000);
}

// Atalhos de teclado globais para a página de contato
document.addEventListener('keydown', function (e) {
    // Ctrl/Cmd + 1 para focar no formulário
    if ((e.ctrlKey || e.metaKey) && e.key === '1') {
        e.preventDefault();
        const primeiroCampo = document.getElementById('nome');
        if (primeiroCampo) primeiroCampo.focus();
    }
    
    // Ctrl/Cmd + 2 para focar nos canais de contato
    if ((e.ctrlKey || e.metaKey) && e.key === '2') {
        e.preventDefault();
        const primeiroCanal = document.querySelector('.canal-card');
        if (primeiroCanal) primeiroCanal.focus();
    }
    
    // Ctrl/Cmd + 3 para agendar demonstração
    if ((e.ctrlKey || e.metaKey) && e.key === '3') {
        e.preventDefault();
        document.getElementById('agendar-demo').click();
    }
});

// Exporta funções para uso global
window.ContatoApp = {
    abrirCanal: (canal) => {
        const botao = document.querySelector(`.btn-canal[data-canal="${canal}"]`);
        if (botao) botao.click();
    },
    abrirAgendamento: () => {
        document.getElementById('agendar-demo').click();
    },
    preencherFormulario: (dados) => {
        // Preenche o formulário com dados fornecidos
        if (dados.nome) document.getElementById('nome').value = dados.nome;
        if (dados.email) document.getElementById('email').value = dados.email;
        if (dados.telefone) document.getElementById('telefone').value = dados.telefone;
        if (dados.assunto) document.getElementById('assunto').value = dados.assunto;
        if (dados.mensagem) document.getElementById('mensagem').value = dados.mensagem;
    }
};