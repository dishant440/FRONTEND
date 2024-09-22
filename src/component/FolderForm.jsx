import React, { useState } from "react";
import { useFolder } from "../hooks";
import Error from "./Error";

const FolderForm = ({ onClose, parentFolderId, onFolderCreated }) => {
  const { createFolder, loading, error } = useFolder();
  const [folderName, setFolderName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); 
    setIsSubmitted(true); 
    if (!folderName) return; 

    try {
      await createFolder(folderName, parentFolderId);
      onFolderCreated(); // Call the refresh function
      onClose(); // Close the form only if the folder is created successfully
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message); // Set error message from server response
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">Create Folder</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Folder Name"
          className={`border p-2 w-full mb-4 bg-gray-700 ${isSubmitted && !folderName ? 'border-red-500' : ''}`}
        />
        {isSubmitted && !folderName && <p className="text-red-500">Folder name is required</p>}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded" disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="bg-amber-500 text-white px-4 py-2 rounded" disabled={loading || !folderName}>
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
      {error && <Error message={error} />}
    </div>
  );
};

export default FolderForm;
