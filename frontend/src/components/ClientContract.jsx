import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import SignatureCanvas from 'react-signature-canvas';
import { FileText, Check, Download, RefreshCw } from 'lucide-react';

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

    if (!shouldSend) {
      doc.save(`contrato_${contract.name.replace(/\s+/g, '_')}.pdf`);
    }
  };

  const sendPDFByEmail = async (pdfBase64) => {
    const apiUrl = process.env.REACT_APP_API_URL;
  
    try {
      const response = await fetch(`${apiUrl}/send-contract`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfBase64,
          clientEmail,
          adminEmail: 'dionatha.work@gmail.com'
        })
      });
  
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Erro desconhecido ao enviar e-mail.');
      }
    } catch (err) {
      console.error('Erro ao enviar e-mail:', err);
      setError('Falha ao enviar o contrato por e-mail. Tente novamente mais tarde.');
      setIsSubmitted(false);
    }
  };
  

  if (error && !contract) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
          <div className="bg-red-100 text-red-700 p-4 rounded mb-6 font-medium">{error}</div>
          <Link to="/" className="text-indigo-600 hover:text-indigo-700 font-medium">Voltar para Home</Link>
        </div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <RefreshCw className="h-10 w-10 text-indigo-600 animate-spin mb-4" />
          <span className="text-lg text-gray-700">Carregando...</span>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-md border border-green-200">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-100 rounded-full p-3">
              <Check className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Contrato Assinado com Sucesso!</h2>
          <p className="text-center text-gray-500 mb-8">Uma cópia do contrato foi enviada para o seu e-mail e para o administrador.</p>
          <div className="flex justify-center">
            <button 
              onClick={() => generatePDF(false)} 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
            >
              <Download className="mr-2 h-5 w-5" />
              Baixar PDF
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">{contract.name}</h1>
            <p className="text-gray-500">Preencha os dados e assine o documento</p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 font-medium">
              {error}
            </div>
          )}

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
            <div className="flex items-center text-xl text-indigo-600 mb-4">
              <FileText className="h-6 w-6 mr-2" />
              <h3 className="font-semibold">Visualização do Contrato:</h3>
            </div>
            <div className="whitespace-pre-wrap leading-relaxed text-gray-700">
              {getFilledContractText().split('\n').map((line, i) => (
                <p key={i} className="mb-2">{line}</p>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <h3 className="text-xl font-semibold text-indigo-600 mb-6">Preencha os campos necessários:</h3>

            {contract.fields.map((field) => (
              <div key={field} className="mb-5">
                <label htmlFor={field} className="block font-medium text-gray-700 mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                <input
                  type="text"
                  id={field}
                  value={formValues[field] || ''}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                  required
                />
              </div>
            ))}

            <div className="mb-6">
              <label htmlFor="clientEmail" className="block font-medium text-gray-700 mb-1">Email do Cliente:</label>
              <input
                type="email"
                id="clientEmail"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                required
              />
            </div>

            <div className="my-8">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">Assinatura:</h3>
              <div className="border-2 border-gray-300 rounded-lg bg-white mb-4">
                <SignatureCanvas
                  ref={(ref) => setSignatureRef(ref)}
                  penColor="black"
                  canvasProps={{ className: 'w-full', height: 200 }}
                />
              </div>
              <button 
                type="button" 
                onClick={clearSignature} 
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-300"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Limpar Assinatura
              </button>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-8">
              <p className="text-sm text-indigo-700">
                Ao clicar em "Assinar Contrato", você concorda com os termos descritos acima e sua assinatura será considerada legalmente válida.
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <button 
                type="submit" 
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:shadow-lg"
              >
                <Check className="mr-2 h-5 w-5" />
                Assinar e Gerar PDF
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-24">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 Sistema de Assinatura de Contratos. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Termos
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Contato
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ClientContract;