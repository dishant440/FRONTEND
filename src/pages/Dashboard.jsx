import React, { useState, useCallback, useEffect } from "react";
import { MainComponent, Navbar, Sidebar } from "../component/Index";
import FolderForm from "../component/FolderForm";
import UploadFileForm from "../component/UploadFileForm";
import ServiceEngineerForm from "../component/ServiceEngineerForm";
import axios from "axios";
import ServiceEngineerList from "../component/ServiceEngineerList";
import AddNewDispenser from "../component/AddNewDispenser";
import DynamicForm2 from "../component/DynamicForm2";

const Dashboard = () => {
  const [showFolderForm, setShowFolderForm] = useState(false);
  const [parentFolderId, setParentFolderId] = useState("");
  const [folders, setFolders] = useState([]);
  const [activeView, setActiveView] = useState("home"); // Single state to control view
  const [showfileUpload,setshowFileUpload] = useState(false);

  const fetchFolderData = useCallback(async (folderId) => {
    try {
      const response = await axios.get(
        folderId ? `http://localhost:7000/api/content/${folderId}` : `http://localhost:7000/api/allContent`
      );
      setFolders(response.data);
    } catch (error) {
      console.error("Error fetching folder data:", error);
    }
  }, []);

  // Function to refresh folder list
  const refreshFolderList = useCallback(() => {
    fetchFolderData(parentFolderId);
  }, [parentFolderId, fetchFolderData]);

  const handleSelection = useCallback((action, folderId) => {
    if (action === "createFolder") {
      setParentFolderId(folderId);
      setShowFolderForm(true);
    } else if (action === "uploadFile") {
      // setActiveView("uploadFile"); // Change view
      setshowFileUpload(true)

    } else if (action === "addServiceEngineer") {
      setActiveView("addServiceEngineer"); // Change view
    } else if (action === "showServiceEngineer") {
      setActiveView("serviceEngineerList"); // Change view
    } else if (action === "showHome") {
      setActiveView("home"); // Change view
    }
    else if(action === "addDispenser"){
      setActiveView("addDispenser")
    }
    else if (action === "duMap"){
      setActiveView("duMap")
    }
  }, []);

  useEffect(() => {
    fetchFolderData(null);
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
                onFolderCreated={refreshFolderList}
              />
            </div>
          )}

          {/* Render components based on active view */}
          {showfileUpload&& (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
              <UploadFileForm
                onClose={() => setshowFileUpload(false)} // Reset view to home on close
                parentFolderId={parentFolderId}
              />
            </div>
          )}

          {activeView === "addServiceEngineer" && (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
              <ServiceEngineerForm onClose={() => setActiveView("home")} />
            </div>
          )}

          {activeView === "serviceEngineerList" && (
            <ServiceEngineerList />
          )}
          {activeView === "addDispenser" && (
            <AddNewDispenser/>
          )}
          {activeView === "duMap" && (<DynamicForm2/>)}

          {activeView === "home" && (
            <MainComponent setParentFolderId={setParentFolderId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
