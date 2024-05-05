# AssinaturaDigital

Professor: Paulo Manseira
Alunos:
Mateus Akira de O. Muranaka
Vitor Bansen Delfino

Projeto para disciplina de Segurança da Internet na Faculdade

Criando banco de dados com MySQL no MariaDB

create database assDig;

use assDig;

-- Tabela Funcionários
CREATE TABLE Funcionarios (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(255),
email VARCHAR(255),
cargo VARCHAR(100),
senha VARCHAR(255) -- Normalmente a senha seria criptografada, mas isso depende da sua implementação
);

-- Tabela Relatórios de Despesas
CREATE TABLE RelatoriosDespesas (
id INT AUTO_INCREMENT PRIMARY KEY,
funcionario_id INT,
data DATE,
descricao VARCHAR(255),
valor DECIMAL(10, 2),
arquivo_pdf VARCHAR(255),
status ENUM('pendente', 'aprovado', 'rejeitado') DEFAULT 'pendente',
FOREIGN KEY (funcionario_id) REFERENCES Funcionarios(id)
);

-- Tabela Assinaturas Digitais
CREATE TABLE AssinaturasDigitais (
id INT AUTO_INCREMENT PRIMARY KEY,
relatorio_id INT,
gerente_id INT,
data DATE,
assinatura BLOB, -- Aqui você armazenaria a assinatura digital, que normalmente seria um arquivo binário
FOREIGN KEY (relatorio_id) REFERENCES RelatoriosDespesas(id),
FOREIGN KEY (gerente_id) REFERENCES Funcionarios(id)
);
