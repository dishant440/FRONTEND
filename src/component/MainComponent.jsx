import React, { useState } from "react";
import Heading from "./Heading";
import FolderList from "./FolderList";

const MainComponent = ({ setParentFolderId }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  console.log("MAIN COMPONENT RE RENDER");
  
  // Function to refresh the FolderList
  const refreshFolders = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="flex flex-col">
      <Heading  />
      <div className="flex justify-center">
        
        <button
          className="bg-black font-bold text-amber-400  py-2 rounded-md mr-36 w-24 items-center "
          onClick={refreshFolders}
          >
            REFRESH
        </button>
        </div>
      <FolderList setParentFolderId={setParentFolderId} refreshKey={refreshKey} />
    </div>
  );
};

export default React.memo(MainComponent);
