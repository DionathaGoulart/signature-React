const transporter = require('../config/email');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

// Função para carregar o template de email
const loadEmailTemplate = () => {
  const templatePath = path.join(__dirname, '../templates/email-template.html');
  const source = fs.readFileSync(templatePath, 'utf-8');
  return handlebars.compile(source);
};

const sendContractEmail = async (clientEmail, adminEmail, pdfBase64) => {
  try {
    // Carrega e compila o template
    const template = loadEmailTemplate();

    // Prepara os dados para o template
    const templateData = {
      clientEmail: clientEmail,
      currentDate: new Date().toLocaleDateString('pt-BR'),
      currentYear: new Date().getFullYear()
    };

    // Renderiza o HTML com os dados
    const htmlContent = template(templateData);

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: [clientEmail, adminEmail],
      subject: 'Contrato Assinado com Sucesso',
      text: 'Seu contrato assinado está em anexo.',
      html: htmlContent,
      attachments: [
        {
          filename: 'contrato_assinado.pdf',
          content: pdfBase64,
          encoding: 'base64',
        },
      ],
    };

    return transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw error;
  }
};

module.exports = {
  sendContractEmail
};