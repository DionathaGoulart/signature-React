const transporter = require('../config/email');

const sendContractEmail = async (clientEmail, adminEmail, pdfBase64) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: [clientEmail, adminEmail],
    subject: 'Contrato Assinado com Sucesso',
    text: 'Seu contrato assinado está em anexo.',
    html: `
      <h2>Olá!</h2>
      <p>Segue em anexo o contrato assinado.</p>
      <p><strong>Cliente:</strong> ${clientEmail}</p>
      <p>Se tiver dúvidas, é só responder este e-mail.</p>
      <br/>
      <p>Atenciosamente,<br/>Equipe Contrato Digital</p>
    `,
    attachments: [
      {
        filename: 'contrato_assinado.pdf',
        content: pdfBase64,
        encoding: 'base64',
      },
    ],
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendContractEmail
};