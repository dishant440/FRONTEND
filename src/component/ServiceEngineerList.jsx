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

  // Delete handler
  const handleDelete = async (id) => {
  
    await deleteServiceEngineer(id);
  };

  useEffect(() => {
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

    fetchEngineers();
  }, []);

  if (loading) return <div><Loading /></div>;
  if (error) return <div><Error message="No Data Available" /></div>;

  return (
    <div className="service-engineer-list p-10 flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4 mx-auto">SERVICE ENGINEERS</h2>
      <div className="flex flex-row justify-start text-lg my-5 gap-96 mr-96 bg-black w-full text-amber-400 font-bold p-4">
        <div className="ml-10">Name</div>
        <div>Phone No</div>
        <div className="mr-10">Email</div>
      </div>
      {engineers.length === 0 ? (
        <div><Error message="No service engineers found" /></div>
      ) : (
        engineers.map((engineer, index) => (
          <ServiceEngineer
            key={index}
            engineer={engineer}
            onClick={() => handleDelete(engineer.id)} // Pass the function to be called on click
          />
        ))
      )}
    </div>
  );
};

export default ServiceEngineerList;
