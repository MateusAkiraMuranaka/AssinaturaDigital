document.getElementById('assinarForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    // Obter os dados da assinatura do formulário
    const nome = document.getElementById('nome').value;
    const documento = document.getElementById('documento').value;
    const assinatura = document.getElementById('assinatura').value;

    try {
        // Enviar a assinatura para o backend
        const response = await fetch('/assinar-digitalmente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, documento, assinatura })
        });

        const data = await response.json();

        if (response.ok) {
            // Exibir mensagem de sucesso
            document.getElementById('message').innerHTML = `<p>${data.message}</p>`;
        } else {
            // Exibir mensagem de erro
            document.getElementById('message').innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        console.error('Erro ao assinar digitalmente:', error);
    }
});