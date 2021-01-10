import React from 'react';

const DeleteIcon = (props: React.DOMAttributes<HTMLDivElement>) => {
  return (
    <div className="w-4 h-4 cursor-pointer" {...props}>
      <img src="https://www.flaticon.com/svg/static/icons/svg/1828/1828843.svg" />
    </div>
  );
};

export default React.memo(DeleteIcon);
