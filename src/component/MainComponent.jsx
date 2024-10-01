import React, { useState } from "react";
import Heading from "./Heading";
import FolderList from "./FolderList";
import UploadFileForm from "./UploadFileForm"; // Import UploadFileForm

const MainComponent = ({ setParentFolderId }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [parentFolderNames, setParentFolderNames] = useState([]); 
  const [showUploadForm, setShowUploadForm] = useState(false); 

  console.log("MAIN COMPONENT RE RENDER");

  // Function to refresh the FolderList
  const refreshFolders = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  // Function to handle folder creation
  const handleFolderCreated = (folderName, parentId) => {
    // Update the parent folder names
    if (parentId) {
      // Here you would typically retrieve the parent folder name from your folder structure
      const parentFolderName = "Parent Folder Name"; // Replace with actual logic
      setParentFolderNames((prev) => [...prev, parentFolderName]);
    }
  };
  console.log(parentFolderNames);
  

  return (
    <div className="flex flex-col">
      <Heading />
      <div className="flex justify-center">
        <button
          className="bg-black font-bold text-amber-400 py-2 rounded-md mr-36 w-24 items-center"
          onClick={refreshFolders}
        >
          REFRESH
        </button>
      </div>
      <FolderList 
        setParentFolderId={setParentFolderId} 
        onFolderCreated={handleFolderCreated} // Pass the handler
        refreshKey={refreshKey} 
      />
    
      {showUploadForm && (
        <UploadFileForm 
          onClose={() => setShowUploadForm(false)} 
          parentFolderId={setParentFolderId} 
        />
      )}
    </div>
  );
};

export default React.memo(MainComponent);
