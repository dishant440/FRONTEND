// import React, { useState } from 'react';
// import axios from 'axios';

// const UploadFileForm = ({ onCancel, onUploadSuccess }) => {
//   const [file, setFile] = useState(null); // To store the selected file
//   const [description, setDescription] = useState(''); // To store the file description (optional)

//   // Handle file selection
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // Handle description input change
//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   // Handle the Upload button click
//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a file to upload");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('description', description); // Add optional description or any other data

//     try {
//       const response = await axios.post('http://192.168.29.65:7000/api/file/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       // Handle success response
//       console.log('File uploaded successfully:', response.data);
//       alert('File uploaded successfully');
//       if (onUploadSuccess) {
//         onUploadSuccess(response.data); // Optional: callback after successful upload
//       }
//       setFile(null); // Clear file input
//       setDescription(''); // Clear description input
//     } catch (error) {
//       console.error('Error uploading file:', error.message);
//       alert('Error uploading file. Please try again.');
//     }
//   };

//   // Handle the Cancel button click
//   const handleCancel = () => {
//     setFile(null); // Clear the file input
//     setDescription(''); // Clear the description input
//     if (onCancel) {
//       onCancel(); // Optional: call an external cancel handler if provided
//     }
//   };

//   return (
//     <div className="p-4 bg-gray-100 rounded-md shadow-md">
//       {/* File input */}
//       <input
//         type="file"
//         onChange={handleFileChange}
//         className="border border-gray-300 rounded-md px-3 py-2 w-full mb-3"
//       />

//       {/* Description input (optional) */}
//       <input
//         type="text"
//         value={description}
//         onChange={handleDescriptionChange}
//         placeholder="Enter file description (optional)"
//         className="border border-gray-300 rounded-md px-3 py-2 w-full mb-3"
//       />

//       {/* Buttons */}
//       <div className="flex justify-end gap-2">
//         <button
//           onClick={handleCancel}
//           className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleUpload}
//           className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//         >
//           Upload
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UploadFileForm;


import React, { useState } from 'react';

const UploadFileForm = ({ onCancel, onUploadSuccess }) => {
  const [file, setFile] = useState(null); // To store the selected file
  const [description, setDescription] = useState(''); // To store the file description (optional)

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle description input change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handle the Cancel button click
  const handleCancel = () => {
    setFile(null); // Clear the file input
    setDescription(''); // Clear the description input
    if (onCancel) {
      onCancel(); // Optional: call an external cancel handler if provided
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      {/* File input */}
      <input
        type="file"
        onChange={handleFileChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full mb-3"
      />

      {/* Description input (optional) */}
      <input
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter file description (optional)"
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
          onClick={() => { if (onUploadSuccess) onUploadSuccess(file, description); }} // Call the upload success callback directly
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadFileForm;
