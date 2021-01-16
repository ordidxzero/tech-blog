import React from 'react';
import { MarkdownRemark } from '../../@types/graphql-types';
import useMarkdownData from '../../hooks/useMarkdownData';
import PostBlock from './PostBlock';

const getTime = (birth: any): number => {
  const date = new Date(birth);
  return date.getTime();
};

export const sortByTime = (
  { frontmatter: { birth: firstBirth } }: MarkdownRemark,
  { frontmatter: { birth: secondBirth } }: MarkdownRemark,
) => {
  return getTime(secondBirth) - getTime(firstBirth);
};

const PostList = () => {
  const { nodes } = useMarkdownData();
  return (
    <div className="post-container w-full h-full lg:max-w-3xl mx-auto mt-5">
      {nodes.sort(sortByTime).map(node => {
        const { name } = node.parent as any;
        return <PostBlock key={name} node={node} />;
      })}
    </div>
  );
};

export default PostList;
