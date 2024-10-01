import { useState } from "react";
import axios from "axios";

// Custom hook for file operations
const useFile = () => {
  const [loading, setLoading] = useState(false); // Loading state for file deletion
  const [error, setError] = useState(null);     // Error state for any issues
  const [success, setSuccess] = useState(false); // Success state for successful deletion

  // Function to delete a file by ID
  const deleteFile = async (fileId) => {
    setLoading(true); // Start loading
    setError(null);   // Clear previous errors
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
      // If an error occurs, set the error state
      setError(err.response?.data?.message || "Failed to delete the file.");
      console.error("Error deleting file:", err); // Optional: Log the error

    } finally {
      setLoading(false); // Stop loading once the process is complete
    }
  };

  return { deleteFile, loading, error, success };
};

export default useFile;
