import React, { useState } from 'react';
import Cytoscape from '../main/cytoscape';

function CytoscapeNavigator() {
  const [state, setState] = useState<boolean | null>(null);
  return (
    <>
      <div
        className={`fixed z-10 bottom-10 right-10 bg-gray-100 custom-shadow rounded-lg p-2 origin-bottom-right overflow-hidden hidden 2xl:block dark:bg-warmGray-600 ${
          state === null ? '' : state ? 'activate-navigator' : 'deactivate-navigator'
        }`}
      >
        <Cytoscape className="rounded-lg bg-white" />
      </div>
      <div
        className={`fixed hidden z-50 justify-center items-center bottom-4 right-4 w-14 h-14 rounded-full custom-shadow cursor-pointer xl:flex duration-150 ${
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
