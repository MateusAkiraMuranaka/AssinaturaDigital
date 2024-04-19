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
            window.location.href = '/dashboard'; // Redireciona para o dashboard após login bem-sucedido
        } else {
            document.getElementById('message').innerHTML = data.message;
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
    }
});
