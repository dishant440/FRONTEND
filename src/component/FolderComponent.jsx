// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useHooks } from '../hooks/index';
// import { toast } from "react-toastify";
// import InputComponent from './InputComponent';  
// import FolderList from "./FolderList";
// import useFile from '../hooks/useFile';


// const FolderComponent = () => {
//   const [folders, setFolders] = useState([]);
//   const [files, setFiles] = useState([]);
//   const [folderId, setFolderId] = useState('');
//   const [showCreateInput, setShowCreateInput] = useState(false);  
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [modelNo, setModelNo] = useState('');
//   const [folderHistory, setFolderHistory] = useState([]);

//   const { createFolder, uploadFile } = useHooks();
 

//   const fetchFolderData = useCallback(async (folderId ) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(
//         folderId
//           ? `http://192.168.29.65:7000/api/content/${folderId}`
//           : `http://192.168.29.65:7000/api/allContent`
//       );
//       setFolders(response.data.Folders || []);
//       setFiles(response.data.Files || []);
//     } catch (error) {
//       console.error("Error fetching folder data:", error.message);
//       setError("Failed to fetch folder data. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchFolderData(); 
//   }, [fetchFolderData]);

//   const handleCreateFolder = async (folderName) => {
//     if (!folderName) {
//       toast.error("Folder name cannot be empty.");
//       return;
//     }
//     try {
//       await createFolder(folderName, folderId);
//       fetchFolderData(folderId);  
//       setShowCreateInput(false);
//     } catch (err) {
//       console.error("Error creating folder:", err);
//     }
//   };

//   const handleFileUpload = async () => {
//     if (!selectedFile) {
//       toast.error("Please select a file to upload.");
//       return;
//     }
//     try {
//       await uploadFile(selectedFile, folderId, modelNo);
//       setSelectedFile(null);
//       setModelNo('');
//       fetchFolderData(folderId); 
//     } catch (err) {
//       console.error("Error uploading file:", err);
//     }
//   };

//   const handleFolderClick = (clickedFolderId) => {
//     setFolderHistory((prev) => [...prev, folderId]); 
//     setFolderId(clickedFolderId);
//     fetchFolderData(clickedFolderId); 
//   };

//   const handleBackClick = () => {
//     if (folderHistory.length > 0) {
//       const previousFolderId = folderHistory[folderHistory.length - 1]; 
//       setFolderHistory((prev) => prev.slice(0, -1)); 
//       setFolderId(previousFolderId); 
//       fetchFolderData(previousFolderId); 
//     }
//   };

  
  
//   return (
//     <>
//     <div className='flex justify-end mx-24 gap-4 my-5'>
//       <div>
//         {folderHistory.length > 0 && (
//           <button
//             onClick={handleBackClick}
//             className="mt-2 bg-black text-amber-400 font-bold py-2 px-4 rounded"
//           >
//             BACK
//           </button>
//         )}
//       </div>
//       <div>
//         {!showCreateInput ? (
//          <div className='flex flex-row items-center'>
//            <button
//             onClick={() => setShowCreateInput(true)}  
//             className="mt-2 bg-black text-amber-400 font-bold py-2 px-4 rounded "
//           >
//             CREATE FOLDER
//           </button>
//          </div>
//         ) : (
//           <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//               <InputComponent
//                 onCreate={handleCreateFolder}
//                 onCancel={() => setShowCreateInput(false)}
//               />
//             </div>
//           </div>
//         )}
//       </div>

//       <div>
//         <button
//           onClick={handleFileUpload}
//           className="mt-2 bg-black font-bold text-amber-400 py-2 px-4 rounded "
//         >
//           UPLOAD FILE
//         </button>
//       </div>
//     </div>
    
//     <div className='mx-20'>
//     <FolderList 
//       folders={folders} 
//       onFolderClick={handleFolderClick} 
//       files={files}
//       fetchFolderData={fetchFolderData} 
//       folderId={folderId}
// />
//     </div>
//   </>
//   );
// };

// export default FolderComponent;



import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useHooks } from '../hooks/index';
import { toast } from "react-toastify";
import InputComponent from './InputComponent';  
import FolderList from "./FolderList";
import useFile from '../hooks/useFile';
import UploadFileForm from './UploadFileForm'; // Import UploadFileForm


const FolderComponent = () => {
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [folderId, setFolderId] = useState('');
  const [showCreateInput, setShowCreateInput] = useState(false);  
  const [showUploadForm, setShowUploadForm] = useState(false); // Track file upload form visibility
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modelNo, setModelNo] = useState('');
  const [folderHistory, setFolderHistory] = useState([]);

  const { createFolder, uploadFile } = useHooks();
 

  const fetchFolderData = useCallback(async (folderId ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        folderId
          ? `http://192.168.29.65:7000/api/content/${folderId}`
          : `http://192.168.29.65:7000/api/allContent`
      );
      setFolders(response.data.Folders || []);
      setFiles(response.data.Files || []);
    } catch (error) {
      console.error("Error fetching folder data:", error.message);
      setError("Failed to fetch folder data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFolderData(); 
  }, [fetchFolderData]);

  const handleCreateFolder = async (folderName) => {
    if (!folderName) {
      toast.error("Folder name cannot be empty.");
      return;
    }
    try {
      await createFolder(folderName, folderId);
      fetchFolderData(folderId);  
      setShowCreateInput(false);
    } catch (err) {
      console.error("Error creating folder:", err);
    }
  };

  const handleFileUpload = async (file, description) => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }
    try {
      await uploadFile(file, folderId, description);
      setSelectedFile(null);
      setModelNo('');
      fetchFolderData(folderId); 
      setShowUploadForm(false); // Hide the form after successful upload
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  const handleFolderClick = (clickedFolderId) => {
    setFolderHistory((prev) => [...prev, folderId]); 
    setFolderId(clickedFolderId);
    fetchFolderData(clickedFolderId); 
  };

  const handleBackClick = () => {
    if (folderHistory.length > 0) {
      const previousFolderId = folderHistory[folderHistory.length - 1]; 
      setFolderHistory((prev) => prev.slice(0, -1)); 
      setFolderId(previousFolderId); 
      fetchFolderData(previousFolderId); 
    }
  };

  
  
  return (
    <>
    <div className='flex justify-end mx-24 gap-4 my-5'>
      <div>
        {folderHistory.length > 0 && (
          <button
            onClick={handleBackClick}
            className="mt-2 bg-black text-amber-400 font-bold py-2 px-4 rounded"
          >
            BACK
          </button>
        )}
      </div>
      <div>
        {!showCreateInput ? (
         <div className='flex flex-row items-center'>
           <button
            onClick={() => setShowCreateInput(true)}  
            className="mt-2 bg-black text-amber-400 font-bold py-2 px-4 rounded "
          >
            CREATE FOLDER
          </button>
         </div>
        ) : (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <InputComponent
                onCreate={handleCreateFolder}
                onCancel={() => setShowCreateInput(false)}
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => setShowUploadForm(true)} // Show file upload form
          className="mt-2 bg-black font-bold text-amber-400 py-2 px-4 rounded "
        >
          UPLOAD FILE
        </button>
      </div>
    </div>

    {/* Render the file upload form when the button is clicked */}
    {showUploadForm && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <UploadFileForm
            onCancel={() => setShowUploadForm(false)} // Hide form on cancel
            onUploadSuccess={handleFileUpload} // Handle file upload
          />
        </div>
      </div>
    )}
    
    <div className='mx-20'>
      <FolderList 
        folders={folders} 
        onFolderClick={handleFolderClick} 
        files={files}
        fetchFolderData={fetchFolderData} 
        folderId={folderId}
      />
    </div>
  </>
  );
};

export default FolderComponent;
