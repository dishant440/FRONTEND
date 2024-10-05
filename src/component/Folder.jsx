import React from 'react';

const Folder = ({ folder, onEdit, onDelete, dateOfCreation }) => {
  return (
    <div className="flex items-center justify-between p-4 py-4">
 
      <div className="flex items-center flex-grow">
        <img src={`/folder.png`} alt="Folder Icon" className="w-8 h-8 mr-2" />
        <span className="font-semibold text-lg mx-4">{folder}</span>
      </div>

  
      <div className="flex flex-row items-end gap-4">
        <div className="text-md mx-8 font-bold mb-1">
          {new Date(dateOfCreation).toLocaleDateString()}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(folder._id)}
            className="bg-amber-500 text-white py-1 px-3 mx-4 font-bold rounded hover:bg-amber-400"
          >
              EDIT
          </button>
          <button
            onClick={() => onDelete(folder._id)}
            className="bg-red-500 text-white py-1 px-3 font-bold rounded hover:bg-red-600"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Folder;

