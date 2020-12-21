import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Home" />
    <div className="h-screen-16 flex py-5 flex-col lg:flex-row justify-between items-center">
      <div className="index-box h-1/3 w-full mb-5 lg:h-full lg:w-1/4 lg:mb-0 lg:mr-5 lg:min-w-76">Filter</div>
      <div className="index-box w-full lg:h-full flex-1">Cytoscape</div>
    </div>
  </Layout>
);

export default IndexPage;
