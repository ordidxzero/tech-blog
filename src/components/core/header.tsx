import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { useContextState } from '../../lib/context';
import ToggleSwitch from '../state/ToggleSwitch';
import DarkIcon from '../svg/darkIcon';
import GraphIcon from '../svg/graphIcon';
import LightIcon from '../svg/lightIcon';
import ListIcon from '../svg/listIcon';

type HeaderProps = {
  siteTitle?: string;
};

// meta data로 바꿀 것
const AVATAR_URL = 'https://avatars1.githubusercontent.com/u/60772480?s=460&u=c58661ff3f4a27d91ddfd02a2e9607ce37196598&v=4';

const Header = ({ siteTitle = '' }: HeaderProps) => {
  const pathname = typeof window !== 'undefined' && window.location.pathname === '/';
  const [isHome, setIsHome] = useState(pathname);
  const [isMobileClient] = useContextState('isMobileClient');
  const [isDarkMode, setIsDarkMode] = useContextState('isDarkMode');
  const [isList, setIsList] = useContextState('isList');
  useEffect(() => {
    setIsHome(pathname);
  }, [pathname]);
  return (
    <>
      <header className="h-16 fixed z-50 top-0 left-0 right-0 bg-gray-750 flex justify-center">
        <div className="base-container flex justify-between items-center">
          <h1 className="m-0 text-3xl">
            <Link to="/" className="text-white no-underline">
              {siteTitle}
            </Link>
          </h1>
          <div className="flex items-center">
            {!isMobileClient && isHome && (
              <ToggleSwitch state={isList as boolean} setter={setIsList} onIcon={<ListIcon />} offIcon={<GraphIcon />} />
            )}
            {/* <ToggleSwitch state={isDarkMode as boolean} setter={setIsDarkMode} onIcon={<DarkIcon />} offIcon={<LightIcon />} /> */}
            <div className="w-9 h-9 rounded-full flex justify-center items-center overflow-hidden cursor-pointer">
              <img src={AVATAR_URL} alt="avatar" className="m-0" />
            </div>
          </div>
        </div>
      </header>
      <div className="h-16"></div>
    </>
  );
};

export default React.memo(Header);
