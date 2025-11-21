// login.js - Script para a página de login do Menthoria

// Variáveis de Estado
let tipoUsuarioAtual = 'professor';

// Elementos do DOM
let formularioLogin;
let formularioCadastro;
let botoesAlternarSenha;
let botoesTipoUsuario;
let grupoCodigoAcesso;
let campoSenha;
let barraForca;
let textoForca;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
    inicializarElementosLogin();
    inicializarListenersDeEventos();
    carregarPreferenciasLogin();
});

// Inicializa os elementos do DOM
function inicializarElementosLogin() {
    formularioLogin = document.getElementById('login-form');
    formularioCadastro = document.getElementById('signup-form');
    botoesAlternarSenha = document.querySelectorAll('.password-toggle');
    botoesTipoUsuario = document.querySelectorAll('.user-type-btn');
    grupoCodigoAcesso = document.getElementById('access-code-group');
    campoSenha = document.getElementById('signup-password');
    barraForca = document.querySelector('.strength-fill');
    textoForca = document.querySelector('.strength-text');
}

// Carrega preferências de acessibilidade ao iniciar a página de login
function carregarPreferenciasLogin() {
    // Tema
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedColorblind = localStorage.getItem('colorblind') === 'true';
    
    // Aplicar tema inicial
    aplicarTemaLogin(savedTheme, savedColorblind);
    
    // Tamanho da Fonte
    const tamanhoFonteSalvo = localStorage.getItem('tamanhoFonte');
    if (tamanhoFonteSalvo) {
        const tamanho = parseInt(tamanhoFonteSalvo);
        document.documentElement.style.fontSize = tamanho + 'px';
    }
    
    console.log('🔐 Preferências de login carregadas');
}

// Aplica o tema à página de login
function aplicarTemaLogin(themeMode, isColorblind) {
    document.documentElement.setAttribute('data-theme', isColorblind ? 'colorblind-friendly' : 'default');
    document.documentElement.setAttribute('data-theme-mode', themeMode);
}

// Listeners de Eventos
function inicializarListenersDeEventos() {
    // Submissão dos formulários
    if (formularioLogin) {
        formularioLogin.addEventListener('submit', lidarComLogin);
    }

    if (formularioCadastro) {
        formularioCadastro.addEventListener('submit', lidarComCadastro);
    }

    // Botões para alternar a visibilidade da senha
    botoesAlternarSenha.forEach(btn => {
        btn.addEventListener('click', alternarVisibilidadeSenha);
    });

    // Seleção do tipo de usuário
    botoesTipoUsuario.forEach(btn => {
        btn.addEventListener('click', selecionarTipoUsuario);
    });

    // Verificador de força da senha
    if (campoSenha) {
        campoSenha.addEventListener('input', verificarForcaSenha);
    }

    // Validação em tempo real
    const camposDeInput = document.querySelectorAll('.form-input');
    camposDeInput.forEach(input => {
        input.addEventListener('blur', validarCampo);
        input.addEventListener('input', limparErroDoCampo);
    });

    // Links para alternar entre formulários
    const showSignupLink = document.getElementById('show-signup');
    const showLoginLink = document.getElementById('show-login');
    
    if (showSignupLink) {
        showSignupLink.addEventListener('click', function(e) {
            e.preventDefault();
            mostrarFormularioCadastro();
        });
    }
    
    if (showLoginLink) {
        showLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            mostrarFormularioLogin();
        });
    }
}

// Funções para alternar entre formulários
function mostrarFormularioCadastro() {
    const containerLogin = document.querySelector('.login-form-container');
    const containerCadastro = document.getElementById('signup-form-container');

    containerLogin.style.display = 'none';
    containerCadastro.style.display = 'block';

    // Foca o primeiro campo de input
    const primeiroCampo = containerCadastro.querySelector('.form-input');
    if (primeiroCampo) {
        setTimeout(() => primeiroCampo.focus(), 100);
    }

    // Anuncia a mudança para leitores de tela
    anunciarParaLeitorDeTela('Formulário de cadastro carregado');
}

function mostrarFormularioLogin() {
    const containerLogin = document.querySelector('.login-form-container');
    const containerCadastro = document.getElementById('signup-form-container');

    containerCadastro.style.display = 'none';
    containerLogin.style.display = 'block';

    // Foca o primeiro campo de input
    const primeiroCampo = containerLogin.querySelector('.form-input');
    if (primeiroCampo) {
        setTimeout(() => primeiroCampo.focus(), 100);
    }

    // Anuncia a mudança para leitores de tela
    anunciarParaLeitorDeTela('Formulário de login carregado');
}

// Alterna a visibilidade da senha
function alternarVisibilidadeSenha(evento) {
    const botao = evento.currentTarget;
    const input = botao.parentNode.querySelector('input');
    const icone = botao.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icone.className = 'fas fa-eye-slash';
        botao.setAttribute('aria-label', 'Ocultar senha');
    } else {
        input.type = 'password';
        icone.className = 'fas fa-eye';
        botao.setAttribute('aria-label', 'Mostrar senha');
    }
}

// Seleciona o tipo de usuário
function selecionarTipoUsuario(evento) {
    const botao = evento.currentTarget;
    const tipo = botao.dataset.type;

    // Atualiza o estado ativo
    botoesTipoUsuario.forEach(btn => btn.classList.remove('active'));
    botao.classList.add('active');

    // Atualiza o tipo de usuário atual
    tipoUsuarioAtual = tipo;

    // Mostra/esconde o campo de código de acesso
    if (tipo === 'family') {
        grupoCodigoAcesso.style.display = 'block';
        document.getElementById('access-code').required = true;
    } else {
        grupoCodigoAcesso.style.display = 'none';
        document.getElementById('access-code').required = false;
    }

    // Anuncia a mudança
    const nomeTipo = tipo === 'professor' ? 'Professor/Agente' : 'Família';
    anunciarParaLeitorDeTela(`Tipo de usuário selecionado: ${nomeTipo}`);
}

// Verificador de força da senha
function verificarForcaSenha(evento) {
    const senha = evento.target.value;
    const forca = calcularForcaSenha(senha);

    // Atualiza a barra de força
    barraForca.className = `strength-fill ${forca.nivel}`;
    textoForca.textContent = forca.texto;

    // Atualiza acessibilidade
    evento.target.setAttribute('aria-describedby', 'password-strength');
}

function calcularForcaSenha(senha) {
    let pontuacao = 0;
    let feedback = [];

    if (senha.length >= 8) pontuacao += 1;
    else feedback.push('pelo menos 8 caracteres');

    if (/[a-z]/.test(senha)) pontuacao += 1;
    else feedback.push('letra minúscula');

    if (/[A-Z]/.test(senha)) pontuacao += 1;
    else feedback.push('letra maiúscula');

    if (/[0-9]/.test(senha)) pontuacao += 1;
    else feedback.push('número');

    if (/[^A-Za-z0-9]/.test(senha)) pontuacao += 1;
    else feedback.push('caractere especial');

    const niveis = [
        { nivel: 'weak', texto: 'Fraca' },
        { nivel: 'weak', texto: 'Fraca' },
        { nivel: 'fair', texto: 'Regular' },
        { nivel: 'good', texto: 'Boa' },
        { nivel: 'strong', texto: 'Forte' }
    ];

    return niveis[Math.min(pontuacao, 4)];
}

// Validação de Formulário
function validarCampo(evento) {
    const input = evento.target;
    const valor = input.value.trim();
    let valido = true;
    let mensagem = '';

    // Limpa erros anteriores
    limparErroDoCampo(evento);

    // Validação de campo obrigatório
    if (input.required && !valor) {
        valido = false;
        mensagem = 'Este campo é obrigatório';
    }

    // Validação de e-mail
    else if (input.type === 'email' && valor) {
        if (!validarEmail(valor)) {
            valido = false;
            mensagem = 'Digite um e-mail válido';
        }
    }

    // Validação de senha
    else if (input.type === 'password' && input.name === 'password' && valor) {
        if (valor.length < 8) {
            valido = false;
            mensagem = 'A senha deve ter pelo menos 8 caracteres';
        }
    }

    // Validação de nome
    else if (input.name === 'name' && valor) {
        if (valor.length < 2) {
            valido = false;
            mensagem = 'O nome deve ter pelo menos 2 caracteres';
        }
    }

    if (!valido) {
        mostrarErroDoCampo(input, mensagem);
    }

    return valido;
}

function mostrarErroDoCampo(input, mensagem) {
    input.classList.add('error');

    // Cria ou atualiza a mensagem de erro
    let elementoErro = input.parentNode.querySelector('.error-message');
    if (!elementoErro) {
        elementoErro = document.createElement('div');
        elementoErro.className = 'error-message';
        input.parentNode.appendChild(elementoErro);
    }

    elementoErro.textContent = mensagem;
    elementoErro.id = `error-${input.name}`;

    // Atualiza atributos ARIA
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', elementoErro.id);

    // Anuncia o erro para leitores de tela
    anunciarParaLeitorDeTela(`Erro: ${mensagem}`);
}

function limparErroDoCampo(evento) {
    const input = evento.target;
    input.classList.remove('error');

    const elementoErro = input.parentNode.querySelector('.error-message');
    if (elementoErro) {
        elementoErro.remove();
    }

    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
}

// Funções de submissão do formulário
async function lidarComLogin(evento) {
    evento.preventDefault();

    const formData = new FormData(evento.target);
    const dados = {
        email: formData.get('email'),
        senha: formData.get('password'),
        lembrar: formData.get('remember') === 'on'
    };

    // Valida o formulário
    const campos = evento.target.querySelectorAll('.form-input');
    let valido = true;

    campos.forEach(input => {
        if (!validarCampo({ target: input })) {
            valido = false;
        }
    });

    if (!valido) {
        // Foca o primeiro campo com erro
        const primeiroErro = evento.target.querySelector('.form-input.error');
        if (primeiroErro) {
            primeiroErro.focus();
        }
        return;
    }

    // Mostra o estado de carregamento
    const botaoEnviar = evento.target.querySelector('button[type="submit"]');
    mostrarCarregamentoBotao(botaoEnviar, true);

    try {
        // Simula uma chamada de API
        await simularChamadaApi(1500);

        // Sucesso - redireciona para o painel
        anunciarParaLeitorDeTela('Login realizado com sucesso');

        // Salva informações de login (em um cenário real, seria um token)
        localStorage.setItem('usuarioLogado', 'true');
        localStorage.setItem('tipoUsuario', 'professor'); // Em um caso real, viria da API

        // Mostra notificação de sucesso
        mostrarNotificacaoLogin('Login realizado com sucesso! Redirecionando...', 'success');

        // Simula o redirecionamento
        setTimeout(() => {
            window.location.href = 'dashboard.html'; // Sua página de dashboard
        }, 1000);

    } catch (erro) {
        console.error('Erro de login:', erro);
        mostrarErroDoFormulario(evento.target, 'Erro ao fazer login. Verifique suas credenciais.');
        anunciarParaLeitorDeTela('Erro ao fazer login');
    } finally {
        mostrarCarregamentoBotao(botaoEnviar, false);
    }
}

async function lidarComCadastro(evento) {
    evento.preventDefault();

    const formData = new FormData(evento.target);
    const dados = {
        nome: formData.get('name'),
        email: formData.get('email'),
        senha: formData.get('password'),
        tipoUsuario: tipoUsuarioAtual,
        codigoAcesso: formData.get('accessCode'),
        termos: formData.get('terms') === 'on'
    };

    // Valida o formulário
    const campos = evento.target.querySelectorAll('.form-input');
    let valido = true;

    campos.forEach(input => {
        if (!validarCampo({ target: input })) {
            valido = false;
        }
    });

    // Verifica a aceitação dos termos
    const checkboxTermos = document.getElementById('terms');
    if (!checkboxTermos.checked) {
        valido = false;
        mostrarErroDoCampo(checkboxTermos, 'Você deve aceitar os termos de uso');
    }

    if (!valido) {
        const primeiroErro = evento.target.querySelector('.form-input.error, input.error');
        if (primeiroErro) {
            primeiroErro.focus();
        }
        return;
    }

    // Mostra o estado de carregamento
    const botaoEnviar = evento.target.querySelector('button[type="submit"]');
    mostrarCarregamentoBotao(botaoEnviar, true);

    try {
        // Simula uma chamada de API
        await simularChamadaApi(2000);

        // Sucesso
        anunciarParaLeitorDeTela('Conta criada com sucesso');

        // Mostra notificação de sucesso
        mostrarNotificacaoLogin('Conta criada com sucesso! Faça login para continuar.', 'success');

        // Volta para o formulário de login
        setTimeout(() => {
            mostrarFormularioLogin();
        }, 1500);

    } catch (erro) {
        console.error('Erro de cadastro:', erro);
        mostrarErroDoFormulario(evento.target, 'Erro ao criar conta. Tente novamente.');
        anunciarParaLeitorDeTela('Erro ao criar conta');
    } finally {
        mostrarCarregamentoBotao(botaoEnviar, false);
    }
}

// Funções auxiliares
function mostrarCarregamentoBotao(botao, carregando) {
    const spanTexto = botao.querySelector('.btn-text');
    const spanCarregamento = botao.querySelector('.btn-loading');

    if (carregando) {
        spanTexto.style.display = 'none';
        spanCarregamento.style.display = 'inline-flex';
        botao.disabled = true;
    } else {
        spanTexto.style.display = 'inline';
        spanCarregamento.style.display = 'none';
        botao.disabled = false;
    }
}

function mostrarErroDoFormulario(formulario, mensagem) {
    // Remove erros de formulário existentes
    const erroExistente = formulario.querySelector('.form-error');
    if (erroExistente) {
        erroExistente.remove();
    }

    // Cria nova mensagem de erro
    const divErro = document.createElement('div');
    divErro.className = 'form-error';
    divErro.style.cssText = `
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid var(--destructive);
        color: var(--destructive);
        padding: 1rem;
        border-radius: var(--radius);
        margin-bottom: 1.5rem;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;

    divErro.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        ${mensagem}
    `;

    // Insere no topo do formulário
    formulario.insertBefore(divErro, formulario.firstChild);

    // Remove automaticamente após 5 segundos
    setTimeout(() => {
        if (divErro.parentNode) {
            divErro.remove();
        }
    }, 5000);
}

// Simula chamadas de API
function simularChamadaApi(atraso = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simula falhas ocasionais para fins de demonstração
            if (Math.random() > 0.9) {
                reject(new Error('Erro de API simulado'));
            } else {
                resolve();
            }
        }, atraso);
    });
}

// Funções de utilidade
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

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

function mostrarNotificacaoLogin(mensagem, tipo = 'info') {
    // Reutiliza a função de notificação do script principal se disponível
    if (typeof showNotification === 'function') {
        showNotification(mensagem, tipo);
    } else {
        // Implementação alternativa simples
        const notificacao = document.createElement('div');
        notificacao.className = `notification-login notification-${tipo}`;
        notificacao.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${tipo === 'success' ? '#4ECDC4' : '#FF6B6B'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            max-width: 300px;
        `;
        notificacao.textContent = mensagem;
        
        document.body.appendChild(notificacao);
        
        setTimeout(() => {
            if (notificacao.parentNode) {
                notificacao.parentNode.removeChild(notificacao);
            }
        }, 5000);
    }
}

// Atalhos de teclado
document.addEventListener('keydown', function (evento) {
    // Ctrl/Cmd + Enter para submeter o formulário
    if ((evento.ctrlKey || evento.metaKey) && evento.key === 'Enter') {
        const formularioAtivo = document.querySelector('form:not([style*="display: none"])');
        if (formularioAtivo) {
            const botaoEnviar = formularioAtivo.querySelector('button[type="submit"]');
            if (botaoEnviar && !botaoEnviar.disabled) {
                botaoEnviar.click();
            }
        }
    }

    // Alt + L para alternar para o formulário de login
    if (evento.altKey && evento.key === 'l') {
        evento.preventDefault();
        mostrarFormularioLogin();
    }

    // Alt + S para alternar para o formulário de cadastro
    if (evento.altKey && evento.key === 's') {
        evento.preventDefault();
        mostrarFormularioCadastro();
    }
});

// Exporta funções para uso potencial
window.LoginApp = {
    mostrarFormularioLogin,
    mostrarFormularioCadastro,
    alternarVisibilidadeSenha,
    selecionarTipoUsuario,
    validarCampo,
    lidarComLogin,
    lidarComCadastro
};

// Inicialização quando a página carrega
window.addEventListener('load', function() {
    console.log('🔐 Sistema de login Menthoria carregado');
});