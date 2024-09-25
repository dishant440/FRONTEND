// import React, { useState } from "react";
// import { MainComponent, Navbar, Sidebar } from "../component/Index";
// import FolderForm from "../component/FolderForm";
// import axios from "axios"; // Import axios for API calls

// const Dashboard = () => {
//   const [showFolderForm, setShowFolderForm] = useState(false);
//   const [parentFolderId, setParentFolderId] = useState("");
//   const [folders, setFolders] = useState([]); // State to store folder data
//   console.log("DASHBOARD RENDERS");
  
//   // Function to fetch folder data
//   const fetchFolderData = async (folderId) => {
//     try {
//       const response = await axios.get(
//         folderId ? `http://localhost:7000/api/content/${folderId}` : `http://localhost:7000/api/allContent`
//       );
//       setFolders(response.data); // Update the folders state with fetched data
//     } catch (error) {
//       console.error("Error fetching folder data:", error);
//     }
//   };

//   // Function to refresh folder list
//   const refreshFolderList = () => {
//     fetchFolderData(parentFolderId); // Call fetch function with the current parent folder ID
//   };

//   const handleSelection = (action, folderId) => {
//     if (action === "createFolder") {
//       setParentFolderId(folderId);
//       setShowFolderForm(true);
//     }
//   };

//   // Fetch root folder data when the component mounts
//   React.useEffect(() => {
//     fetchFolderData(null); // Fetch the root folder data initially
//   }, []);

//   return (
//     <div className="flex flex-col h-screen">
//       <Navbar />
//       <div className="flex flex-1">
//         <div className="flex-none">
//           <Sidebar onSelect={(action) => handleSelection(action, parentFolderId)} />
//         </div>
//         <div className="flex-1 bg-gray-100">
//           {showFolderForm && (
//             <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
//               <FolderForm 
//                 parentFolderId={parentFolderId} 
//                 onClose={() => setShowFolderForm(false)} 
//                 onFolderCreated={refreshFolderList} // Pass the refresh function
//               />
//             </div>
//           )}
//           <MainComponent setParentFolderId={setParentFolderId} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useCallback, useEffect } from "react";
import { MainComponent, Navbar, Sidebar } from "../component/Index";
import FolderForm from "../component/FolderForm";
import axios from "axios"; // Import axios for API calls
import UploadFileForm from "../component/UploadFileForm"
const Dashboard = () => {
  const [showFolderForm, setShowFolderForm] = useState(false);
  const [parentFolderId, setParentFolderId] = useState("");
  const [folders, setFolders] = useState([]); // State to store folder data
  const [fileUpload,setFileUpload] = useState(false);

  console.log("DASHBOARD RENDERS");

  // Function to fetch folder data
  const fetchFolderData = useCallback(async (folderId) => {
    try {
      const response = await axios.get(
        folderId ? `http://localhost:7000/api/content/${folderId}` : `http://localhost:7000/api/allContent`
      );
      setFolders(response.data); // Update the folders state with fetched data
    } catch (error) {
      console.error("Error fetching folder data:", error);
    }
  }, []);

  // Function to refresh folder list
  const refreshFolderList = useCallback(() => {
    fetchFolderData(parentFolderId); // Call fetch function with the current parent folder ID
  }, [parentFolderId, fetchFolderData]);

  // Memoized handler to prevent re-rendering of Sidebar/MainComponent
  const handleSelection = useCallback((action, folderId) => {
    if (action === "createFolder") {
      setParentFolderId(folderId);
      setShowFolderForm(true);
    }
    if (action === "uploadFile") {
      setFileUpload(true)
  }
  }, []);

  // Fetch root folder data when the component mounts
  useEffect(() => {
    fetchFolderData(null); // Fetch the root folder data initially
  }, [fetchFolderData]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <div className="flex-none">
          <Sidebar onSelect={(action) => handleSelection(action, parentFolderId)} />
        </div>
        <div className="flex-1 bg-gray-100">
          {showFolderForm && (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
              <FolderForm 
                parentFolderId={parentFolderId} 
                onClose={() => setShowFolderForm(false)} 
                onFolderCreated={refreshFolderList} // Pass the refresh function
              />
            </div>
          )}
            {fileUpload && (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <UploadFileForm
                onClose={() => setFileUpload(false)}
                parentFolderId={parentFolderId}
                />
            </div>
          )}
          <MainComponent setParentFolderId={setParentFolderId} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Dashboard); // Memoize Dashboard to prevent re-renders unless props change
