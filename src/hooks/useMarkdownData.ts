import { graphql, useStaticQuery } from 'gatsby';
import { Query } from '../@types/graphql-types';

function useMarkdownData() {
  const { allMarkdownRemark } = useStaticQuery<Query>(graphql`
    query {
      allMarkdownRemark {
        nodes {
          html
          frontmatter {
            tag
            title
            description
            path
            prevStep
            tag
            category
          }
        }
      }
    }
  `);
  return allMarkdownRemark;
}

export default useMarkdownData;