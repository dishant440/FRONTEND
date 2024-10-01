import React, { memo } from "react";
import Button from "./Button";

// const ServiceEngineer = memo(({ engineer }) => {
    
//     const {name,email,phoneNo} = engineer
//     console.log("ServiceEngineer RE RENDERS");
  
  
//       return (
//           <div className="ServiceEngineer-div hover:shadow-md border-amber-400 flex flex-row justify-between items-center bg-gray-200 p-4">
//               <div className="left-side flex flex-row items-center gap-2" >
//                   <img src="/userIcon.png" alt="ServiceEngineer Icon" />
//                   <span className="font-serif pointer">{name}</span>
//               </div>
//               <div className="right-side flex flex-row items-center justify-center gap-8">
//                  <div className="flex flex-row w-400px">
//                  <span className="font-bold mr-14">{phoneNo}</span>
//                  <span className="font-bold mr-2">{email}</span>
//                  </div>
//                  <div className="gap-8 flex flex-row">
//                  <span>
//                       <Button value="EDIT" classname="mb-2"  />
//                   </span>
//                   <span>
//                       <Button value="DELETE" classname="mb-2" />
//                   </span>
//                  </div>
//               </div>
//           </div>
//       );
//   });
  
//   export default React.memo(ServiceEngineer);
  

// import React, { memo } from "react";
// import Button from "./Button";

// const ServiceEngineer = memo(({ engineer }) => {
//   const { name, email, phoneNo } = engineer;
//   console.log("ServiceEngineer RE RENDERS");

//   return (
//     <div className="service-engineer-row hover:shadow-md flex flex-row justify-between items-center bg-gray-100 p-4 border-b border-gray-300">
//       <div className="left-side flex flex-row items-center gap-4" style={{ width: "25%" }}>
//         <img src="/userIcon.png" alt="Service Engineer Icon" className="w-10 h-10" />
//         <span className="font-serif">{name}</span>
//       </div>
//       <div className="middle-side flex flex-row gap-32 items-center" style={{ width: "35%" }}>
//         <span className="font-bold mr-8">{phoneNo}</span>
//         <span className="font-bold">{email}</span>
//       </div>
//       <div className="right-side flex flex-row items-center justify-end" style={{ width: "30%" }}>
//         <Button value="EDIT" classname="mr-4" />
//         <Button value="DELETE" classname="mr-2" />
//       </div>
//     </div>
//   );
// });

// export default React.memo(ServiceEngineer);


const ServiceEngineer = memo(({ engineer }) => {
    const { name, email, phoneNo } = engineer;
    console.log("ServiceEngineer RE RENDERS");
  
    return (
      <div className="service-engineer-row hover:shadow-md flex flex-row justify-between items-center bg-gray-100 p-4 border-b border-gray-300">
        <div className="left-side flex flex-row items-center gap-4" style={{ width: "25%" }}>
          <img src="/userIcon.png" alt="Service Engineer Icon" className="w-10 h-10" />
          <span className="font-serif font-bold">{name}</span>
        </div>
        <div className="middle-side flex flex-row gap-32 items-center" style={{ width: "35%" }}>
          <span className="font-bold mr-8 ml-6">{phoneNo}</span>
          <span className="font-bold ml-32">{email}</span>
        </div>
        <div className="right-side flex flex-row items-center justify-end" style={{ width: "30%" }}>
          
          <Button value="DELETE" classname="mr-2" />
        </div>
      </div>
    );
  });



export default React.memo(ServiceEngineer);
