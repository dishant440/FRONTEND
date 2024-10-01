import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Custom hook for file operations
const useFile = () => {


  // Function to delete a file by ID
  const deleteFile = async (fileId) => {
   
    const toastId = toast.loading("Deleting File ...");

    try {
      // Send DELETE request to the server
      const response = await axios.delete(`http://192.168.29.65:7000/api/deleteFile/${fileId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.update(toastId,{
        render:"Folder deleted successfully",
        type:"success",
        isLoading:false,
        autoClose:2000,
      })  

      console.log(response.data.message); // Optional: Log the success message

    } catch (err) {


      toast.update(toastId, {
        render: "Error deleting file",
        type: "error",
        isLoading: false,
        autoClose: 2000, // Close after 5 seconds
      });

    } 
  };

  return { deleteFile };
};

export default useFile;
