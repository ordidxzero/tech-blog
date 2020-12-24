import { useEffect, useState } from 'react';

const useScroll = () => {
  const [currentScrollPosition, setPosition] = useState('');
  useEffect(() => {
    document.addEventListener('scroll', () => {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      const current = (scrollTop * 100) / (scrollHeight - clientHeight);
      setPosition(current.toFixed(1) + '%');
    });
    return () => document.removeEventListener('scroll', () => console.log(document.body.scrollHeight, document.body.scrollTop));
  }, []);

  return currentScrollPosition;
};

export default useScroll;
