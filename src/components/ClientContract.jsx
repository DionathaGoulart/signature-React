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

  useEffect(() => {
    // Buscar o contrato do localStorage
    const contracts = JSON.parse(localStorage.getItem('contracts') || '[]');
    const foundContract = contracts.find(c => c.id === id);
    
    if (foundContract) {
      setContract(foundContract);
      // Inicializar os valores do formulário com base nos campos do contrato
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
    // Verificar se todos os campos estão preenchidos
    const emptyFields = Object.entries(formValues)
      .filter(([_, value]) => !value.trim())
      .map(([field]) => field);
    
    if (emptyFields.length > 0) {
      setError(`Por favor, preencha os seguintes campos: ${emptyFields.join(', ')}`);
      return false;
    }
    
    // Verificar se há uma assinatura
    if (signatureRef && signatureRef.isEmpty()) {
      setError('Por favor, assine o contrato.');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Gerar o PDF
    generatePDF();
    
    // Marcar como enviado
    setIsSubmitted(true);
    
    // Salvar a assinatura (em um aplicativo real, isso seria enviado ao servidor)
    if (signatureRef) {
      const signatureDataURL = signatureRef.toDataURL();
      localStorage.setItem(`signature_${id}`, signatureDataURL);
    }
    
    // Simular o envio de e-mails
    setTimeout(() => {
      alert('Contrato assinado com sucesso! E-mails enviados para você e para o administrador.');
    }, 1500);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Adicionar título
    doc.setFontSize(18);
    doc.text(contract.name, 105, 20, { align: 'center' });
    
    // Adicionar conteúdo do contrato
    doc.setFontSize(12);
    const contractText = getFilledContractText();
    
    // Quebrar o texto em linhas para caber na página
    const splitText = doc.splitTextToSize(contractText, 180);
    doc.text(splitText, 15, 40);
    
    // Adicionar assinatura
    if (signatureRef) {
      const signatureDataURL = signatureRef.toDataURL();
      doc.addImage(signatureDataURL, 'PNG', 15, 220, 70, 30);
      doc.text('Assinatura do Cliente', 15, 260);
    }
    
    // Adicionar data
    const currentDate = new Date().toLocaleDateString();
    doc.text(`Data: ${currentDate}`, 150, 260);
    
    // Salvar o PDF
    doc.save(`contrato_${contract.name.replace(/\s+/g, '_')}.pdf`);
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
        <p>Você também pode baixar o PDF novamente clicando no botão abaixo:</p>
        <button onClick={generatePDF} className="download-button">Baixar PDF</button>
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
        
        <div className="signature-section">
          <h3>Assinatura:</h3>
          <div className="signature-container">
            <SignatureCanvas
              ref={(ref) => setSignatureRef(ref)}
              penColor="black"
              canvasProps={{
                className: 'signature-canvas',
                width: 500,
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