import React from 'react';
import useSiteMetaData from '../../hooks/useSiteMetaData';

const Footer = () => {
  const {
    author,
    social: { github },
  } = useSiteMetaData();
  const githubUrl = `https://github.com/${github}`;
  return (
    <>
      <div className="h-10"></div>
      <footer className="h-10 absolute z-50 bottom-0 left-0 right-0 flex flex-col items-center justify-start text-xs dark:text-warmGray-100 duration-300">
        <div className="mb-1">
          <span className="mr-1">&copy; 2020-{new Date().getFullYear()}</span>
          <a className="mr-1" target="_blank" href={githubUrl}>
            {author}
          </a>
          <span>All rights reserved.</span>
        </div>
        <div>
          <span>Icon made by</span>
          <a className="mx-1" href="https://www.flaticon.com/authors/freepik">
            Freepik
          </a>
          <span>from</span>
          <a className="ml-1" href="https://www.flaticon.com">
            www.flaticon.com
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
