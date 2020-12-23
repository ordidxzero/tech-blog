import React from 'react';
import useLogoImage from '../../hooks/useLogoImage';
import { useContextState } from '../../lib/context';
import DeleteIcon from '../svg/deleteIcon';
import FilterItem from './filterItem';

const categories = ['overview', 'theory', 'project', 'book'];

const Filter: React.FC = () => {
  const logos = useLogoImage();
  const [currentCategory, setCategory] = useContextState('category');
  const [filter, setFilter] = useContextState('filter');
  const isActive = (category: string) => (currentCategory === category ? 'bg-green-400' : null);
  return (
    <div className="index-box h-1/3 w-full mb-5 lg:h-full lg:w-1/4 lg:mb-0 lg:mr-5 lg:min-w-76 flex flex-col justify-start items-center overflow-scroll">
      <div className="w-full">
        <div className="mb-2 text-center">Category</div>
        <ul className="category-grid">
          {categories.map(category => (
            <li key={category} className={`category ${isActive(category)}`} onClick={() => setCategory(category)}>
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full">
        <div className="mb-2 w-full flex justify-start flex-col items-center h-8 relative">
          <span>Filter</span>
          {filter !== null && <DeleteIcon onClick={() => setFilter(null)} />}
        </div>
        <div className="filter-grid">
          {logos.map(({ fluid, name }) => {
            return (
              <FilterItem
                key={name}
                title={name}
                fluid={fluid}
                isSelected={filter === null || filter === name}
                onClick={() => setFilter(name)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Filter);
