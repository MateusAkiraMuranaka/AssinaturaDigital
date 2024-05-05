// Importar a biblioteca Nodemailer
const nodemailer = require('nodemailer');

// Configurações para o transporte de e-mail usando o Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'akira.solem.dev@gmail.com',
        pass: 'Suporte@123'
    }
});

// Função para enviar e-mail de notificação ao funcionário
async function enviarEmailNotificacao(emailFuncionario, nomeFuncionario) {
    try {
        // Opções de envio de e-mail
        const mailOptions = {
            from: 'akira.solem.dev@gmail.com',
            to: emailFuncionario,
            subject: 'Seu relatório de despesa foi aprovado e assinado!',
            text: `Olá ${nomeFuncionario},\n\nSeu relatório de despesa foi aprovado e assinado pelo gerente. Parabéns!\n\nAtenciosamente,\nSua Empresa`
        };

        // Enviar o e-mail
        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail de notificação enviado:', info.messageId);
    } catch (error) {
        console.error('Erro ao enviar e-mail de notificação:', error);
    }
}

// Exportar a função para uso em outros arquivos
module.exports = enviarEmailNotificacao;
