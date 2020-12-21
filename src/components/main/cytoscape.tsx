import React from 'react';
import useCytoscape from '../../hooks/useCytoscape';

const Cytoscape: React.FC = () => {
  const cytoscapeRef = useCytoscape();
  return <div className="index-box w-full lg:h-full flex-1 overflow-hidden" ref={cytoscapeRef}></div>;
};

export default React.memo(Cytoscape);
