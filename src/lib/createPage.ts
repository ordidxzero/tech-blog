import { resolve } from 'path';
import { CreatePagesArgs } from 'gatsby';
import { Query } from '../@types/graphql-types';
import { sortByTime } from '../components/main/PostList';

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
            prevStep
            birth
            tag
            category
          }
          parent {
            ... on File {
              name
            }
          }
        }
      }
    }
  `);

  if (errors || !data) {
    throw errors;
  }

  data.allMarkdownRemark.nodes.forEach(({ html, excerpt, frontmatter: { title, birth, tag, prevStep, category }, parent }) => {
    const { name } = parent as any;
    return createPage({
      path: name,
      context: {
        html,
        excerpt,
        title,
        tag,
        prevStep,
        category,
        birthTime: birth,
      },
      component: resolve(__dirname, '../templates/PostTemplate.tsx'),
    });
  });
}
