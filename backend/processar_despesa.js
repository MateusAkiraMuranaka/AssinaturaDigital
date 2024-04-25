const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const database = require('./database'); // Importe o módulo database.js para interagir com o banco de dados
const enviarEmail = require('./enviar_email'); // Importe a função enviarEmail

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Pasta onde os arquivos serão salvos
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo (timestamp + extensão)
    }
});

const upload = multer({ storage: storage });

// Rota para processar o cadastro do relatório de despesa
router.post('/despesas', upload.single('arquivo'), (req, res) => {
    const { data, descricao, valor } = req.body;
    const arquivoPath = req.file.path; // Caminho do arquivo PDF no servidor

    // Aqui você pode realizar a inserção dos dados do relatório de despesa no banco de dados
    // Exemplo de inserção de dados fictícios:
    const sql = 'INSERT INTO RelatoriosDespesas (data, descricao, valor, arquivo_pdf) VALUES (?, ?, ?, ?)';
    const params = [data, descricao, valor, arquivoPath];

    database.query(sql, params, (error, results) => {
        if (error) {
            console.error('Erro ao cadastrar relatório de despesa:', error);
            res.status(500).json({ message: 'Erro ao cadastrar relatório de despesa' });
        } else {
            console.log('Relatório de despesa cadastrado com sucesso!', results);

            // Após cadastrar a despesa com sucesso, envie um e-mail de notificação ao gerente
            const destinatario = 'akira.two.tiflux@gmail.com'; // Insira o e-mail do gerente aqui
            const assunto = 'Novo Relatório de Despesa Cadastrado';
            const corpo = 'Um novo relatório de despesa foi cadastrado. Por favor, revise-o o mais rápido possível.';

            enviarEmail(destinatario, assunto, corpo);

            res.status(200).json({ message: 'Relatório de despesa cadastrado com sucesso!' });
        }
    });
});

module.exports = router;
