import React, { createRef, useLayoutEffect } from 'react';
import useSiteMetaData from '../../hooks/useSiteMetaData';

const Utterances: React.FC = () => {
  const {
    comment: { utterances: repo },
  } = useSiteMetaData();
  const containerRef = createRef<HTMLDivElement>();
  useLayoutEffect(() => {
    const utterances = document.createElement('script');

    const attributes = {
      repo,
      src: 'https://utteranc.es/client.js',
      'issue-term': 'pathname',
      label: 'comment',
      theme: 'github-light',
      crossOrigin: 'anonymous',
      async: 'true',
    };

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    containerRef.current.appendChild(utterances);
  }, [repo]);

  return <div ref={containerRef} />;
};

Utterances.displayName = 'Utterances';

export default React.memo(Utterances);
