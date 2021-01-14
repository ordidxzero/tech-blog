import React from 'react';
import { MarkdownRemark } from '../../@types/graphql-types';
import useMarkdownData from '../../hooks/useMarkdownData';
import PostBlock from './PostBlock';

const getTime = (parent: any): number => {
  // Node에 birthtime이 없어서 불가피하게 parent의 타입을 any로 바꿈
  const { birthtime } = parent;
  const date = new Date(birthtime);
  return date.getTime();
};

const sortByTime = ({ parent: firstParent }: MarkdownRemark, { parent: secondParent }: MarkdownRemark) => {
  return getTime(secondParent) - getTime(firstParent);
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
