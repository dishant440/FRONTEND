import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loading, File, Folder,Error } from "./Index";

const FolderList = () => {
  const [currentContent, setCurrentContent] = useState(null); // Current folder content
  const [folderStack, setFolderStack] = useState([]);         // Stack for folder navigation
  const [loading, setLoading] = useState(true);               // Loading state
  const [error, setError] = useState(null);                   // Error state

  // Fetch root folder content initially
  useEffect(() => {
    fetchContent();
  }, []);

  // Function to fetch content for root or subfolders
  const fetchContent = async (id = null) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        id ? `http://localhost:7000/api/contenT/${id}` : `http://localhost:7000/api/allContent`
      );
      setCurrentContent(response.data);
    } catch (err) {
      setError("Error fetching folder content");
    } finally {
      setLoading(false);
    }
  };

  // Handle folder click
  const handleFolderClick = (folder) => {
    setFolderStack((prev) => [...prev, { id: folder._id, folderName: folder.folderName }]);
    fetchContent(folder._id);
  };

  // Handle back navigation
  const handleBack = () => {
    setFolderStack((prev) => {
      const newStack = [...prev];
      newStack.pop();
      const parentFolder = newStack.length > 0 ? newStack[newStack.length - 1].id : null;
      fetchContent(parentFolder);
      return newStack;
    });
  };

  // Render loading or error state
  if (loading) return <div><Loading /></div>;
  if (error) return <div><Error message="Something Went Wrong REFRESH PAGE"/></div>;

  return (
    <div className="p-10 flex flex-col gap-4">
      {/* Back button */}
      {folderStack.length > 0 && (
        <button onClick={handleBack} className="bg-black w-24 text-white p-2 mx-auto rounded">
          {"GO BACK"} 
        </button>
      )}

      {/* Render content or empty state */}
      {currentContent?.Folders?.length === 0 && currentContent?.Files?.length === 0 ? (
        <div className="flex justify-center text-2xl mt-10">Empty</div>
      ) : (
        <>
          {/* Render Folders */}
          {currentContent.Folders?.map((folder) => (
            <Folder
              key={folder._id}
              folderName={folder.folderName}
              dateOfCreation={folder.dateOfCreation}
              onClick={() => handleFolderClick(folder)}
            />
          ))}

          {/* Render Files */}
          {currentContent.Files?.map((file) => (
            <File key={file._id} fileName={file.fileName} dateOfCreation={file.dateOfCreation} />
          ))}
        </>
      )}
    </div>
  );
};

export default FolderList;
