// funcionalidades.js - Script para a página de funcionalidades do Menthoria

// Dados das funcionalidades
const funcionalidadesDetalhes = {
    'gestao-grupos': {
        titulo: 'Gestão de Grupos',
        icone: 'users',
        descricao: 'Organize alunos por turmas e escolas de forma intuitiva, facilitando o acompanhamento individualizado e a gestão educacional inclusiva.',
        caracteristicas: [
            'Criação e gerenciamento de turmas',
            'Organização hierárquica por escolas',
            'Perfis individuais detalhados de alunos',
            'Filtros avançados por características específicas',
            'Atribuição de múltiplos professores por turma'
        ],
        beneficios: [
            'Otimização do tempo dos educadores',
            'Visão completa do contexto educacional',
            'Facilidade na organização de atividades',
            'Acompanhamento personalizado por aluno',
            'Compartilhamento seguro de informações'
        ]
    },
    'relatorios-detalhados': {
        titulo: 'Relatórios Detalhados',
        icone: 'file-alt',
        descricao: 'Crie relatórios de progresso completos com texto, fotos e anexos, documentando cada conquista do aluno de forma estruturada e acessível.',
        caracteristicas: [
            'Modelos personalizáveis de relatórios',
            'Inclusão de mídia (fotos, vídeos, áudios)',
            'Marcadores visuais de progresso',
            'Exportação em múltiplos formatos (PDF, Word)',
            'Assinatura digital para validacão'
        ],
        beneficios: [
            'Documentação completa do desenvolvimento',
            'Facilidade na comunicação com famílias',
            'Base de dados para tomada de decisões',
            'Registro histórico do progresso',
            'Otimização de reuniões pedagógicas'
        ]
    },
    'acesso-familias': {
        titulo: 'Acesso Seguro para Famílias',
        icone: 'shield-alt',
        descricao: 'Famílias podem acompanhar o progresso de seus filhos através de acesso controlado e seguro, promovendo a transparência e participação ativa.',
        caracteristicas: [
            'Portal familiar dedicado e intuitivo',
            'Controle granular de permissões',
            'Sistema de comunicação seguro',
            'Notificações em tempo real',
            'Acesso via dispositivos móveis'
        ],
        beneficios: [
            'Fortalecimento da parceria escola-família',
            'Transparência no processo educacional',
            'Participação ativa das famílias',
            'Segurança total dos dados',
            'Comunicação eficiente e organizada'
        ]
    },
    'acessibilidade-total': {
        titulo: '100% Acessível',
        icone: 'universal-access',
        descricao: 'Interface otimizada para leitores de tela, alto contraste e navegação por teclado, garantindo acesso universal a todos os usuários.',
        caracteristicas: [
            'Compatibilidade total com leitores de tela',
            'Modo alto contraste ajustável',
            'Navegação completa por teclado',
            'Texto aumentável sem quebrar layout',
            'Alternativas textuais para mídia'
        ],
        beneficios: [
            'Inclusão digital de todos os usuários',
            'Experiência consistente em diferentes dispositivos',
            'Conformidade com diretrizes de acessibilidade',
            'Facilidade de uso para pessoas com deficiência',
            'Interface adaptável às necessidades individuais'
        ]
    },
    'galeria-momentos': {
        titulo: 'Galeria de Momentos',
        icone: 'camera',
        descricao: 'Capture e organize fotos das atividades e conquistas dos alunos, criando um portfólio visual do desenvolvimento educacional.',
        caracteristicas: [
            'Upload de fotos e vídeos com compressão inteligente',
            'Organização por data, aluno e atividade',
            'Compartilhamento controlado com famílias',
            'Marcadores de progresso visual',
            'Armazenamento em nuvem seguro'
        ],
        beneficios: [
            'Registro visual do desenvolvimento',
            'Fortalecimento da memória afetiva',
            'Facilidade na documentação pedagógica',
            'Compartilhamento positivo com famílias',
            'Base para avaliações qualitativas'
        ]
    },
    'exportacao-dados': {
        titulo: 'Exportação de Dados',
        icone: 'download',
        descricao: 'Exporte relatórios completos em PDF para compartilhar com equipes multidisciplinares e famílias, mantendo a segurança e formatação adequada.',
        caracteristicas: [
            'Formato PDF personalizável e acessível',
            'Estruturação inteligente de dados',
            'Suporte a múltiplos idiomas',
            'Compartilhamento seguro por link',
            'Marca d\'água de confidencialidade'
        ],
        beneficios: [
            'Facilidade no compartilhamento de informações',
            'Padronização de documentos',
            'Otimização de processos burocráticos',
            'Segurança na troca de dados sensíveis',
            'Compatibilidade com outros sistemas'
        ]
    },
    'planejamento-aulas': {
        titulo: 'Planejamento de Aulas',
        icone: 'calendar-alt',
        descricao: 'Crie e organize planos de aula adaptados para educação inclusiva, com recursos específicos para diferentes necessidades educacionais.',
        caracteristicas: [
            'Modelos de planos de aula inclusivos',
            'Adaptações por tipo de necessidade',
            'Integração de recursos multimídia',
            'Calendário escolar integrado',
            'Lembretes e notificações automáticas'
        ],
        beneficios: [
            'Otimização do tempo de planejamento',
            'Personalização para cada aluno',
            'Organização do ano letivo',
            'Facilidade na adaptação curricular',
            'Registro histórico de planejamentos'
        ]
    },
    'avaliacoes-personalizadas': {
        titulo: 'Avaliações Personalizadas',
        icone: 'chart-bar',
        descricao: 'Crie avaliações adaptadas às necessidades específicas de cada aluno, com métricas de progresso detalhadas e relatórios automáticos.',
        caracteristicas: [
            'Modelos de avaliação adaptáveis',
            'Métricas personalizáveis por habilidade',
            'Gráficos interativos de progresso',
            'Comparação temporal de resultados',
            'Relatórios automáticos de evolução'
        ],
        beneficios: [
            'Avaliação justa e personalizada',
            'Identificação precisa de necessidades',
            'Monitoramento contínuo do progresso',
            'Base data-driven para intervenções',
            'Otimização do processo avaliativo'
        ]
    }
};

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
    inicializarFuncionalidades();
    inicializarFiltros();
    inicializarModal();
    inicializarAcessibilidade();
});

// Inicializa o sistema de funcionalidades
function inicializarFuncionalidades() {
    console.log('🔧 Sistema de funcionalidades inicializado');
    
    // Adiciona animação de entrada para os cards
    const cards = document.querySelectorAll('.funcionalidade-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Sistema de filtros
function inicializarFiltros() {
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const funcionalidadesGrid = document.getElementById('funcionalidades-grid');
    const emptyState = document.getElementById('funcionalidades-empty');
    const limparFiltrosBtn = document.getElementById('limpar-filtros');

    filtroBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Atualiza botão ativo
            filtroBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const categoria = this.dataset.categoria;
            filtrarFuncionalidades(categoria);
        });
    });

    // Limpar filtros
    limparFiltrosBtn.addEventListener('click', function () {
        filtroBtns.forEach(b => b.classList.remove('active'));
        document.querySelector('.filtro-btn[data-categoria="todas"]').classList.add('active');
        filtrarFuncionalidades('todas');
    });

    function filtrarFuncionalidades(categoria) {
        const cards = funcionalidadesGrid.querySelectorAll('.funcionalidade-card');
        let visibleCount = 0;

        cards.forEach(card => {
            if (categoria === 'todas' || card.dataset.categoria === categoria) {
                card.style.display = 'block';
                visibleCount++;
                
                // Adiciona animação de entrada
                card.style.animation = 'fadeIn 0.6s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });

        // Mostra/oculta estado vazio
        if (visibleCount === 0) {
            emptyState.style.display = 'block';
            funcionalidadesGrid.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            funcionalidadesGrid.style.display = 'grid';
        }

        // Anuncia mudança para leitores de tela
        anunciarParaLeitorDeTela(`${visibleCount} funcionalidades encontradas`);
    }
}

// Sistema de modal
function inicializarModal() {
    const modal = document.getElementById('modal-detalhes');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalCorpo = document.getElementById('modal-corpo');
    const modalFechar = document.getElementById('modal-fechar');
    const botoesDetalhes = document.querySelectorAll('.btn-detalhes');

    // Abrir modal
    botoesDetalhes.forEach(btn => {
        btn.addEventListener('click', function () {
            const funcionalidadeId = this.dataset.funcionalidade;
            abrirModal(funcionalidadeId);
        });
    });

    // Fechar modal
    modalFechar.addEventListener('click', fecharModal);
    modal.querySelector('.modal-overlay').addEventListener('click', fecharModal);

    // Fechar com ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
            fecharModal();
        }
    });

    function abrirModal(funcionalidadeId) {
        const dados = funcionalidadesDetalhes[funcionalidadeId];
        
        if (!dados) {
            console.error('Funcionalidade não encontrada:', funcionalidadeId);
            return;
        }

        // Atualiza conteúdo do modal
        modalTitulo.textContent = dados.titulo;
        modalCorpo.innerHTML = criarConteudoModal(dados);

        // Abre modal
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Foca no botão de fechar para acessibilidade
        setTimeout(() => {
            modalFechar.focus();
        }, 100);

        // Anuncia abertura para leitores de tela
        anunciarParaLeitorDeTela(`Modal aberto: ${dados.titulo}`);
    }

    function fecharModal() {
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        // Anuncia fechamento para leitores de tela
        anunciarParaLeitorDeTela('Modal fechado');
    }

    function criarConteudoModal(dados) {
        return `
            <div class="modal-detalhes">
                <div class="modal-icon">
                    <i class="fas fa-${dados.icone}"></i>
                </div>
                
                <div class="modal-descricao">
                    <p>${dados.descricao}</p>
                </div>
                
                <div class="modal-caracteristicas">
                    <h4>Características Principais</h4>
                    <ul>
                        ${dados.caracteristicas.map(carac => `<li>${carac}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-beneficios">
                    <h4>Benefícios</h4>
                    <ul>
                        ${dados.beneficios.map(beneficio => `<li>${beneficio}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-acoes">
                    <button class="btn-primary" onclick="experimentarFuncionalidade('${dados.titulo}')">
                        <i class="fas fa-play-circle"></i>
                        Experimentar
                    </button>
                    <button class="btn-outline" onclick="fecharModal()">
                        Fechar
                    </button>
                </div>
            </div>
        `;
    }
}

// Acessibilidade
function inicializarAcessibilidade() {
    // Navegação por teclado nos filtros
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    
    filtroBtns.forEach((btn, index) => {
        btn.addEventListener('keydown', function (e) {
            // Navegação com setas
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextBtn = filtroBtns[index + 1] || filtroBtns[0];
                nextBtn.focus();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevBtn = filtroBtns[index - 1] || filtroBtns[filtroBtns.length - 1];
                prevBtn.focus();
            }
        });
    });

    // Navegação nos cards
    const cards = document.querySelectorAll('.funcionalidade-card');
    
    cards.forEach(card => {
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const btn = this.querySelector('.btn-detalhes');
                if (btn) btn.click();
            }
        });

        // Torna os cards focáveis
        card.setAttribute('tabindex', '0');
    });
}

// Funções auxiliares
function experimentarFuncionalidade(nome) {
    // Em um cenário real, isso redirecionaria para uma demonstração
    // Por enquanto, mostra uma notificação
    if (typeof showNotification === 'function') {
        showNotification(`Demonstração da funcionalidade "${nome}" iniciada!`, 'success');
    } else {
        alert(`Demonstração da funcionalidade "${nome}" iniciada!`);
    }
    
    // Fecha o modal
    fecharModal();
}

function fecharModal() {
    const modal = document.getElementById('modal-detalhes');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
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

// Atalhos de teclado globais
document.addEventListener('keydown', function (e) {
    // Ctrl/Cmd + F para focar nos filtros
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        const primeiroFiltro = document.querySelector('.filtro-btn');
        if (primeiroFiltro) primeiroFiltro.focus();
    }
    
    // Ctrl/Cmd + M para abrir modal da primeira funcionalidade
    if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
        e.preventDefault();
        const primeiroBtn = document.querySelector('.btn-detalhes');
        if (primeiroBtn) primeiroBtn.click();
    }
});

// Exporta funções para uso global
window.FuncionalidadesApp = {
    abrirModal: (id) => {
        const modal = document.getElementById('modal-detalhes');
        const botoes = modal.querySelectorAll('.btn-detalhes');
        const botao = Array.from(botoes).find(btn => btn.dataset.funcionalidade === id);
        if (botao) botao.click();
    },
    filtrarPorCategoria: (categoria) => {
        const btn = document.querySelector(`.filtro-btn[data-categoria="${categoria}"]`);
        if (btn) btn.click();
    }
};