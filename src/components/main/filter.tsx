import React from 'react';
import { useContextState } from '../../lib/context';

const categories = ['overview', 'theory', 'project', 'book'];

const Filter: React.FC = () => {
  const [currentCategory, setCategory] = useContextState('category');
  const isActive = (category: string) => (currentCategory === category ? 'bg-green-400' : null);
  return (
    <div className="index-box h-1/3 w-full mb-5 lg:h-full lg:w-1/4 lg:mb-0 lg:mr-5 lg:min-w-76 flex flex-col justify-start items-center">
      <div className="mb-2">Category</div>
      <ul className="w-full m-0 grid grid-cols-2 place-items-center gap-2 px-2">
        {categories.map(category => (
          <li className={`category ${isActive(category)}`} onClick={() => setCategory(category)}>
            {category}
          </li>
        ))}
      </ul>
      <div>Filter</div>
    </div>
  );
};

export default React.memo(Filter);
