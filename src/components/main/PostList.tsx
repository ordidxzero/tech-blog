import React from 'react';
import useMarkdownData from '../../hooks/useMarkdownData';
import PostBlock from './PostBlock';

const PostList = () => {
  const { nodes } = useMarkdownData();
  return (
    <div className="post-container w-full h-full lg:max-w-3xl mx-auto mt-5">
      {nodes.map(node => {
        const {
          frontmatter: { path },
        } = node;
        return <PostBlock key={path} node={node} />;
      })}
    </div>
  );
};

export default PostList;
