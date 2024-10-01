import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loading, File, Folder, Error } from "./Index";
import EditFolder from "./EditFolder";
import { useHooks } from "../hooks";
import useFile from "../hooks/useFile";

const convertToIST = (date) => {
  const utcDate = new Date(date);
  const istDate = new Date(utcDate.getTime() + 5 * 60 * 60 * 1000 + 30 * 60 * 1000); 
  return istDate;
};

const FolderList = ({ setParentFolderId, refreshKey }) => {
  const { folderId } = useParams();
  const navigate = useNavigate();
  const [currentContent, setCurrentContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingFolder, setEditingFolder] = useState(null);
  const [showEditForm, setShowFolderForm] = useState(false);
  const { deleteFolder } = useHooks();
  const { deleteFile } = useFile();
  const [folders, setFolders] = useState([]); 
  const [b, setb] = useState(false);

  useEffect(() => {
    fetchContent(folderId);
  }, [b, folderId, refreshKey]);

  const openEditForm = (folderId, folderName) => {
    setEditingFolder({ folderId, folderName });
    setShowFolderForm(true);
  };

  const closeEditForm = () => {
    setEditingFolder(null);
    setShowFolderForm(false);
  };

  const fetchContent = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        id ? `http://192.168.29.65:7000/api/content/${id}` : `http://192.168.29.65:7000/api/allContent`
      );
      setCurrentContent(response.data);
      setFolders(response.data);
      setParentFolderId(id);
      setb(true);
    } catch (err) {
      setError("Error fetching folder content");
    } finally {
      setLoading(false);
    }
  };

  const handleFolderClick = (folder) => {
    navigate(`/content/${folder._id}`);
  };

  const handleDeleteFolder = async (folderId) => {
    await deleteFolder(folderId);
    setFolders(folders.filter(folder => folder._id !== folderId));
  };

  const handleDelete = (fileId) => {
    deleteFile(fileId);
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  console.log("FORMLIST RE RENDER");

  return (
    <div className="p-10 flex flex-col gap-4 overflow-y-auto max-h-[70vh] border-t-2 mt-5 "> {/* Add max-height */}
      {currentContent?.Folders?.length === 0 && currentContent?.Files?.length === 0 ? (
        <div className="mr-28">
          <div className="flex justify-center text-2xl mt-10 mr-5 z-10">
            <Error message="Empty" />
          </div>
        </div>
      ) : (
        <>
          {showEditForm && (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
              <EditFolder
                folderId={editingFolder.folderId}
                initialFolderName={editingFolder.folderName}
                onClose={closeEditForm}
              />
            </div>
          )}

          {/* Render Folders */}
          {currentContent.Folders?.map((folder) => (
            <Folder
              key={folder._id}
              folderName={folder.folderName}
              dateOfCreation={convertToIST(folder.dateOfCreation)}
              onClick={() => handleFolderClick(folder)}
              onClickEdit={() => openEditForm(folder._id, folder.folderName)}
              onClickDelete={() => handleDeleteFolder(folder._id)}
            />
          ))}

          {/* Render Files */}
          {currentContent.Files?.map((file) => (
            <File 
              key={file._id}
              fileName={file.fileName}
              dateOfCreation={file.dateOfCreation}
              onClick={() => handleDelete(file._id)}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default React.memo(FolderList);
