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
          description
          introduction
          author
          version
          avatar
          social {
            github
          }
          comment {
            utterances
          }
        }
      }
    }
  `);
  return siteMetadata;
};

export default useSiteMetaData;
