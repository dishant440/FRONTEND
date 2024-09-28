// import React, { useState } from "react";
// import { useHooks } from "../hooks";

// const FolderForm = ({ onClose, parentFolderId, onFolderCreated }) => {
//   const { createFolder, loading } = useHooks();
//   const [folderName, setFolderName] = useState("");
//   const [isSubmitted, setIsSubmitted] = useState(false); 

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitted(true); 

//     if (!folderName) return; 

//     try {
//       await createFolder(folderName, parentFolderId);
//       onFolderCreated(); // Call the refresh function
//       onClose(); // Close the form only if the folder is created successfully
//     } catch (error) {
//       // Error handling is done with toast, so no need to update local state here.
//     }
//   };
//   console.log("FOLDER FORM RE RENDER");
  
//   return (
//     <div className="bg-black text-white p-6 rounded-lg shadow-lg w-96">
//       <h2 className="text-xl font-bold mb-4">Create Folder</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={folderName}
//           onChange={(e) => setFolderName(e.target.value)}
//           placeholder="Folder Name"
//           className={`border p-2 w-full mb-4 bg-gray-700 ${isSubmitted && !folderName ? 'border-red-500' : ''}`}
//         />
//         {isSubmitted && !folderName && <p className="text-red-500">Folder name is required</p>}
//         <div className="flex justify-end space-x-4">
//           <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded" disabled={loading}>
//             Cancel
//           </button>
//           <button type="submit" className="bg-amber-500 text-white px-4 py-2 rounded" disabled={loading || !folderName}>
//             {loading ? "Creating..." : "Create"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FolderForm;



import React, { useState } from "react";
import { useHooks } from "../hooks";

const FolderForm = ({ onClose, parentFolderId, onFolderCreated }) => {
  const { createFolder, loading } = useHooks();
  const [folderName, setFolderName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true); 

    if (!folderName) return; 

    try {
      await createFolder(folderName, parentFolderId);
      onFolderCreated(folderName, parentFolderId); // Call the handler with folder name and parent ID
      onClose(); // Close the form only if the folder is created successfully
    } catch (error) {
      // Handle error (e.g., show a toast notification)
    }
  };

  console.log("FOLDER FORM RE RENDER");

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
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded" disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="bg-amber-500 text-white px-4 py-2 rounded" disabled={loading || !folderName}>
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FolderForm;
