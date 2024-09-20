import React from "react";
import Folder from "./Folder";
import Heading from "./Heading"

const MainComponent = () => {
    return (
       <>
        <Heading/>
         <div className="p-10 flex flex-col gap-4">
            <Folder/>
            <Folder/>
            <Folder/>
            <Folder/>
            <Folder/>
            <Folder/>
            <Folder/>
            <Folder/>
        </div>
       </>
    );
};


export default MainComponent