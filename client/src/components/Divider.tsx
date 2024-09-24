import React from 'react';

type DividerProps = {
  width?: string;
};
const Divider = ({ width = 'w-64' }: DividerProps) => {
  return (
    <div className={`w-full mb-4`}>
      <div
        className={`h-1 mx-auto bg-blue-800 ${width} opacity-25 my-0 py-0 rounded-t mb-10`}
      ></div>
    </div>
  );
};

export default Divider;
