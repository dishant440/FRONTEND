import React, { useState } from "react";
import Heading from "./Heading";
import FolderList from "./FolderList";

const MainComponent = ({ setParentFolderId }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  // Function to refresh the FolderList
  const refreshFolders = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <Heading refreshFolders={refreshFolders} />
      <FolderList setParentFolderId={setParentFolderId} refreshKey={refreshKey} />
    </>
  );
};

export default MainComponent;
