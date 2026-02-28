import { useState, useCallback } from 'react';

/**
 * useClipboard Hook
 * 
 * Hook para copiar texto al portapapeles con feedback visual.
 */

export const useClipboard = (timeout = 2000) => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), timeout);
        return true;
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        return false;
      }
    },
    [timeout],
  );

  return { copied, copy };
};

export default useClipboard;
