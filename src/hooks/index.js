import { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export const customHooks = () =>{
    const [error ,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const [content, setContent] = useState({ Folders: [], Files: [] });

    const token = localStorage.getItem("token");

    const fetchAllContent = async () => {
       setLoading(true);    
        try {   
            const response = await axios.get("http://localhost:7000/api/allContent",{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setContent(response.data);
            console.log(response.data);
            
        } catch (error) {
            setError(error.response?.data?.message || error.message);
          } finally {
            setLoading(false);
          }
          
    }

    return {fetchAllContent,loading,error,content}
}

