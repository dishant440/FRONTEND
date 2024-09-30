import React, { useEffect, useState } from "react";
import axios from "axios"; // For making HTTP requests
import Error from "./Error"; // Error component to display any errors
import Logo from "./Logo";
import DUInfo from "./DUInfo";

const DUMapList = () => {
  const [duMaps, setDuMaps] = useState([]); // State to store the DU Map data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch DU Map details on component mount
  useEffect(() => {
    const fetchDuMaps = async () => {
      try {
        // Make a request to the API to fetch DU Maps
        const response = await axios.get("http://192.168.29.65:7000/api/getDUMap",{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        });
        
        // Store the data in the state
        console.log(response.data);
        
        setDuMaps(response.data);
        console.log("duMaps",duMaps);
        
      } catch (error) {
        // Set error message if the request fails
        setError(error.message || "Failed to fetch DU Maps");
      } finally {
        // Stop loading after data is fetched
        setLoading(false);
      }
    };

    fetchDuMaps(); // Call the function to fetch data
  }, []);

  // Loading state display
  if (loading) return <div>Loading DU Maps...</div>;

  // Error state display
  if (error) return <div>Error: {error}</div>;

  return (
    // <div className="du-map-list p-10 flex flex-col gap-4">
    //   <h2 className="text-2xl font-bold mb-4 mx-auto">DU MAP DETAILS</h2>
    //   {/* Table headers for DU Map */}
    //   <div className="flex flex-row justify-between px-10 text-lg my-5 gap-64 mr-64 bg-black w-full text-amber-400 font-bold p-4">
    //     <div className="ml-10">Engineer Name</div>
    //     <div>DU Number</div>
    //     <div>Model</div>
    //   </div>
    //   {/* If there are no DU Maps */}
    //   <div>
    //     {duMaps.length === 0 ? (
    //     <div><Error message="No DU Maps found" /></div>
    //   ) : (
    //     duMaps?.map((duMap, index) => (
    //       <div key={index} className="flex flex-row justify-start text-lg my-5 gap-64 mr-64 bg-gray-100 w-full text-black font-bold p-4">
    //         <div className="ml-10">{duMap.name}</div>
    //         <div>{duMap.duNumber}</div>
    //         <div>{duMap.model}</div>
    //       </div>
    //     ))
    //   )}
    //   </div>
    // </div>

    <>
      <div className="service-engineer-list p-10 flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4 mx-auto">DU MAP DETAILS</h2>
      <div className="flex flex-row justify-start text-lg my-5 gap-96 mr-96 bg-black w-full text-amber-400 font-bold p-4">
        <div className="ml-10">NAME</div>
        <div>DU NUMBER</div>
        <div className="mr-10">MODEL</div>
      </div>
      {duMaps.length === 0 ? (
        <div><Error message="Not found" /></div>
      ) : (
        duMaps.map((dumap, index) => (
          <DUInfo key={index} duMap={dumap} />
        ))
      )}
    </div>
    
    </>
  );
};

export default DUMapList;
