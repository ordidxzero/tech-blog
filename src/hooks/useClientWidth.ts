import { useEffect, useRef } from 'react';
import { useContextState } from '../lib/context';

const useClientWidth = () => {
  const debounceId = useRef<number | null>(null);
  const [isMobileClient, setIsMobileClient] = useContextState('isMobileClient');
  useEffect(() => {
    setIsMobileClient(document.body.clientWidth < 768);
    const resizeHandler = () => {
      if (debounceId.current) {
        clearTimeout(debounceId.current);
      }
      debounceId.current = window.setTimeout(() => {
        setIsMobileClient(document.body.clientWidth < 768);
      }, 200);
    };
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return isMobileClient;
};

export default useClientWidth;
