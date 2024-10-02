import React, { useEffect, useState } from "react";
import { useServiceEngineer } from "../hooks/useServiceEngineer"; // Custom hook
import ServiceEngineer from "./ServiceEngineer"; // Engineer component
import Error from "./Error"; // Error handling component
import Loading from "./Loading";

const ServiceEngineerList = () => {
  const { getServiceEngineer, deleteServiceEngineer } = useServiceEngineer(); // Fetch service engineers from hook
  const [engineers, setEngineers] = useState([]); // List of engineers
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const[temp,setTemp] = useState(false)  

  const fetchEngineers = async () => {
    try {
      const data = await getServiceEngineer(); // Fetch engineers
      setEngineers(data); // Store the data
    } catch (error) {
      setError(error.message || "Failed to fetch service engineers");
    } finally {
      setLoading(false); // End loading
    }
  };

  // Delete handler
  const handleDelete = async (id) => {
   
    try {
      await deleteServiceEngineer(id); // Call the delete function
      setTemp(true)
    } catch (error) {
      setError(error.message || "Failed to delete service engineer");
    }
  };

  // Fetch engineers on component mount
  useEffect(() => {
    fetchEngineers();
  }, []);
  useEffect(()=>{
    fetchEngineers();
  },[temp])

  if (loading) return <div><Loading /></div>;
  // if (engineers.length === 0) return <div><Error message="No Data Available" /></div>;

  return (
    <div className="service-engineer-list p-10 flex flex-col gap-4">
      <h2 className="text-3xl font-bold mb-6 text-center">SERVICE ENGINEERS</h2>
      <div className="flex flex-row justify-start text-lg my-5 gap-96 mr-96 bg-gray-800  w-full text-amber-400 font-bold p-4 rounded">
        <div className="ml-10">Name</div>
        <div>Phone No</div>
        <div className="mr-10">Email</div>
      </div>
      <div className="flex flex-col gap-4">

      {engineers.length === 0 ? (<Error message="Not found" />)  :(
        engineers.map((engineer, index) => (
          <ServiceEngineer
          key={index}
          engineer={engineer}
          onClick={() => handleDelete(engineer.id)} // Use the correct id field
          />
        ))
      )}
      </div>
    </div>
  );
};

export default ServiceEngineerList;
