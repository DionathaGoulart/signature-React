import { useLocalStorage } from './useLocalStorage';

export function useSignatureStorage(id) {
  const key = `signature_${id}`;
  const [dataUrl, setDataUrl] = useLocalStorage(key, null);
  return {
    dataUrl,
    save:    setDataUrl,
    remove:  () => setDataUrl(null),
  };
}
