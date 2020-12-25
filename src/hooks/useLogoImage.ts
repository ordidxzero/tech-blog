import { graphql, useStaticQuery } from 'gatsby';
import { Query } from '../@types/graphql-types';
import { formattedNameList } from '../lib/cytoscapeExtraData';
import { filterOverlap, findLogoByName, flattenArray } from '../lib/tagDataUtils';

const useLogoImage = () => {
  const data = useStaticQuery<Query>(graphql`
    query {
      allFile(filter: { relativeDirectory: { eq: "logos" } }) {
        nodes {
          childImageSharp {
            fluid(maxWidth: 50) {
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

  const {
    allMarkdownRemark: { nodes: markdowns },
    allFile: { nodes: files },
  } = data;

  const flattenTags = flattenArray(markdowns.map(({ frontmatter: { tag } }) => tag));

  const validTags = filterOverlap(flattenTags);

  const errorLogo = findLogoByName(files, 'error');

  const logos = validTags
    .map(tag => {
      const logo = findLogoByName(files, tag);
      if (!logo) return { fluid: errorLogo.childImageSharp.fluid, name: tag, isError: true };
      return { fluid: logo.childImageSharp.fluid, name: tag };
    })
    .map(logo => {
      const formattedName = formattedNameList.find(({ alias }) => alias.includes(logo.name));
      if (formattedName) return { ...logo, name: formattedName.name };
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
