import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loading, File, Folder } from "./Index";

const FolderList = ({ setParentFolderId }) => {
  const { folderId } = useParams(); // Get the folder ID from the URL
  const navigate = useNavigate();
  const [currentContent, setCurrentContent] = useState(null); // Current folder content
  const [loading, setLoading] = useState(true);               // Loading state
  const [error, setError] = useState(null);                   // Error state

  // Fetch content for the current folder (or root if no folderId)
  useEffect(() => {
    fetchContent(folderId);
  }, [folderId]);

  const fetchContent = async (id = null) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        id ? `http://localhost:7000/api/content/${id}` : `http://localhost:7000/api/allContent`
      );
      setCurrentContent(response.data);
      setParentFolderId(id); // Update the parent folder ID
    } catch (err) {
      setError("Error fetching folder content");
    } finally {
      setLoading(false);
    }
  };

  // Handle folder click
  const handleFolderClick = (folder) => {
    navigate(`/content/${folder._id}`); // Update the URL with the folder ID
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-10 flex flex-col gap-4">
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
