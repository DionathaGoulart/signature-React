import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import SignatureCanvas from 'react-signature-canvas';
import './ClientContract.css';

function ClientContract() {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [signatureRef, setSignatureRef] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  useEffect(() => {
    const contracts = JSON.parse(localStorage.getItem('contracts') || '[]');
    const foundContract = contracts.find(c => c.id === id);

    if (foundContract) {
      setContract(foundContract);
      const initialValues = {};
      foundContract.fields.forEach(field => {
        initialValues[field] = '';
      });
      setFormValues(initialValues);
    } else {
      setError('Contrato não encontrado.');
    }
  }, [id]);

  const handleInputChange = (field, value) => {
    setFormValues({
      ...formValues,
      [field]: value
    });
  };

  const getFilledContractText = () => {
    if (!contract) return '';
    let filledText = contract.template;
    Object.entries(formValues).forEach(([field, value]) => {
      filledText = filledText.replace(new RegExp(`{${field}}`, 'g'), value || `{${field}}`);
    });
    return filledText;
  };

  const clearSignature = () => {
    if (signatureRef) {
      signatureRef.clear();
    }
  };

  const validateForm = () => {
    const emptyFields = Object.entries(formValues)
      .filter(([, value]) => !value.trim())
      .map(([field]) => field);

    if (emptyFields.length > 0) {
      setError(`Por favor, preencha os seguintes campos: ${emptyFields.join(', ')}`);
      return false;
    }

    if (!clientEmail.trim() || !/\S+@\S+\.\S+/.test(clientEmail)) {
      setError('Por favor, insira um e-mail válido.');
      return false;
    }

    if (signatureRef && signatureRef.isEmpty()) {
      setError('Por favor, assine o contrato.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    generatePDF(true);
    setIsSubmitted(true);

    if (signatureRef) {
      const signatureDataURL = signatureRef.toDataURL();
      localStorage.setItem(`signature_${id}`, signatureDataURL);
    }
  };

  const generatePDF = async (shouldSend = false) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(contract.name, 105, 20, { align: 'center' });
    doc.setFontSize(12);
    const contractText = getFilledContractText();
    const splitText = doc.splitTextToSize(contractText, 180);
    doc.text(splitText, 15, 40);

    if (signatureRef) {
      const signatureDataURL = signatureRef.toDataURL();
      doc.addImage(signatureDataURL, 'PNG', 15, 220, 70, 30);
      doc.text('Assinatura do Cliente', 15, 260);
    }

    const currentDate = new Date().toLocaleDateString();
    doc.text(`Data: ${currentDate}`, 150, 260);

    if (shouldSend) {
      const pdfBase64 = doc.output('datauristring').split(',')[1];
      await sendPDFByEmail(pdfBase64);
    }

    doc.save(`contrato_${contract.name.replace(/\s+/g, '_')}.pdf`);
  };

  const sendPDFByEmail = async (pdfBase64) => {
    try {
      await fetch('https://seu-backend.com/send-contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfBase64,
          clientEmail,
          adminEmail: 'admin@seudominio.com'
        })
      });
    } catch (err) {
      console.error('Erro ao enviar e-mail:', err);
    }
  };

  if (error && !contract) {
    return <div className="error-message">{error}</div>;
  }

  if (!contract) {
    return <div className="loading">Carregando...</div>;
  }

  if (isSubmitted) {
    return (
      <div className="success-message">
        <h2>Contrato Assinado com Sucesso!</h2>
        <p>Uma cópia do contrato foi enviada para o seu e-mail e para o administrador.</p>
        <button onClick={() => generatePDF(false)} className="download-button">Baixar PDF</button>
      </div>
    );
  }

  return (
    <div className="client-contract">
      <h1>{contract.name}</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="contract-preview">
        <h3>Visualização do Contrato:</h3>
        <div className="preview-content">
          {getFilledContractText().split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="contract-form">
        <h3>Preencha os campos necessários:</h3>

        {contract.fields.map((field) => (
          <div key={field} className="form-field">
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              type="text"
              id={field}
              value={formValues[field] || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              required
            />
          </div>
        ))}

        <div className="form-field">
          <label htmlFor="clientEmail">Email do Cliente:</label>
          <input
            type="email"
            id="clientEmail"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            required
          />
        </div>

        <div className="signature-section">
          <h3>Assinatura:</h3>
          <div className="signature-container">
            <SignatureCanvas
              ref={(ref) => setSignatureRef(ref)}
              penColor="black"
              canvasProps={{
                className: 'signature-canvas',
                width: 900,
                height: 200
              }}
            />
          </div>
          <button type="button" onClick={clearSignature} className="clear-button">
            Limpar Assinatura
          </button>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">Assinar e Gerar PDF</button>
        </div>
      </form>
    </div>
  );
}

export default ClientContract;
