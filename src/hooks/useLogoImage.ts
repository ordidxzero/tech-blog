import { graphql, useStaticQuery } from 'gatsby';
import { Query } from '../@types/graphql-types';

const formattedNameList = [
  'HTML5',
  'CSS3',
  'Javascript',
  'Typescript',
  'NodeJS',
  'ReactJS',
  'GraphQL',
  'MongoDB',
  'Python',
  'django',
  'Go',
  'NestJS',
  'Numpy',
  'TensorFlow',
  'AI',
];

const useLogoImage = () => {
  const data = useStaticQuery<Query>(graphql`
    query {
      allFile(filter: { relativeDirectory: { eq: "logos" } }) {
        nodes {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_noBase64
              originalName
            }
          }
        }
      }
      allMarkdownRemark {
        nodes {
          frontmatter {
            tag
          }
        }
      }
    }
  `);
  if (!data?.allFile) {
    return [];
  }
  const validTags = data.allMarkdownRemark.nodes
    .map(node => node.frontmatter.tag)
    .reduce((a, b) => a.concat(b), [])
    .map(item => item.toLowerCase());

  const errorLogo = data.allFile.nodes.find(({ childImageSharp: { fluid } }) => {
    const { originalName } = fluid;
    const name = originalName.split('_')[0];
    return name === 'error';
  });

  const logos = validTags
    .map(tag => {
      const logo = data.allFile.nodes.find(({ childImageSharp: { fluid } }) => {
        const { originalName } = fluid;
        const name = originalName.split('_')[0];
        return name === tag;
      });
      if (!logo) return { fluid: errorLogo.childImageSharp.fluid, name: tag, isError: true };
      return { fluid: logo.childImageSharp.fluid, name: tag };
    })
    .map(logo => {
      const formattedName = formattedNameList.find(item => item.toLowerCase() === logo.name);
      if (formattedName) return { ...logo, name: formattedName };
      return logo;
    })
    .sort((a, b) => {
      if (a.isError && b.isError) return 0;
      if (a.isError && !b.isError) return 1;
      if (!a.isError && b.isError) return -1;
      if (!a.isError && !b.isError) return 0;
    });
  return logos;
};

export default useLogoImage;
