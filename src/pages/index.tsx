import React from 'react';

import Layout from '../components/core/layout';
import SEO from '../components/core/seo';
import Cytoscape from '../components/main/cytoscape';
import Filter from '../components/main/filter';

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <div className="h-screen-16 flex py-5 flex-col lg:flex-row justify-between items-center">
        <Filter />
        <Cytoscape className="index-box" />
      </div>
    </Layout>
  );
};

export default React.memo(IndexPage);
