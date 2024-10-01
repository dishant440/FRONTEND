import { useState } from "react";
import axios from "axios";

// Custom hook for file operations
const useFile = () => {
  const [fileLoading, setfileLoading] = useState(false); // filefileLoading state for file deletion
  const [fileerror, setfileerror] = useState(null);     // fileerror state for any issues
  const [success, setSuccess] = useState(false); // Success state for successful deletion

  // Function to delete a file by ID
  const deleteFile = async (fileId) => {
    setfileLoading(true); // Start fileLoading
    setfileerror(null);   // Clear previous fileerrors
    setSuccess(false); // Clear previous success message

    try {
      // Send DELETE request to the server
      const response = await axios.delete(`http://192.168.29.65:7000/api/file/${fileId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // If the file is successfully deleted
      setSuccess(true);
      console.log(response.data.message); // Optional: Log the success message

    } catch (err) {
      // If an fileerror occurs, set the fileerror state
      setfileerror(err.response?.data?.message || "Failed to delete the file.");
      console.fileerror("fileerror deleting file:", err); // Optional: Log the fileerror

    } finally {
      setfileLoading(false); // Stop fileLoading once the process is complete
    }
  };

  return { deleteFile, fileLoading, fileerror, success };
};

export default useFile;
