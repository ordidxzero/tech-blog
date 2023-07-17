import React from 'react';

const DeleteIcon = (props: React.DOMAttributes<HTMLDivElement>) => {
  return (
    <div className="w-4 h-4 cursor-pointer" {...props}>
      <img src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" />
    </div>
  );
};

export default React.memo(DeleteIcon);
