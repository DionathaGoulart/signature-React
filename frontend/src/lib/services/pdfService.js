import { jsPDF } from 'jspdf';

export function generatePdfBase64({ name, filledText, signatureDataUrl }) {
  const doc = new jsPDF();
  doc.setFontSize(18).text(name, 105, 20, { align: 'center' });
  doc.setFontSize(12);
  doc.text(doc.splitTextToSize(filledText, 180), 15, 40);

  if (signatureDataUrl) {
    doc.addImage(signatureDataUrl, 'PNG', 15, 220, 70, 30);
    doc.text('Assinatura do Cliente', 15, 260);
  }
  doc.text(`Data: ${new Date().toLocaleDateString()}`, 150, 260);

  const dataUri = doc.output('datauristring');
  return dataUri.split(',')[1]; // retorna só base64
}
