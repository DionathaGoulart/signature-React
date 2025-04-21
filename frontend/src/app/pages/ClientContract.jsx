import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import { Check, Download, RefreshCw, Loader, AlertTriangle } from 'lucide-react';
import { useContracts } from '@lib';
import { useContractForm } from '@lib/hooks/useContractForm';
import { useSignatureStorage } from '@lib/hooks/useSignatureStorage';
import { fillTemplate } from '@lib/utils/fillTemplate';
import { generatePdfBase64 } from '@lib/services/pdfService';
import { sendContractEmail } from '@lib/services/emailService';
import { Container, Card, Button, Input } from '@lib';

export default function ClientContract() {
  const { id } = useParams();
  const { find } = useContracts();
  const contract = find(id) || null;
  const { values, error, handleChange, validate } =
    useContractForm(contract?.fields || []);
  const { save: saveSignature } = useSignatureStorage(id);
  
  const [signatureRef, setSignatureRef] = useState(null);
  const [clientEmail, setClientEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfBase64, setPdfBase64] = useState(null);
  const [navigatingAway, setNavigatingAway] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate(clientEmail, signatureRef)) return;
    
    setIsLoading(true);
    
    try {
      // 1) gera o texto preenchido
      const filled = fillTemplate(contract.template, values);
      
      // 2) gera o PDF em base64
      const generatedPdf = await generatePdfBase64({
        name: contract.name,
        filledText: filled,
        signatureDataUrl: signatureRef.toDataURL(),
      });
      
      // 3) envia por e‑mail
      await sendContractEmail({
        contractId: id,
        contractName: contract.name,
        clientEmail,
        pdfBase64: generatedPdf,
      });
      
      // 4) salva assinatura localmente e marca como enviado
      saveSignature(signatureRef.toDataURL());
      
      // 5) salva o PDF para download posterior
      setPdfBase64(generatedPdf);
      setSubmitted(true);
      
    } catch (error) {
      console.error("Erro ao processar o contrato:", error);
      // Depois colocar uma mensagem para erros
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    if (!pdfBase64) return;
    
    const fileName = `${contract?.name.replace(/\s+/g, '_')}_contrato.pdf`;
    const linkSource = `data:application/pdf;base64,${pdfBase64}`;
    const downloadLink = document.createElement("a");
    
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const handleBack = () => {
    setNavigatingAway(true);
  };

  // Render para contrato não encontrado
  if (!contract) {
    return (
      <Card className="mx-auto mt-16 text-center">
        <AlertTriangle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
        <p>Contrato não encontrado.</p>
        <Button 
          as={Link} 
          to="/" 
          onClick={handleBack}
          disabled={navigatingAway}
        >
          {navigatingAway ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" /> Voltando...
            </>
          ) : (
            'Voltar'
          )}
        </Button>
      </Card>
    );
  }

  // Render para contrato tudo ok
  if (submitted) {
    return (
        <Card className="max-w-md w-full mx-auto text-center p-6 shadow-md">
          <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Contrato Assinado com Sucesso!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Uma cópia do contrato foi enviada para o seu e-mail e para o administrador.
          </p>
          
          <Button 
            onClick={handleDownloadPdf}
            disabled={!pdfBase64}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg w-full md:w-auto flex items-center justify-center gap-2"
          >
            <Download className="h-5 w-5" /> Baixar PDF
          </Button>
        </Card>
    );
  }

  // Render do form principal
  return (
    <Container className="py-16">
      <Card className="max-w-lg mx-auto space-y-6">
        <h1 className="text-xl font-bold">{contract.name}</h1>
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {contract.fields.map(f => (
            <Input
              key={f}
              label={f}
              value={values[f]}
              onChange={e => handleChange(f, e.target.value)}
              required
              disabled={isLoading}
            />
          ))}
          <Input
            label="E‑mail do Cliente"
            type="email"
            value={clientEmail}
            onChange={e => setClientEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <div>
            <p className="mb-1 font-medium">Assinatura:</p>
            <div className={`relative ${isLoading ? 'pointer-events-none' : ''}`}>
              <SignatureCanvas
                ref={ref => setSignatureRef(ref)}
                penColor="black"
                canvasProps={{ 
                  className: `w-full h-48 border ${isLoading ? 'opacity-50' : ''}` 
                }}
              />
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-30">
                  <Loader className="h-8 w-8 animate-spin text-gray-500" />
                </div>
              )}
            </div>
            <Button
              type="button"
              variant="secondary"
              onClick={() => signatureRef?.clear()}
              className="mt-2"
              disabled={isLoading}
            >
              <RefreshCw className="mr-1" /> Limpar
            </Button>
          </div>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" /> Processando...
              </>
            ) : (
              <>
                <Check className="mr-2" /> Assinar e Enviar
              </>
            )}
          </Button>
          <Button 
            as={Link} 
            to="/" 
            variant="secondary"
            onClick={handleBack}
            disabled={isLoading || navigatingAway}
            className="w-full"
          >
            {navigatingAway ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" /> Voltando...
              </>
            ) : (
              'Cancelar'
            )}
          </Button>
        </form>
      </Card>
    </Container>
  );
}