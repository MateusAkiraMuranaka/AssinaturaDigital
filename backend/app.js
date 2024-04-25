const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database'); // Importa o módulo database.js
const processarDespesaRouter = require('./processar_despesa'); // Importe a rota processar_despesa.js
const path = require('path');

const app = express();
const port = 3000;

// Servindo os arquivos estáticos da pasta 'frontend'
app.use(express.static(path.join(__dirname, 'frontend')));

app.use(bodyParser.urlencoded({ extended: true }));

// Use a rota processar_despesaRouter para processar as requisições relacionadas ao cadastro de despesas
app.use('/', processarDespesaRouter);

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

app.get('/despesas-pendentes', (req, res) => {

    const relatoriosPendentes = []; // Suponha que você tenha obtido os relatórios pendentes do banco de dados
    res.render('listar_despesas_pendentes', { relatorios: relatoriosPendentes });
});

app.post('/validar-despesa/:id', (req, res) => {
    const id = req.params.id;

    // Atualize o status do relatório de despesa com o ID fornecido para 'aprovado' no banco de dados
    const sql = 'UPDATE RelatoriosDespesas SET status = ? WHERE id = ?';
    const params = ['aprovado', id];

    database.query(sql, params, (error, results) => {
        if (error) {
            console.error('Erro ao validar relatório de despesa:', error);
            res.status(500).send('Erro ao validar relatório de despesa');
        } else {
            console.log('Relatório de despesa validado com sucesso!', results);
            res.status(200).send('Relatório de despesa validado com sucesso!');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
