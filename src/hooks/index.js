import { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export const useFolder = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState({});
    
    const createFolder = async (folderName, parentFolderId) => {
        
        setLoading(true);
      try {
        const token = localStorage.getItem("token")
        const response = await axios.post("http://localhost:7000/api/createFolder", {
          folderName,
          parentFolderId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        setContent(response.data);
        
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
  
    return { createFolder, loading, error, content };
  };
  