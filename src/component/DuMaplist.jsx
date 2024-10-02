// // import React, { useEffect, useState } from "react";
// // import axios from "axios"; 
// // import Error from "./Error"; 
// // import DUInfo from "./DUInfo";
// // import useDUMap from '../hooks/useDUMap';  // Assuming the hook is in the same folder
// // import { ToastContainer } from 'react-toastify';


// // const DUMapList = () => {
// //   const [duMaps, setDuMaps] = useState([]); 
// //   const [loading, setLoading] = useState(true); 
// //   const [error, setError] = useState(null); 
// //   const { deleteDUMap, isLoading } = useDUMap();

 
// //   useEffect(() => {
// //     const fetchDuMaps = async () => {
// //       try {
// //         const response = await axios.get("http://192.168.29.65:7000/api/getDUMap", {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem("token")}`,
// //           },
// //         });
// //         setDuMaps(response.data);
// //       } catch (error) {
// //         setError(error.message || "Failed to fetch DU Maps");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchDuMaps();
// //   }, []);

// //   if (loading) return <div>Loading DU Maps...</div>;
// //   if (error) return <div>Error: {error}</div>;


// //   const handleDelete = (id) => {
// //     deleteDUMap(id);
// //   };
 

// //   return (
// //     <div className="p-10 ">
// //       <h2 className="text-3xl font-bold mb-6 text-center">DU MAP DETAILS</h2>
// //       <div className="flex flex-row justify-between text-lg bg-black text-amber-400 font-bold pr-8 py-4">
// //         <div className="ml-10">NAME</div>
// //         <div>DU NUMBER</div>
// //         <div className="ml-5">MODEL</div>
// //         <div className="mr-16">DISPLAY NO</div>
// //         <div></div>
// //       </div>
// //      <div className="flex flex-col gap-4">
// //      {duMaps.length === 0 ? (
// //         <Error message="Not found" />
// //       ) : (
// //         duMaps.map((duMap, index) => <DUInfo loading={isLoading} key={index} duMap={duMap} onClick={() => handleDelete(duMap._id)}/>)
// //       )}
// //      </div>
// //      <ToastContainer/>
// //     </div>
// //   );
// // };

// // export default DUMapList;

// import React, { useEffect, useState } from "react";
// import axios from "axios"; 
// import Error from "./Error"; 
// import Loading from "./Loading";
// import DUInfo from "./DUInfo";
// import useDUMap from '../hooks/useDUMap'; 
// import { ToastContainer } from 'react-toastify';

// const DUMapList = () => {
//   const [duMaps, setDuMaps] = useState([]); 
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState(null); 

//   const { deleteDUMap, isLoading } = useDUMap();

//   const fetchDuMaps = async () => {
//     try {
//       const response = await axios.get("http://192.168.29.65:7000/api/getDUMap", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       console.log(response.data);
//       setDuMaps(response.data);
//     } catch (error) {
//       setError(error.message || "Failed to fetch DU Maps");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDuMaps();
//   }, []);

//   if (loading) return <div className="text-center text-xl"><Loading /></div>;
//   if (error) return <Error message={error} />;

//   const handleDelete = async (id) => {
//     await deleteDUMap(id);
//     await fetchDuMaps();
//   };
import React, { useEffect, useState } from "react";
import axios from "axios"; 
import Error from "./Error"; 
import DUInfo from "./DUInfo";
import useDUMap from '../hooks/useDUMap'; 
import { ToastContainer } from 'react-toastify';
import Loading from "./Loading";

const DUMapList = () => {
  const [duMaps, setDuMaps] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const { deleteDUMap, isLoading } = useDUMap();

  const fetchDuMaps = async () => {
    try {
      const response = await axios.get("http://192.168.29.65:7000/api/getDUMap", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDuMaps(response.data);
    } catch (error) {
      setError(error.message || "Failed to fetch DU Maps");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDuMaps();
  }, []);

  if (loading) return <div className="text-center text-xl"><Loading /></div>;
  if (error) return <Error message={error} />;

  const handleDelete = async (id) => {
    await deleteDUMap(id);
    await fetchDuMaps();
  };

  return (
    <div className="du-map-list p-10 flex flex-col gap-4">
      <h2 className="text-3xl font-bold mb-6 text-center">DU MAP DETAILS</h2>
      <div className="flex flex-row justify-between items-center bg-gray-100 p-4 pl-24 border-b border-gray-300 bg-gray-800 text-amber-400 font-bold hover:shadow-md">
        <div className="flex min-w-[50px] ">NAME</div>
        <div className="flex w-[100px] ">DU NUMBER</div>
        <div className="flex ml-5 ">MODEL</div>
        <div className="flex ">DISPLAY NO</div>
        <div className="flex min-w-[100px]"></div>
      </div>
      <div className="flex flex-col gap-4">
        {duMaps.length === 0 ? (
          <Error message="Not found" />
        ) : (
          duMaps.map((duMap, index) => (
            <DUInfo
              key={index}
              duMap={duMap}
              loading={isLoading}
              onDelete={() => handleDelete(duMap.duMapId)}
            />
          ))
        )}
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default DUMapList;


//   return (
//     <div className="du-map-list p-10 flex flex-col gap-4">
//       <h2 className="text-3xl font-bold mb-6 text-center">DU MAP DETAILS</h2>
//       <div className="flex flex-row justify-between text-lg my-5 gap-4 bg-gray-800 w-full text-amber-400 font-bold p-4 rounded-md shadow-lg">
//         <div className="flex-1 text-left">NAME</div>
//         <div className="flex-1 text-left">DU NUMBER</div>
//         <div className="flex-1 text-left">MODEL</div>
//         <div className="flex-1 text-left">DISPLAY NO</div>
//         <div className="flex-1"></div>
//       </div>
//       <div className="flex flex-col gap-4">
//         {duMaps.length === 0 ? (
//           <Error message="Not found" />
//         ) : (
//           duMaps.map((duMap, index) => (
//             <DUInfo
//               key={index}
//               duMap={duMap}
//               loading={isLoading}
//               onDelete={() => handleDelete(duMap.duMapId)}
//             />
//           ))
//         )}
//       </div>
//       <ToastContainer position="top-center" />
//     </div>
//   );
// };

// export default DUMapList;




// import React, { useEffect, useState } from "react";
// import axios from "axios"; 
// import Error from "./Error"; 
// import DUInfo from "./DUInfo";
// import useDUMap from '../hooks/useDUMap';  // Assuming the hook is in the same folder
// import { ToastContainer } from 'react-toastify';

// const DUMapList = () => {
//   const [duMaps, setDuMaps] = useState([]); 
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState(null); 

//   const { deleteDUMap, isLoading } = useDUMap();
//   const fetchDuMaps = async () => {
//     try {
//       const response = await axios.get("http://192.168.29.65:7000/api/getDUMap", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       console.log(response.data);
      
//       setDuMaps(response.data);
//     } catch (error) {
//       setError(error.message || "Failed to fetch DU Maps");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//    fetchDuMaps();
//   }, []);

//   if (loading) return <div>Loading DU Maps...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const handleDelete = async (id) => {
    
//     console.log("id : ",id);
    
//    await deleteDUMap(id);
//    await fetchDuMaps();
//   };

//   return (
//     <div className="p-10 flex flex-col gap-4">
//       <h2 className="text-3xl font-bold mb-6 text-center">DU MAP DETAILS</h2>
//       <div className="flex flex-row justify-between text-lg bg-black text-amber-400 font-bold pr-8 py-4">
//         <div className="ml-10">NAME</div>
//         <div>DU NUMBER</div>
//         <div className="ml-5">MODEL</div>
//         <div className="mr-16">DISPLAY NO</div>
//         <div></div>
//       </div>
//       <div className="flex flex-col gap-4">
//         {duMaps.length === 0 ? (
//           <Error message="Not found" />
//         ) : (
//           duMaps.map((duMap, index) => (
//             <DUInfo
//               key={index}
//               duMap={duMap}
//               loading={isLoading}
//               onDelete={() => handleDelete(duMap.duMapId)}
//             />
//           ))
//         )}
//       </div>
//       <ToastContainer position="top-center" />
//     </div>
//   );
// };

// export default DUMapList;
