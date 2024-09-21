import React from "react";
import Heading from "./Heading"
import FolderList from "./FolderList";


const MainComponent = ({setParentFolderId}) => {
    return (
       <>
        <Heading/>
        <FolderList setParentFolderId={setParentFolderId}/>
       </>
    );
};


export default MainComponent