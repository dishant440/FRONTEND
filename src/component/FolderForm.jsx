import React, { useState } from 'react';

const FolderForm = ({ onClose }) => {
  const [folderName, setFolderName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    onClose(); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        placeholder="Folder Name"
        required
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default FolderForm;
