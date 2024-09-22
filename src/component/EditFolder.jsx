import React, { useEffect, useState } from "react";
import { useFolder } from "../hooks";
import { toast } from "react-toastify";

const EditFolder = ({ folderId, initialFolderName, onClose }) => {
  const { editFolder, loading, error } = useFolder();
  const [newFolderName, setNewFolderName] = useState(initialFolderName);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newFolderName) {
      toast.error("Folder name cannot be empty");
      return;
    }

    try {
      await editFolder(newFolderName, folderId);
      onClose(); // Close the form after successful edit

      
    } catch (error) {
      toast.error(error || "An error occurred while editing the folder");

    }
  };

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">Edit Folder</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="Folder Name"
          className="border p-2 w-full mb-4 bg-gray-700"
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-amber-500 text-white px-4 py-2 rounded"
            disabled={loading || !newFolderName}
          >
            {loading ? "Editing..." : "Edit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFolder;
