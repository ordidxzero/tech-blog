import React from 'react';
import Layout from '../components/core/layout';
import { ITemplateProps } from '../interfaces';

type IPostTemplateProps = ITemplateProps<{
  html: string;
  title: string;
}>;

const PostTemplate: React.FC<IPostTemplateProps> = React.memo(props => {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: props.pageContext.html }} />
    </Layout>
  );
});

export default PostTemplate;
