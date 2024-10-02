// // import React, { memo } from "react";
// // import Button from "./Button"; 

// // const DUInfo = memo(({ duMap, loading, onDelete }) => {
// //   const { name, duNumber, model, displayNumber } = duMap; 

// //   return (
// //     <div className="du-map-row flex flex-row justify-between items-center bg-gray-100 p-4 border-b border-gray-300 hover:shadow-md">
// //       <div className="flex items-center gap-6">
// //         <img src="/userIcon.png" alt="User Icon" className="w-10 h-10" /> 
// //         <span className="font-bold">{name}</span>
// //       </div>
// //       <div className="font-bold">{duNumber}</div>
// //       <div className="font-bold ">{model}</div>
// //       <span className="font-bold ">{displayNumber}</span>
      
// //       <Button
// //         classname="bg-black p-2 text-white rounded"
// //         value={loading ? "DELETING..." : "DELETE"}
// //         onClick={onDelete}  // Corrected the prop here
// //       />
// //     </div>
// //   );
// // });

// // export default React.memo(DUInfo);


// import React, { memo } from "react";
// import Button from "./Button"; 

// const DUInfo = memo(({ duMap, loading, onDelete }) => {
//   const { name, duNumber, model, displayNumber } = duMap; 

//   return (
//     <div className="du-map-row flex flex-row justify-between items-center bg-white p-4 border-b border-gray-300 hover:shadow-md rounded-md transition-shadow duration-300 ease-in-out">
//       <div className="flex items-center gap-4">
//         <img src="/userIcon.png" alt="User Icon" className="w-10 h-10 rounded-full border border-gray-300" /> 
//         <span className="font-bold text-lg">{name}</span>
//       </div>
//       <div className="font-bold text-lg">{duNumber}</div>
//       <div className="font-bold text-lg">{model}</div>
//       <span className="font-bold text-lg">{displayNumber}</span>
      
//       <Button
//         className={`p-2 rounded transition duration-200 ${loading ? "bg-gray-400" : "bg-black hover:bg-gray-700"} text-white`}
//         value={loading ? "DELETING..." : "DELETE"}
//         onClick={onDelete}
//       />
//     </div>
//   );
// });

// export default React.memo(DUInfo);


import React, { memo } from "react";
import Button from "./Button"; 

const DUInfo = memo(({ duMap, loading, onDelete }) => {
  const { name, duNumber, model, displayNumber } = duMap; 

  return (
    
    <div className="du-map-row flex flex-row justify-between items-center bg-gray-100 p-4 border-b border-gray-300 hover:shadow-md pl-10">
      <div className="left-side flex flex-row items-center gap-4" style={{ width: "25%" }}>
        <img src="/userIcon.png" alt="User Icon" className="w-10 h-10 rounded-full border border-gray-300" /> 
        <span className="font-bold truncate" style={{ maxWidth: '200px' }}>{name}</span>
      </div>
      <div className="flex-1 min-w-[150px] text-left overflow-hidden text-ellipsis whitespace-nowrap">
        <span className="font-bold">{duNumber}</span>
      </div>
      <div className="flex-1 min-w-[150px] text-left overflow-hidden text-ellipsis whitespace-nowrap">
        <span className="font-bold">{model}</span>
      </div>
      <div className="flex-1 min-w-[150px] text-left overflow-hidden text-ellipsis whitespace-nowrap">
        <span className="font-bold">{displayNumber}</span>
      </div>
      <Button
        classname="bg-black p-2 text-white rounded"
        value={loading ? "DELETING..." : "DELETE"}
        onClick={onDelete}
      />
    </div>
  );
});

export default React.memo(DUInfo);
