// import React, { memo } from "react";
// import Button from "./Button"; // Assuming you have a Button component for actions

// const DUMap = memo(({ duMap }) => {
//   const { name, duNumber, model, fileName } = duMap; // Destructure the DU Map properties
//   console.log("DUMap RE RENDERS");

//   return (
//     <div className="du-map-row hover:shadow-md flex flex-row justify-start items-center bg-gray-100 p-4 border-b border-gray-300">
//       <div className="left-side flex flex-row items-center gap-4" style={{ width: "25%" }}>
//         <img src="/userIcon.png" alt="DU Map Icon" className="w-10 h-10" /> {/* Adjust icon as needed */}
//         <span className="font-serif font-bold">{name}</span>
//       </div>
//       <div className="middle-side flex flex-row gap-32 justify-start" style={{ width: "35%" }}>
//         <span className="font-bold mr-8 ml-32">{duNumber}</span>
//         <span className="font-bold ml-60">{model}</span>
//       </div>
     
//     </div>
//   );
// });

// export default React.memo(DUMap);


import React, { memo } from "react";
import Button from "./Button"; 

const DUInfo = memo(({ duMap }) => {
  const { name, duNumber, model, fileName } = duMap; 

  return (
    <div className="du-map-row grid grid-cols-4 gap-4 items-center bg-gray-100 p-4 border-b border-gray-300 hover:shadow-md">
      <div className="flex items-center gap-4">
        <img src="/userIcon.png" alt="User Icon" className="w-10 h-10" /> 
        <span className="font-bold">{name}</span>
      </div>
      <div className="font-bold">{duNumber}</div>
      <div className="font-bold">{model}</div>
      <div className="flex items-center gap-2">
        <img src="/fileIcon.png" alt="File Icon" className="w-6 h-6" /> 
        <span className="font-bold">{fileName}</span>
      </div>
    </div>
  );
});

export default React.memo(DUInfo);
