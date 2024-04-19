document.addEventListener('DOMContentLoaded', () => {
    const cadastrarForm = document.getElementById('cadastrarForm');

    cadastrarForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const cargo = document.getElementById('cargo').value;
        const senha = document.getElementById('senha').value;

        fetch('/funcionarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `nome=${nome}&email=${email}&cargo=${cargo}&senha=${senha}`
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            window.location.href = '/'; // Redireciona para a página inicial
        })
        .catch(error => console.error('Erro:', error));
    });
});