const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database'); // Importa o módulo database.js
const processarDespesaRouter = require('./processar_despesa'); // Importe a rota processar_despesa.js
const validarRelatorioRouter = require('./validar_relatorio'); // Importe a rota validar_relatorio.js
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

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Buscar o usuário com base no nome dele
    const sql = 'SELECT * FROM Funcionarios WHERE username = ?';
    connection.query(sql, [username], (error, results) => {
        if (error) {
            console.error('Erro ao buscar usuário:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        } else {
            // Verifica se o usuário foi encontrado no banco de dados
            if (results.length === 1) {
                const user = results[0];
                // Compara a senha fornecida com a senha armazenada no banco de dados
                if (password === user.senha) {
                    // Se as credenciais estiverem corretas, retorna o tipo de usuário
                    res.status(200).json({ message: 'Login bem-sucedido', cargo: user.cargo });
                } else {
                    res.status(401).json({ message: 'Usuário ou senha incorretos' });
                }
            } else {
                res.status(401).json({ message: 'Usuário não encontrado' });
            }
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

//usar rota de validar relatório
app.use(validarRelatorioRouter);

// Rota para assinar digitalmente um relatório
app.post('/assinar-digitalmente', (req, res) => {
    const { nome, documento, assinatura } = req.body;

    // Salvar os dados na tabela AssinaturasDigitais
    const sql = 'INSERT INTO AssinaturasDigitais (relatorio_id, gerente_id, data, assinatura) VALUES (?, ?, ?, ?)';
    const data = new Date().toISOString().slice(0, 19).replace('T', ' '); // Data atual
    const params = [relatorio_id, gerente_id, data, assinatura];

    connection.query(sql, params, (error, results) => {
        if (error) {
            console.error('Erro ao assinar digitalmente:', error);
            res.status(500).json({ message: 'Erro ao assinar digitalmente' });
        } else {
            res.status(200).json({ message: 'Assinatura digital realizada com sucesso' });
            console.log('Assinado digitalmente!', results);
        }
    });
});

// Função para verificar a assinatura digital de um relatório
async function verificarAssinatura(conteudoRelatorio, assinatura, chavePublica) {
    const options = {
        message: await openpgp.createMessage({ text: conteudoRelatorio }),
        signature: await openpgp.readSignature({ binary: assinatura }),
        verificationKeys: await openpgp.readKey({ binary: chavePublica }),
    };

    const verificado = await openpgp.verify(options);
    return verificado.signatures[0].valid;
}

// Rota para verificar a assinatura digital de um relatório
app.post('/verificar-assinatura', async (req, res) => {
    const { relatorioId } = req.body;
    try {
        // Verifique a assinatura digital
        const valid = await verificarAssinatura(conteudoRelatorio, assinatura, chavePublica);
        if (valid) {
            res.status(200).json({ message: 'Assinatura digital válida' });
        } else {
            res.status(400).json({ message: 'Assinatura digital inválida' });
        }
    } catch (error) {
        console.error('Erro ao verificar assinatura:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

module.exports = app; // Exporta o app Express

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
