const express = require('express');
const router = express.Router();
const database = require('./database'); // Importe o módulo de conexão com o banco de dados

// Rota para validar um relatório de despesa
router.post('/validar-relatorio', (req, res) => {
    const { id } = req.body;

    // Atualize o status do relatório no banco de dados para 'aprovado' ou 'rejeitado'
    const sql = 'UPDATE RelatoriosDespesas SET status = ? WHERE id = ?';
    //  armazenar o status do relatório
    const novoStatus = req.body.aprovado ? 'aprovado' : 'rejeitado';

    database.query(sql, [novoStatus, id], (error, results) => {
        if (error) {
            console.error('Erro ao validar relatório:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        } else {
            res.status(200).json({ message: 'Relatório validado com sucesso'});
            console.log('Relatório validado!', results);
        }
    });
});

module.exports = router;