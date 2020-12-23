import { graphql, useStaticQuery } from 'gatsby';
import { Query } from '../@types/graphql-types';

const useSiteMetaData = () => {
  const {
    site: { siteMetadata },
  } = useStaticQuery<Query>(graphql`
    query {
      site {
        siteMetadata {
          title
          author
          version
          social {
            github
          }
        }
      }
    }
  `);
  return siteMetadata;
};

export default useSiteMetaData;
