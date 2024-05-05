const nodemailer = require('nodemailer');

// Configurações de transporte para enviar e-mails usando um serviço SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail', // Por exemplo, 'gmail', 'outlook', etc.
    auth: {
        user: 'akira.solem.dev@gmail.com',
        pass: 'Suporte@123'
    }
});

// Função para enviar e-mail de notificação
function enviarEmail(destinatario, assunto, corpo) {
    const mailOptions = {
        from: 'akira.two.tiflux@gmail.com',
        to: destinatario,
        subject: assunto,
        text: corpo
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar e-mail:', error);
        } else {
            console.log('E-mail enviado com sucesso:', info.response);
        }
    });
}

module.exports = enviarEmail;