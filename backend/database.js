const mysql = require('mysql');

// Configuração do banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Muranaka2002',
    database: 'assDig'
});

// Função para executar uma consulta SQL
function query(sql, params, callback) {
    connection.query(sql, params, callback);
}

module.exports = {
    query
};