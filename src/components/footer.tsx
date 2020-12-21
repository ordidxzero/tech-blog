import React from 'react';

const Footer = () => (
  <footer className="h-8 bg-gray-200 absolute bottom-0 left-0 right-0">
    <div className="base-container flex justify-center items-center text-sm">
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.com">Gatsby</a>
    </div>
  </footer>
);

export default Footer;
