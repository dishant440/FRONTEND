import React from 'react';
import { useHooks } from '../hooks';


const Folder = ({ folder, onEdit, dateOfCreation, fetchFolder, onFolderClick, folderId,rootFolder }) => {
  
  const {deleteFolder} = useHooks();


  const  handleDelete = async (ID) => {
    console.log(ID);
    
      try {
        await deleteFolder(ID);
        fetchFolder(rootFolder)
      } catch (error) {
        console.log("something went wrong");
        
      }
  }

  return (
    <div className="flex items-center justify-between p-4 py-4 bg-black text-amber-400">
 
      <div className="flex items-center flex-grow" >
        <img src={`/folder.png`} alt="Folder Icon" className="w-8 h-8 mr-2 cursor-pointer" />
        <span className="font-semibold text-lg mx-4 cursor-pointer" onClick={onFolderClick}>
          {folder}
        </span>
      </div>

      <div className="flex flex-row items-end gap-4">
        <div className="text-md mx-8 font-bold mb-1">
          {new Date(dateOfCreation).toLocaleDateString()}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="bg-amber-500 text-white py-1 px-3 mx-4 font-bold rounded hover:bg-amber-400"
          >
              EDIT
          </button>
          <button
            className="bg-red-500 text-white py-1 px-3 font-bold rounded hover:bg-red-600"
            onClick={() =>handleDelete(folderId)}
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Folder;
