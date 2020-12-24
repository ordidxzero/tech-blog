import React, { useState } from 'react';
import Cytoscape from '../main/cytoscape';

function CytoscapeNavigator() {
  const [state, setState] = useState<boolean | null>(false);
  return (
    <>
      <div
        className={`fixed z-10 bottom-10 right-10 bg-white custom-shadow rounded-lg p-2 origin-bottom-right overflow-hidden ${
          state === null ? '' : state ? 'activate-navigator' : 'deactivate-navigator'
        }`}
      >
        <Cytoscape className="rounded-lg" />
      </div>
      <div
        className={`fixed z-50 justify-center items-center bottom-4 right-4 w-14 h-14 rounded-full custom-shadow cursor-pointer hidden 2xl:flex duration-150 ${
          state ? 'bg-red-500' : 'bg-green-500'
        }`}
        onClick={() => setState(state === null ? true : !state)}
      >
        N
      </div>
    </>
  );
}

export default React.memo(CytoscapeNavigator);
