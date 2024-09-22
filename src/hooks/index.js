// import { useState } from "react";
// import axios from "axios";

// export const useFolder = () => {
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");

//   const createFolder = async (folderName, parentFolderId) => {
//     setLoading(true);
//     setError(null); // Reset error state on new request
//     setSuccess(""); // Reset success state on new request

//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post("http://localhost:7000/api/createFolder", {
//         folderName,
//         parentFolderId,
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setSuccess("Folder created successfully");
//     } catch (error) {
//       setError(error.response?.data?.message || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { createFolder, loading, error, success };
// };



import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const useFolder = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const createFolder = async (folderName, parentFolderId) => {
    setLoading(true);
    setError(null); // Reset error state on new request
    setSuccess(""); // Reset success state on new request
    const toastId = toast.loading("Creating Folder");


    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:7000/api/createFolder", {
        folderName,
        parentFolderId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });toast.update(toastId, {
        render: "Folder created Refresh Page",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      
      setSuccess("Folder created successfully");
      // toast.success("Folder created successfully");
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      setError(errorMsg);
      toast.update(toastId, {
        render: "Error Creating Folder",
        type:"error",
        isLoading:false,
        autoClose:2000,
      })
    } finally {
      setLoading(false);
    }
  };

  return { createFolder, loading, error, success };
};
