import React, { useState } from "react";
import {useHooks} from "../hooks"

const UploadFileForm = ({ onClose, parentFolderId }) => {
  const [file, setFile] = useState(null);
  const { uploadFile, loading,error } = useHooks(); // Use the custom hook

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    await uploadFile(file, parentFolderId); // Upload the file
    onClose(); 
  };

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">Upload File</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} className="mb-4" />
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded" disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="bg-amber-500 text-white px-4 py-2 rounded" disabled={loading || !file}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadFileForm;
