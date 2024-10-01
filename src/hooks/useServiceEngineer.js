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
        const response = await axios.get("http://192.168.29.65:7000/api/getServiceEngineers",{
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
   
  }
  const deleteServiceEngineer = async (id) => {
   
    const toastId = toast.loading('Deleting .....')
    try {
      const response = await axios.delete(`http://192.168.29.65:7000/api/deleteServiceEngineer/${id}`, {
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
        
      });
      console.log(id);
      
      toast.update(toastId,{
        render:"Deleted successfully",
        type:"success",
        isLoading:false,
        autoClose:2000,
      })  
      
    } catch (error) {
      toast.update(toastId,{
        render:"Error Deleting",
        type:"error",
        isLoading:false,
        autoClose:2000,
      })
    } 
  };


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
      toast.error(error || "Failed to add service engineer"); // Show error notification

    } finally {
      setLoading(false);
    }
  };

  return {
    getServiceEngineer,
    addServiceEngineer,
    deleteServiceEngineer,
    loading,
    error,
  };
};
