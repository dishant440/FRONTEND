// import React from "react";
// import Heading from "./Heading"
// import FolderList from "./FolderList";


// const MainComponent = ({setParentFolderId}) => {
//     return (
//        <>
//         <Heading/>
//         <FolderList setParentFolderId={setParentFolderId}/>
//        </>
//     );
// };


// export default MainComponent

import React from "react";
import Heading from "./Heading";
import FolderList from "./FolderList";

const MainComponent = ({ setParentFolderId, folders, refreshFolderList }) => {
  return (
    <>
      <Heading />
      <FolderList 
        setParentFolderId={setParentFolderId} 
        folders={folders} 
        refreshFolderList={refreshFolderList} 
      />
    </>
  );
};

export default MainComponent;
