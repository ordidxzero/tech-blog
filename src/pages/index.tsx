import React from 'react';
import Footer from '../components/core/footer';
import Layout from '../components/core/layout';
import SEO from '../components/core/seo';
import Cytoscape from '../components/main/cytoscape';
import Filter from '../components/main/filter';
import PostList from '../components/main/PostList';
import useClientWidth from '../hooks/useClientWidth';
import { useContextState } from '../lib/context';

const IndexPage: React.FC = () => {
  const isMobileClient = useClientWidth();
  const [isList] = useContextState('isList');
  return (
    <>
      <Layout>
        <SEO title="Home" />
        {!isMobileClient && !isList ? (
          <>
            <div className="h-screen-26 flex py-5 flex-col lg:flex-row justify-between items-center">
              <Filter />
              <Cytoscape className="index-box" />
            </div>
            <Footer />
          </>
        ) : (
          <>
            <PostList />
            <Footer />
          </>
        )}
      </Layout>
    </>
  );
};

export default React.memo(IndexPage);
