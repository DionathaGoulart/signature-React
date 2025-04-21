import { useState } from 'react';

export function useContractForm(fields) {
  const [values, setValues] = useState(
    () => Object.fromEntries(fields.map(f => [f, '']))
  );
  const [error, setError] = useState('');

  function handleChange(field, val) {
    setValues(prev => ({ ...prev, [field]: val }));
  }

  function validate(clientEmail, signatureRef) {
    const missing = fields.filter(f => !values[f].trim());
    if (missing.length) {
      setError(`Preencha: ${missing.join(', ')}`);
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(clientEmail)) {
      setError('E‑mail inválido');
      return false;
    }
    if (signatureRef && signatureRef.isEmpty()) {
      setError('Assine o contrato');
      return false;
    }
    setError('');
    return true;
  }

  return { values, error, handleChange, validate };
}
