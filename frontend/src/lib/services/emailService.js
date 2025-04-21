const API_URL = import.meta.env.VITE_API_URL;
const ADMIN_EMAIL = import.meta.env.VITE_EMAIL_FROM;

export async function sendContractEmail({
  contractId,
  contractName,
  clientEmail,
  pdfBase64
}) {
  const payload = {
    contractId,
    contractName,
    clientEmail,
    adminEmail: ADMIN_EMAIL,
    pdfBase64
  };

  const res = await fetch(`${API_URL}/api/send-contract`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || 'Falha ao enviar e‑mail');
  }
}
