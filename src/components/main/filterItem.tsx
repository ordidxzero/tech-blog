import React from 'react';
import { ImageSharpFluid } from '../../@types/graphql-types';
import Img from 'gatsby-image';

type FilterItemProps = {
  title: string;
  fluid: ImageSharpFluid;
  isSelected: boolean | null;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const FilterItem = ({ title, fluid, isSelected, onClick }: FilterItemProps) => {
  const opacity = isSelected === null || isSelected ? 'opacity-100' : 'opacity-40';
  return (
    <div
      onClick={onClick}
      className={`filter-item relative w-16 h-16 rounded-full shadow-lg flex justify-center items-center duration-150 cursor-pointer ${opacity}`}
    >
      <div className="w-12">
        <Img fluid={fluid} />
      </div>
      <div className="absolute h-5 -bottom-6 rounded px-1 bg-gray-200 text-xs text-center duration-150 item-title">{title}</div>
    </div>
  );
};

export default React.memo(FilterItem);
