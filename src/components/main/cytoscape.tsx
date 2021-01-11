import React from 'react';
import useCytoscape from '../../hooks/useCytoscape';
import { useContextState } from '../../lib/context';

type CytoscapeProps = {
  className?: string;
};

const Cytoscape: React.FC<CytoscapeProps> = ({ className }) => {
  const [isDarkMode] = useContextState('isDarkMode');
  const cytoscapeRef = useCytoscape();
  return (
    <div
      className={`${className} w-full lg:h-full dark:bg-warmGray-700 duration-300 flex-1 overflow-hidden`}
      ref={cytoscapeRef}
    ></div>
  );
};

export default React.memo(Cytoscape);
