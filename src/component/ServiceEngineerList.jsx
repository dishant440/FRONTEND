// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useServiceEngineer } from "../hooks/useServiceEngineer";


// const ServiceEngineerList = () =>{
//     const {getServiceEngineer} = useServiceEngineer();
//     const [loading,setLoading] = useState(true);
//     const [error,setError] = useState(null);

//     useEffect(()=>{
//         getServiceEngineer();
//     },[]);

//     try {
//         const response = await
//     } catch (error) {
        
//     }
    
//     return <>
       

//     </>
// }

// export default ServiceEngineerList;

import React, { useEffect, useState } from "react";
import { useServiceEngineer } from "../hooks/useServiceEngineer"; // Assuming this is your custom hook
import ServiceEngineer from "./ServiceEngineer"; // Component to render each engineer
import Error from "./Error";

const ServiceEngineerList = () => {
  const { getServiceEngineer } = useServiceEngineer();
  const [engineers, setEngineers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const data = await getServiceEngineer(); // Fetch the data
        setEngineers(data); // Store the list of engineers
      } catch (error) {
        setError(error.message || "Failed to fetch service engineers");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchEngineers();
  }, []);

  if (loading) return <div>Loading service engineers...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="service-engineer-list p-10 flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4 mx-auto">SERVICE ENGINEERS</h2>
      <div className="flex flex-row justify-start text-lg my-5 gap-96 mr-96 bg-black w-full text-amber-400 font-bold p-4">
        <div className="ml-10">Name</div>
        <div>Phone No</div>
        <div className="mr-10">Email</div>
      </div>
      {engineers.length === 0 ? (
        <div><Error message="No  service engineers found" /></div>
      ) : (
        engineers.map((engineer, index) => (
          <ServiceEngineer key={index} engineer={engineer} />
        ))
      )}
    </div>
  );
};

export default ServiceEngineerList;
