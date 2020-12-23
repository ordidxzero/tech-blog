import { graphql, useStaticQuery } from 'gatsby';
import { Query } from '../@types/graphql-types';
import { filterItemList } from '../lib/filterFakeData';

const useLogoImage = () => {
  const data = useStaticQuery<Query>(graphql`
    query {
      allImageSharp {
        nodes {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid_noBase64
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
  if (!data?.allImageSharp) {
    return [];
  }
  const lowerItem = filterItemList.map(item => item.toLowerCase());
  const logos = data.allImageSharp.nodes
    .filter(({ parent: { name: noname } }) => {
      const name = (noname as string).split('_')[0];
      return lowerItem.includes(name);
    })
    .map(({ fluid, parent: { name: noname } }) => {
      // name = xx_256x256 형태
      const name = (noname as string).split('_')[0];
      const formattedName = filterItemList.find(item => item.toLowerCase() === name);
      if (formattedName) return { fluid, name: formattedName };
      return { fluid, name };
    });
  return logos;
};

export default useLogoImage;
