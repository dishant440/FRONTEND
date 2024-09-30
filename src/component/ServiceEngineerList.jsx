import React, { useEffect, useState } from "react";
import { useServiceEngineer } from "../hooks/useServiceEngineer"; // Custom hook
import ServiceEngineer from "./ServiceEngineer"; // Engineer component
import Error from "./Error"; // Error handling component

const ServiceEngineerList = () => {
  const { getServiceEngineer } = useServiceEngineer(); // Fetch service engineers from hook
  const [engineers, setEngineers] = useState([]); // List of engineers
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

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

    fetchEngineers(); // Call fetch function on component mount
  }, []);

  if (loading) return <div>Loading service engineers...</div>; // Show loading state
  if (error) return <div><Error message="No Data Available"/></div>; // Show error if any

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
          <ServiceEngineer key={index} engineer={engineer} />
        ))
      )}
    </div>
  );
};

export default ServiceEngineerList;
