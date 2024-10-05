import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const useHooks = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const uploadFile = async (file, folderId, modelNo) => {
  if (!file) return;
  console.log("folderId : " + folderId);

  
  // Start loading toast
  const toastId = toast.loading("Uploading file...");
  
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folderId", folderId); // Send folderId
  formData.append("modelNo",modelNo)
  
  const token = localStorage.getItem("token");
  console.log("form-data : ",formData);
  
  
  try {
    // Make the POST request to the backend API
    await axios.post("http://192.168.29.65:7000/api/file/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    
    // Update the toast to success message after the file upload completes
    toast.update(toastId, {
      render: "File uploaded successfully!",
      type: "success",
      isLoading: false,
      autoClose: 3000, // Close after 3 seconds
    });

  } catch (error) {
    toast.update(toastId,{
      render: "Error uploading file Try again",
      type: "success",
      isLoading: false,
      autoClose: 3000, 
    })

    // Update the toast to show an error message if the upload fails
    toast.update(toastId, {
      render: "Error uploading file",
      type: "error",
      isLoading: false,
      autoClose: 5000, // Close after 5 seconds
    });
    
    setError("Error uploading file");
    
  } 
};

  const createFolder = async (folderName, parentFolderId) => {
   
    const toastId = toast.loading("Creating Folder ....");


    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://192.168.29.65:7000/api/createFolder", {
        folderName,
        parentFolderId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.update(toastId, {
        render: "Folder created ",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      
 
   
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      setError(errorMsg);
      toast.update(toastId, {
        render: "Error Creating Folder",
        type:"error",
        isLoading:false,
        autoClose:2000,
      })
    }
  };

  const editFolder = async (newName,folderId) =>{
     
    const toastId = toast.loading("Editing Folder ...");

      try {
        const response = await axios.put("http://192.168.29.65:7000/api/editFolder",{
          newName,
          folderId
        });
        toast.update(toastId, {
          render: "Folder edited successfully ",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        })
      } catch (error) {
        const errorMsg = error.response?.data?.message || error.message;
        toast.update(toastId,{
          render:errorMsg,
          type:"error",
          isLoading:false,
          autoClose:2000,
        });
      }
        
      }

      const deleteFolder = async (id) =>{
        const token = localStorage.getItem("token");    
        const toastId = toast.loading("Deleting Folder ...");
        
        try {
          const response = await axios.delete(`http://192.168.29.65:7000/api/deleteFolder/${id}`,{
            headers: {
              Authorization:`Bearer ${token}`
            }
          });
          toast.update(toastId,{
            render:"Folder deleted successfully",
            type:"success",
            isLoading:false,
            autoClose:2000,
          })  
        } catch (error) {
          const errorMsg = error.response?.data?.message || error.message;
          toast.update(toastId,{
            render:errorMsg,
            type:"error",
            autoClose:2000,
            isLoading:false
          })
        }
      }
    
    
      

    return { createFolder, editFolder ,deleteFolder ,uploadFile};

};


