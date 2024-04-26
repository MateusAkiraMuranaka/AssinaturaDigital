document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            if (data.cargo === 'gerente') {
                window.location.href = '../validar_despesa.html'; // Redireciona para a página de validação de despesas
            } else if (data.cargo === 'funcionario') {
                window.location.href = '../cadastrar_despesa.html'; // Redireciona para o cadastrar_despesa
            } else{
                window.location.href = '../cadastrar_funcionario.html'; // Redireciona para o cadastrar_funcionario
            }
        } else {
            document.getElementById('message').innerHTML = data.message;
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
    }
});
