import React from "react";
import Folder from "./Folder";
import File from "./File";

import { useHooks } from '../hooks/index'; // Import useHooks
import { useFile } from '../hooks/useFile'; // Import useFile

const FolderList = ({ folders, onFolderClick, files, fetchFolderData, folderId }) => {
    const { deleteFolder } = useHooks(); // Access deleteFolder from useHooks
    const { deleteFile } = useFile(); // Access deleteFile from useFile

    // Handle deleting a folder
    // const handleDeleteFolder = async (folderId) => {
    //     console.log(folderId);
    //     console.log("deleteFolder called");
        
    //     try {
    //         await deleteFolder(folderId); 
    //         fetchFolderData();  
    //     } catch (error) {
    //         console.error("Error deleting folder:", error.message);
    //     }
    // };

    // Handle deleting a file
    const handleDeleteFile = async (fileId) => {
        try {
            await deleteFile(fileId); // Use deleteFile from the hook
            fetchFolderData(folderId);  // Refetch data after deletion
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
        </div>
    );
};

export default FolderList;
