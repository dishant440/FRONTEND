
// import React, { useState } from "react";
// import { MainComponent, Navbar, Sidebar } from "../component/Index";
// import FolderForm from "../component/FolderForm";

// const Dashboard = () => {
//   const [showFolderForm, setShowFolderForm] = useState(false);
//   const [parentFolderId, setParentFolderId] = useState("");

//   const handleSelection = (action, folderId) => {
//     if (action === "createFolder") {
//       setParentFolderId(folderId); // Set the parent folder ID when creating a folder
//       setShowFolderForm(true);
//     }
//   };

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
//               <FolderForm parentFolderId={parentFolderId} onClose={() => setShowFolderForm(false)} />
//             </div>
//           )}
//           <MainComponent setParentFolderId={setParentFolderId} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState } from "react";
import { MainComponent, Navbar, Sidebar } from "../component/Index";
import FolderForm from "../component/FolderForm";
import { useParams } from "react-router-dom"; // React Router hook

const Dashboard = () => {
  const { folderId } = useParams(); // Get the folder ID from the URL
  const [showFolderForm, setShowFolderForm] = useState(false);
  const [parentFolderId, setParentFolderId] = useState(folderId || ""); // Set parent folder ID from URL

  const handleSelection = (action, folderId) => {
    if (action === "createFolder") {
      setParentFolderId(folderId); // Set the parent folder ID when creating a folder
      setShowFolderForm(true);
    }
  };

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
              <FolderForm parentFolderId={parentFolderId} onClose={() => setShowFolderForm(false)} />
            </div>
          )}
          <MainComponent setParentFolderId={setParentFolderId} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
