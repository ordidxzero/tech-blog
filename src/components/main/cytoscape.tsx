import React from 'react';
import useCytoscape from '../../hooks/useCytoscape';

type CytoscapeProps = {
  className?: string;
};

const Cytoscape: React.FC<CytoscapeProps> = ({ className }) => {
  const cytoscapeRef = useCytoscape();
  return <div className={`${className} w-full lg:h-full flex-1 overflow-hidden`} ref={cytoscapeRef}></div>;
};

export default React.memo(Cytoscape);
