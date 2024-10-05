import React, { useState } from 'react';

const EditFolderComponent = ({ initialValue, onEdit, onCancel }) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() === '') {
      alert("Folder name can't be empty");
      return;
    }
    onEdit(inputValue); // Call the onEdit function provided by the parent
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Edit folder name"
        className="border border-gray-300 rounded-md px-3 py-2 w-full mb-3"
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditFolderComponent;
