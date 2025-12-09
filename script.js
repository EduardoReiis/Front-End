// =============================================
// FUNÇÕES UTILITÁRIAS
// =============================================

// Formatar data para exibição (DD/MM/YYYY)
function formatarData(data) {
    if (!data) return '';
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// Formatar valor para moeda
function formatarMoeda(valor) {
    return parseFloat(valor).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Obter pagamentos do localStorage
function obterPagamentos() {
    const dados = localStorage.getItem('pagamentos');
    return dados ? JSON.parse(dados) : [];
}

// Salvar pagamentos no localStorage
function salvarPagamentos(pagamentos) {
    localStorage.setItem('pagamentos', JSON.stringify(pagamentos));
}

// Verificar status baseado na data de vencimento
function verificarStatus(vencimento, statusAtual) {
    if (statusAtual === 'paga') return 'paga';
    
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const dataVencimento = new Date(vencimento + 'T00:00:00');
    
    if (dataVencimento < hoje) {
        return 'vencida';
    }
    return 'a-vencer';
}

// =============================================
// TELA DE LOGIN
// =============================================

const formLogin = document.getElementById('formLogin');
if (formLogin) {
    formLogin.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const usuario = document.getElementById('usuario').value;
        const senha = document.getElementById('senha').value;
        
        // Verificar credenciais (simulação)
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);
        
        if (usuarioEncontrado) {
            alert('Login realizado com sucesso!');
            window.location.href = 'lista-pagamentos.html';
        } else {
            alert('Usuário ou senha incorretos!');
        }
    });
}

// =============================================
// TELA ESQUECI A SENHA
// =============================================

const formEsqueciSenha = document.getElementById('formEsqueciSenha');
if (formEsqueciSenha) {
    formEsqueciSenha.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        
        // Simulação de envio de código
        const codigoRecuperacao = Math.floor(100000 + Math.random() * 900000);
        
        alert(`Código de recuperação enviado para ${email}!\n\nCódigo (simulação): ${codigoRecuperacao}`);
        
        // Limpar formulário
        formEsqueciSenha.reset();
    });
}

// =============================================
// TELA DE CADASTRO
// =============================================

const formCadastro = document.getElementById('formCadastro');
if (formCadastro) {
    formCadastro.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const usuario = document.getElementById('usuario').value;
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        
        // Validar senha
        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }
        
        // Salvar usuário
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        
        // Verificar se usuário já existe
        if (usuarios.find(u => u.usuario === usuario || u.email === email)) {
            alert('Usuário ou e-mail já cadastrado!');
            return;
        }
        
        usuarios.push({
            email,
            usuario,
            senha,
            dataNascimento
        });
        
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'index.html';
    });
}


