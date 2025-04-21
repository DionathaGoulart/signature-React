const { sendContractEmail } = require('../services/emailService');

const sendContract = async (req, res, next) => {
  try {
    const { pdfBase64, clientEmail, adminEmail } = req.body;

    await sendContractEmail(clientEmail, adminEmail, pdfBase64);

    res.status(200).json({ message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    next(error);
  }
};

module.exports = {
  sendContract
};