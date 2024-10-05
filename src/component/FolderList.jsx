import React from "react";
import Folder from "./Folder";
import File from "./File";

const FolderList = ({ folders, onFolderClick,files,onDeleteFolder,onDeleteFile }) => {
    
    return (
      <div className="main-div flex flex-col gap-4">
        {folders && folders.map((folder, index) => (
          <div 
            key={index} 
            className="bg-black text-amber-400 py-2 cursor-pointer"
            onClick={() => onFolderClick(folder._id)}  // Handle folder click
          >
            <Folder
              folder={folder.folderName}
              dateOfCreation={folder.dateOfCreation}
              onDelete={() => onDeleteFolder(folder._id)}
            />
          </div>
        ))}
        {files && files.map((file,index)=>(
           
            <div key={index}
            className="text-amber-400 py-2 cursor-pointer"
            >
                <File fileName={file.fileName} dateOfCreation={file.dateOfCreation} fileId={file._id} onDelete={() => onDeleteFile(file._id)}/>

            </div>
            
        ))

        }
      </div>
    );
  };
  
  export default FolderList;
  