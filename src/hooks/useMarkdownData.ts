import { graphql, useStaticQuery } from 'gatsby';
import { Query } from '../@types/graphql-types';

function useMarkdownData() {
  const { allMarkdownRemark } = useStaticQuery<Query>(graphql`
    query {
      allMarkdownRemark {
        nodes {
          html
          parent {
            ... on File {
              name
            }
          }
          frontmatter {
            tag
            title
            birth
            prevStep
            tag
            category
          }
          excerpt(pruneLength: 170, truncate: true)
        }
      }
    }
  `);
  return allMarkdownRemark;
}

export default useMarkdownData;
