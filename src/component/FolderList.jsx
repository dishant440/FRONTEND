import React, { useEffect, useState } from "react";
import Folder from "./Folder";
import File from "./File";
import axios from "axios";

const FolderList = () => {
  const [currentContent, setCurrentContent] = useState(null); // To store the current folder content
  const [folderStack, setFolderStack] = useState([]);         // Stack to keep track of folder navigation
  const [loading, setLoading] = useState(true);               // Track loading state
  const [error, setError] = useState(null);                   // Track errors

  // Fetch the root folder content initially
  useEffect(() => {
    fetchContent(null);
  }, []);

  // Function to fetch content (for root or subfolders)
  const fetchContent = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        id ? `http://localhost:7000/api/content/${id}` : `http://localhost:7000/api/allContent`
      );
      setCurrentContent(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching folder content");
      setLoading(false);
    }
  };

  // Handle folder click: Navigate to subfolder and add current folder to stack
  const handleFolderClick = (folder) => {
    setFolderStack([...folderStack, { id: folder._id, folderName: folder.folderName }]); // Push folder to stack
    fetchContent(folder._id); // Fetch subfolder content
  };

  // Handle back button: Navigate to parent folder
  const handleBack = () => {
    const newStack = [...folderStack];
    newStack.pop(); // Remove the last folder from the stack
    setFolderStack(newStack);

    // Fetch parent folder content (if available), or root content if stack is empty
    const parentFolder = newStack.length > 0 ? newStack[newStack.length - 1].id : null;
    fetchContent(parentFolder);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-10 flex flex-col gap-4">
      {/* Back button, only show if there's a parent folder in the stack */}
      {folderStack.length > 0 && (
        <button onClick={handleBack} className="bg-black w-24 text-white p-2 mx-auto rounded">
          {"GO BACK"} 
        </button>
      )}
      

      {/* Render Folders */}
      {
  currentContent?.Folders?.length === 0 &&
  currentContent?.Files?.length === 0 ? (
    <div className="flex justify-center text-2xl mt-10">Empty</div>
  ) : (
    <>
      {/* Render Folders */}
      {currentContent.Folders && currentContent.Folders.length > 0 && (
        currentContent.Folders.map((folder) => (
          <Folder
            key={folder._id}
            folderName={folder.folderName}
            dateOfCreation={folder.dateOfCreation}
            onClick={() => handleFolderClick(folder)} // Handle folder click
          />
        ))
      )}

      {/* Render Files */}
      {currentContent.Files && currentContent.Files.length > 0 && (
        currentContent.Files.map((file) => (
          <File key={file._id} fileName={file.fileName} dateOfCreation={file.dateOfCreation} />
        ))
      )}
    </>
  )
}

    </div>
  );
};

export default FolderList;
