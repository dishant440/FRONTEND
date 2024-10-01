// import React, { useEffect, useState } from "react";
// import axios from "axios"; // For making HTTP requests
// import Error from "./Error"; // Error component to display any errors
// import Logo from "./Logo";
// import DUInfo from "./DUInfo";

// const DUMapList = () => {
//   const [duMaps, setDuMaps] = useState([]); // State to store the DU Map data
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   // Fetch DU Map details on component mount
//   useEffect(() => {
//     const fetchDuMaps = async () => {
//       try {
//         // Make a request to the API to fetch DU Maps
//         const response = await axios.get("http://192.168.29.65:7000/api/getDUMap",{
//           headers:{
//             Authorization:`Bearer ${localStorage.getItem("token")}`
//           }
//         });
        
//         // Store the data in the state
//         console.log(response.data);
        
//         setDuMaps(response.data);
//         console.log("duMaps",duMaps);
        
//       } catch (error) {
//         // Set error message if the request fails
//         setError(error.message || "Failed to fetch DU Maps");
//       } finally {
//         // Stop loading after data is fetched
//         setLoading(false);
//       }
//     };

//     fetchDuMaps(); // Call the function to fetch data
//   }, []);

//   // Loading state display
//   if (loading) return <div>Loading DU Maps...</div>;

//   // Error state display
//   if (error) return <div>Error: {error}</div>;

//   return (


//     <>
//       <div className="service-engineer-list p-10 flex flex-col gap-4">
//       <h2 className="text-2xl font-bold mb-4 mx-auto">DU MAP DETAILS</h2>
//       <div className="flex flex-row justify-between text-lg my-5 gap-96 mr-96 bg-black text-amber-400 font-bold p-4">
//         <div className="">NAME</div>
//         <div>DU NUMBER</div>
//         <div className="">MODEL</div>
//         <div className="">FILE</div>
//       </div>
//       {duMaps.length === 0 ? (
//         <div><Error message="Not found" /></div>
//       ) : (
//         duMaps.map((dumap, index) => (
//           <DUInfo key={index} duMap={dumap} />
//         ))
//       )}
//     </div>
    
//     </>
//   );
// };

// export default DUMapList;


import React, { useEffect, useState } from "react";
import axios from "axios"; 
import Error from "./Error"; 
import Logo from "./Logo";
import DUInfo from "./DUInfo";

const DUMapList = () => {
  const [duMaps, setDuMaps] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
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

    fetchDuMaps();
  }, []);

  if (loading) return <div>Loading DU Maps...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-10 ">
      <h2 className="text-3xl font-bold mb-6 text-center">DU MAP DETAILS</h2>
      <div className="flex flex-row justify-between text-lg bg-black text-amber-400 font-bold p-4 ">
        <div className="ml-10">NAME</div>
        <div>DU NUMBER</div>
        <div className="ml-5">MODEL</div>
        <div className="mr-10">DISPLAY NO</div>
      </div>
     <div className="flex flex-col gap-4">
     {duMaps.length === 0 ? (
        <Error message="Not found" />
      ) : (
        duMaps.map((duMap, index) => <DUInfo key={index} duMap={duMap} />)
      )}
     </div>
    </div>
  );
};

export default DUMapList;
