import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/core/layout';
import SEO from '../components/core/seo';

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <p>sad</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default SecondPage;
