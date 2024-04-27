const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const openpgp = require('openpgp');

const app = express();
const port = 3000;

// Middleware para parsear o corpo das requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para a página de logina
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'login.html'));
});

// Rota para autenticar o usuário
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'usuario' && password === 'senha') {
        res.status(200).json({ message: 'Login bem-sucedido' });
    } else {
        res.status(401).json({ message: 'Usuário ou senha incorretos' });
    }
});

app.get('/relatorios-assinados', (req, res) => {
    const sql = `SELECT RelatoriosDespesas.id, RelatoriosDespesas.data, Funcionarios.nome AS nomeGerente, AssinaturasDigitais.data AS dataAssinatura
                 FROM RelatoriosDespesas
                 INNER JOIN AssinaturasDigitais ON RelatoriosDespesas.id = AssinaturasDigitais.relatorio_id
                 INNER JOIN Funcionarios ON AssinaturasDigitais.gerente_id = Funcionarios.id`;

    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Erro ao buscar relatórios assinados:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        } else {
            res.status(200).json({ relatorios: results });
        }
    });
});

// Função para assinar digitalmente um relatório
async function assinarRelatorio(conteudoRelatorio, chavePrivada) {
    const options = {
        message: await openpgp.createMessage({ text: conteudoRelatorio }),
        privateKeys: [chavePrivada],
    };

    const assinatura = await openpgp.sign(options);
    return assinatura;
}

// Rota para assinar digitalmente um relatório
app.post('/assinar-digitalmente', async (req, res) => {
    const { nome, documento, assinatura } = req.body;
    try {
        const assinatura = await assinarRelatorio(conteudoRelatorio, chavePrivada);
        res.status(200).json({ message: 'Assinatura digital realizada com sucesso', assinatura });
    } catch (error) {
        console.error('Erro ao assinar digitalmente:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
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


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});