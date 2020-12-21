import React from 'react';
import Layout from '../components/layout';
import { ITemplateProps } from '../interfaces';

type IPostTemplateProps = ITemplateProps<{
  html: string;
  title: string;
}>;

const PostTemplate: React.FC<IPostTemplateProps> = React.memo(props => {
  return (
    <Layout>
      <code>
        <pre>{JSON.stringify(props, null, 4)}</pre>
      </code>
    </Layout>
  );
});

export default PostTemplate;
