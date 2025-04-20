const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post('/send-contract', async (req, res) => {
  const { pdfBase64, clientEmail, adminEmail } = req.body;

  if (!pdfBase64 || !clientEmail || !adminEmail) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    });

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


    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ error: 'Erro ao enviar e-mail.' });
  }
});

const PORT = process.env.PORT || 3001;
app.get('/', (req, res) => {
  res.send('Backend funcionando! 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
