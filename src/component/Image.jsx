import React from 'react';

const SvgImage = ({ src, alt }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <img src="/czar.svg" alt={alt} className="max-w-96 h-96" />
    </div>
  );
};

export default SvgImage;
