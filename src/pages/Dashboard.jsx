import React, { useState, useCallback, useEffect } from "react";
import {  FolderComponent, Navbar, Sidebar } from "../component/Index";

import ServiceEngineerForm from "../component/ServiceEngineerForm";

import ServiceEngineerList from "../component/ServiceEngineerList";
import AddNewDispenser from "../component/AddNewDispenser";
import DynamicForm2 from "../component/DynamicForm2";
import DUMaplist from "../component/DuMaplist"
import DispenserDetails from "../component/DispenseDetail";
import SvgImage from "../component/Image";


const Dashboard = () => {
const [activeView, setActiveView] = useState("image"); // Single state to control view




  const handleSelection = useCallback((action) => {
    if (action === "addServiceEngineer") {
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
    else if (action === "showDUMap"){
      setActiveView("showDUMap")
    }
    else if(action === "dispenserDetails"){
      setActiveView("dispenserDetails")
    }
  }, []);


  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <div className="flex-none">
          <Sidebar onSelect={(action) => handleSelection(action)} />
        </div>
        <div className="flex-1 bg-gray-100">
          {/* {showFolderForm && (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <FolderForm
              parentFolderId={parentFolderId}
              onClose={() => setShowFolderForm(false)}
              onFolderCreated={refreshFolderList}
            />
          </div>
          )} */}

          {/* Render components based on active view */}
          {/* {showfileUpload&& (
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
              <UploadFileForm
                onClose={() => setshowFileUpload(false)}
                parentFolderId={parentFolderId}
              />
            </div>
          )} */}
          {activeView === "image" && (
            <SvgImage/>
          )
          }

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
            <FolderComponent />
          )}
          {activeView === "showDUMap" && (<DUMaplist/>)}
          {activeView === "dispenserDetails" && <DispenserDetails />}

        </div>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
