import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Optional: for notifications

const useCreateDispenser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createDispenser = async (dispenserData) => {
    console.log("dispenser data : "+JSON.stringify(dispenserData));
    
    setLoading(true);
    setError(null);
    const toastId = toast.loading("Creating New DU");
    try {
        const token = localStorage.getItem("token")
        console.log("token : "+token);

        
      const response = await axios.post("http://192.168.29.65:7000/api/add-new-dispenserUnit", dispenserData,{
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        },
        
      });
      
      toast.update(toastId,{
        render: "DU created Successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      }); 
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create dispenser");
      toast.update(toastId, {
        render: error.response?.data?.message || "Error creating DU",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return { createDispenser, loading, error };
};

export default useCreateDispenser;
