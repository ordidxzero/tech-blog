import React, { createRef, useLayoutEffect } from 'react';
import useSiteMetaData from '../../hooks/useSiteMetaData';
import { useContextState } from '../../lib/context';

const Utterances: React.FC = () => {
  const {
    comment: { utterances: repo },
  } = useSiteMetaData();
  const [isDarkMode] = useContextState('isDarkMode');
  const containerRef = createRef<HTMLDivElement>();
  useLayoutEffect(() => {
    const utterances = document.createElement('script');

    const attributes = {
      repo,
      src: 'https://utteranc.es/client.js',
      'issue-term': 'pathname',
      label: 'comment',
      theme: isDarkMode ? 'github-dark' : 'github-light',
      crossOrigin: 'anonymous',
      async: 'true',
    };

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    if (containerRef.current.childNodes.length < 1) {
      containerRef.current.appendChild(utterances);
    } else {
      containerRef.current.replaceChild(utterances, containerRef.current.childNodes[0]);
    }
  }, [repo, isDarkMode]);

  return <div ref={containerRef} />;
};

Utterances.displayName = 'Utterances';

export default React.memo(Utterances);
