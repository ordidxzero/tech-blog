import React from 'react';

const Footer = () => {
  return (
    <>
      <div className="h-10"></div>
      <footer className="h-10 absolute z-50 bottom-0 left-0 right-0 flex flex-col items-center justify-start text-xs">
        <div className="mb-1">&copy; 2020-{new Date().getFullYear()} ordidxzero. All rights reserved.</div>
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
