import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useDUMap = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const deleteDUMap = async (duMapId) => {
    // Start the loading toast
    console.log("duMapId : ",duMapId);
    
    const toastId = toast.loading("Deleting DUMap...");

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await axios.delete(`http://192.168.29.65:7000/api/deleteDUMap/${duMapId}`);
        console.log(duMapId);
        
      if (response.status === 200) {
        setIsSuccess(true);
        toast.update(toastId, {
          render: "DUMap deleted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      toast.update(toastId, {
        render: `Error: ${err.response?.data?.message || "Something went wrong"}`,
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteDUMap, isLoading, error, isSuccess };
};

export default useDUMap;
