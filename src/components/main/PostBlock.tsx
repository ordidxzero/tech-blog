import { Link } from 'gatsby';
import React from 'react';
import { MarkdownRemark } from '../../@types/graphql-types';

type PostBlockProps = {
  node: MarkdownRemark;
};

const PostBlock: React.FC<PostBlockProps> = ({
  node: {
    excerpt,
    frontmatter: { title, tag, path },
  },
}) => {
  return (
    <Link to={path} className="post-block">
      <div className="p-4 hover:bg-gray-200 dark:hover:bg-warmGray-900 dark:text-warmGray-300 duration-150 cursor-pointer rounded-lg">
        <div className="font-bold text-xl mb-3">{title}</div>
        <p className="mb-3">{excerpt}</p>
        <div className="text-xs">
          {tag &&
            tag.map((item, index) => (
              <span key={item} className="tag uppercase font-bold bg-blue-200 dark:bg-warmGray-700 py-1 px-2 rounded-2xl mr-2">
                {item}
              </span>
            ))}
        </div>
      </div>
    </Link>
  );
};

export default PostBlock;
