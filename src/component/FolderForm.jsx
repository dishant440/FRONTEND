import React, { useState } from "react";
import { useFolder } from "../hooks";
import Error from "./Error";


const FolderForm = ({ onClose, parentFolderId }) => {
  const { createFolder, loading, error } = useFolder();
  const [folderName, setFolderName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true); 
    if (!folderName) return; 

    try {
      await createFolder(folderName, parentFolderId); // Pass folderName and parentFolderId
      onClose(); // Close the form only if the folder is created successfully
    } catch (error) {
      console.error("Error creating folder", error);
    }
  };

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">Create Folder</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)} // Update state with folder name
          placeholder="Folder Name"
          className={`border p-2 w-full mb-4 bg-gray-700 ${isSubmitted && !folderName ? 'border-red-500' : ''}`} // Highlight empty input
        />
        {isSubmitted && !folderName && <p className="text-red-500">Folder name is required</p>}
        {error && <p className="text-red-500">{error}</p>} {/* Display error if any */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
            disabled={loading} // Disable button while loading
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-amber-500 text-white px-4 py-2 rounded"
            disabled={loading || !folderName} // Disable if loading or folderName is empty
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
      {error && <div><Error message="Error  creating folder" /></div>}
    </div>
  );
};

export default FolderForm;
