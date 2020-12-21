import { Link } from 'gatsby';
import React from 'react';

type HeaderProps = {
  siteTitle?: string;
};

// meta data로 바꿀 것
const AVATAR_URL = 'https://avatars1.githubusercontent.com/u/60772480?s=460&u=c58661ff3f4a27d91ddfd02a2e9607ce37196598&v=4';

const Header = ({ siteTitle = '' }: HeaderProps) => (
  <>
    <header className="h-16 absolute top-0 left-0 right-0 bg-gray-750 flex justify-center">
      <div className="base-container flex justify-between items-center">
        <h1 className="m-0 text-3xl">
          <Link to="/" className="text-white no-underline">
            {siteTitle}
          </Link>
        </h1>
        <div className="w-9 h-9 rounded-full flex justify-center items-center overflow-hidden">
          <img src={AVATAR_URL} alt="avatar" className="m-0" />
        </div>
      </div>
    </header>
    <div className="h-16"></div>
  </>
);

export default Header;
