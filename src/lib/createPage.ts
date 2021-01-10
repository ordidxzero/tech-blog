import { resolve } from 'path';
import { CreatePagesArgs } from 'gatsby';
import { Query } from '../@types/graphql-types';

export async function createPages({ actions, graphql }: CreatePagesArgs) {
  const { createPage } = actions;
  const { data, errors } = await graphql<Query>(`
    {
      allMarkdownRemark {
        nodes {
          html
          excerpt(pruneLength: 100, truncate: true)
          frontmatter {
            tag
            title
            path
            prevStep
            tag
            category
          }
          parent {
            ... on File {
              birthTime(formatString: "YYYY-MM-DD")
            }
          }
        }
      }
    }
  `);

  if (errors || !data) {
    throw errors;
  }

  data.allMarkdownRemark.nodes.forEach(({ html, excerpt, frontmatter: { title, path, tag, prevStep, category }, parent }) => {
    const { birthTime } = parent as any;
    return createPage({
      path,
      context: {
        html,
        excerpt,
        title,
        tag,
        prevStep,
        category,
        birthTime,
      },
      component: resolve(__dirname, '../templates/PostTemplate.tsx'),
    });
  });
}
