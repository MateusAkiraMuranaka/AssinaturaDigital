const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database'); // Importa o módulo database.js
const path = require('path');

const app = express();
const port = 3000;

// Servindo os arquivos estáticos da pasta 'frontend'
app.use(express.static(path.join(__dirname, 'frontend')));

app.use(bodyParser.urlencoded({ extended: true }));

// Rota para cadastrar novo funcionário
app.post('/funcionarios', (req, res) => {
    const { nome, email, cargo, senha } = req.body;
    const sql = 'INSERT INTO Funcionarios (nome, email, cargo, senha) VALUES (?, ?, ?, ?)';
    const params = [nome, email, cargo, senha];
    
    database.query(sql, params, (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Erro ao cadastrar funcionário' });
        } else {
            res.status(200).json({ message: 'Funcionário cadastrado com sucesso!' });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
