// import React from 'react';
// import { useHooks } from '../hooks';


// const Folder = ({ folder, onEdit, dateOfCreation, fetchFolder, onFolderClick, folderId,rootFolder }) => {
  
//   const {deleteFolder} = useHooks();


//   const  handleDelete = async (ID) => {
//     console.log(ID);
    
//       try {
//         await deleteFolder(ID);
//         fetchFolder(rootFolder)
//       } catch (error) {
//         console.log("something went wrong");
        
//       }
//   }

//   return (
//     <div className="flex items-center justify-between p-4 py-4 bg-black text-amber-400">
 
//       <div className="flex items-center flex-grow" >
//         <img src={`/folder.png`} alt="Folder Icon" className="w-8 h-8 mr-2 cursor-pointer" />
//         <span className="font-semibold text-lg mx-4 cursor-pointer" onClick={onFolderClick}>
//           {folder}
//         </span>
//       </div>

//       <div className="flex flex-row items-end gap-4">
//         <div className="text-md mx-8 font-bold mb-1">
//           {new Date(dateOfCreation).toLocaleDateString()}
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={onEdit}
//             className="bg-amber-500 text-white py-1 px-3 mx-4 font-bold rounded hover:bg-amber-400"
//           >
//               EDIT
//           </button>
//           <button
//             className="bg-red-500 text-white py-1 px-3 font-bold rounded hover:bg-red-600"
//             onClick={() =>handleDelete(folderId)}
//           >
//             DELETE
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Folder;



import React, { useState } from 'react';
import { useHooks } from '../hooks';
import EditFolderComponent from './EditFolderComponent'; // Import the EditFolderComponent

const Folder = ({ folder, onEdit, dateOfCreation, fetchFolder, onFolderClick, folderId, rootFolder }) => {
  const { deleteFolder, editFolder } = useHooks();
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [newFolderName, setNewFolderName] = useState(folder); // State for new folder name

  const handleDelete = async (ID) => {
    try {
      await deleteFolder(ID);
      fetchFolder(rootFolder);
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const handleEditSubmit = async (newName) => {
    try {
      await editFolder(newName, folderId);
      setIsEditing(false); // Exit edit mode after successful edit
      setNewFolderName(newName); // Update the folder name in state
    } catch (error) {
      console.error("Error editing folder:", error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 py-4 bg-black text-amber-400">
      <div className="flex items-center flex-grow">
        <img src={`/folder.png`} alt="Folder Icon" className="w-8 h-8 mr-2 cursor-pointer" />
        <span className="font-semibold text-lg mx-4 cursor-pointer" onClick={onFolderClick}>
          {newFolderName}
        </span>
      </div>

      <div className="flex flex-row items-end gap-4">
        <div className="text-md mx-8 font-bold mb-1">
          {new Date(dateOfCreation).toLocaleDateString()}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)} // Open edit mode
            className="bg-amber-500 text-white py-1 px-3 mx-4 font-bold rounded hover:bg-amber-400"
          >
            EDIT
          </button>
          <button
            className="bg-red-500 text-white py-1 px-3 font-bold rounded hover:bg-red-600"
            onClick={() => handleDelete(folderId)}
          >
            DELETE
          </button>
        </div>
      </div>

      {/* Render Edit Folder component if isEditing is true */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <EditFolderComponent
              initialValue={newFolderName}
              onEdit={handleEditSubmit}
              onCancel={() => setIsEditing(false)} // Cancel editing
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Folder;
