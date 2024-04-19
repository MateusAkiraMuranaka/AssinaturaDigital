const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware para parsear o corpo das requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para a página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'login.html'));
});

// Rota para autenticar o usuário
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Aqui você faria a verificação no banco de dados se o usuário e senha são válidos
    // Se forem válidos, pode retornar um token de autenticação ou redirecionar para o dashboard
    // Caso contrário, retorne uma resposta indicando que o login falhou
    if (username === 'usuario' && password === 'senha') {
        res.status(200).json({ message: 'Login bem-sucedido' });
    } else {
        res.status(401).json({ message: 'Usuário ou senha incorretos' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});