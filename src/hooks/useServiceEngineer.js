import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // For success and error messages

export const useServiceEngineer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const getServiceEngineer = async () =>{
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get("http://192.168.29.65:7000/api/getServiceEngineer",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        console.log(response.data);        
        return response.data;

    } catch (error) {
        setError(err.response?.data?.message || "Failed to add service engineer");
        toast.error(error || "Failed to add service engineer");
    }finally {
        setLoading(false);
      }
    return {loading, error, getServiceEngineer}
  }

  const addServiceEngineer = async (engineerData) => {
    setLoading(true);
    setError("");
    console.log(engineerData);
    const token = localStorage.getItem("token")
    try {
      const response = await axios.post("http://192.168.29.65:7000/api/addServiceEngineer", engineerData
        ,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
      );
      
      toast.success("Service Engineer added successfully!"); 
      return response.data; 
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add service engineer");
      toast.error(error || "Failed to add service engineer"); 
    } finally {
      setLoading(false);
    }
  };

  return {
    addServiceEngineer,
    loading,
    error,
  };
};
