// import { useState, useEffect } from "react";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";

// export const useFolder = () => {
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [success,setSuccess] = useState("")
    
//     const createFolder = async (folderName, parentFolderId) => {
        
//         setLoading(true);
//       try {
//         const token = localStorage.getItem("token")
//         const response = await axios.post("http://localhost:7000/api/createFolder", {
//           folderName,
//           parentFolderId
//         }, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         setLoading(false);
//         setSuccess("Folder created Successfully")
//       } catch (error) {
//         setError(error.response?.data?.message || error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     return { createFolder, loading, error, success};
//   };
  
import { useState } from "react";
import axios from "axios";

export const useFolder = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const createFolder = async (folderName, parentFolderId) => {
    setLoading(true);
    setError(null); // Reset error state on new request
    setSuccess(""); // Reset success state on new request

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:7000/api/createFolder", {
        folderName,
        parentFolderId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Folder created successfully");
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { createFolder, loading, error, success };
};
