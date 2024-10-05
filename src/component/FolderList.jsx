import React from "react";
import Folder from "./Folder";
import File from "./File";

import { useFile } from '../hooks/useFile'; // Import useFile
import { ToastContainer } from "react-toastify";

const FolderList = ({ folders, onFolderClick, files, fetchFolderData, folderId }) => {
    const isEmpty = folders.length === 0 && files.length === 0;
    const { deleteFile } = useFile(); // Access deleteFile from useFile


    const handleDeleteFile = async (fileId) => {
        try {
            await deleteFile(fileId); 
            fetchFolderData(folderId);  
        } catch (error) {
            console.error("Error deleting file:", error.message);
        }
    };

    return (
        <div className="main-div flex flex-col gap-4">
            {folders && folders.map((folder, index) => (
                <Folder
                    key={index}
                    rootFolder={folderId}
                    folder={folder.folderName}
                    folderId={folder._id}
                    dateOfCreation={folder.dateOfCreation}
                    fetchFolder={fetchFolderData}
                    onEdit={() => {}}
                    onFolderClick={() => onFolderClick(folder._id)}  
                />
            ))}

            {files && files.map((file, index) => (
                <div 
                    key={index}
                    className="text-amber-400 py-2 cursor-pointer"
                >
                    <File 
                        fileName={file.fileName}
                        dateOfCreation={file.dateOfCreation}
                        fileId={file._id}
                        onDelete={() => handleDeleteFile(file._id)} 
                    />
                </div>
            ))}
            {folders.length === 0 && files.length===0 && (
                <div className="mx-auto mt-24 text-3xl font-bold text-red-400 p-4 bg-gray-200 rounded">EMPTY</div>
            )}
            <ToastContainer position="top-center"/>
        </div>
    );
};

export default FolderList;
