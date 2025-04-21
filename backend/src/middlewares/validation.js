const validateContractEmail = (req, res, next) => {
  const { pdfBase64, clientEmail, adminEmail } = req.body;

  if (!pdfBase64 || !clientEmail || !adminEmail) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
  }

  next();
};

module.exports = {
  validateContractEmail
};