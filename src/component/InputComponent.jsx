import React, { useState } from 'react';

const InputComponent = ({ onCreate, onCancel }) => {
  const [inputValue, setInputValue] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle the Create button click
  const handleCreate = () => {
    if (inputValue.trim() === '') {
      alert("Input can't be empty");
      return;
    }
    onCreate(inputValue);
    setInputValue(''); // Clear the input after creation
  };

  // Handle the Cancel button click
  const handleCancel = () => {
    setInputValue(''); // Clear the input on cancel
    if (onCancel) {
      onCancel(); // Optional: call an external cancel handler if provided
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      {/* Input field */}
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="ENTER FOLDER NAME"
        className="border border-gray-300 rounded-md px-3 py-2 w-full mb-3"
      />

      {/* Buttons */}
      <div className="flex justify-end gap-2">
        <button
          onClick={handleCancel}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Cancel
        </button>
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default InputComponent;
