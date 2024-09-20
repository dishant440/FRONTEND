import React from "react";
import Button from "./Button";

const Folder =  (props) => {
    return(
        <>
            <div className="folder-div hover:shadow-md border-amber-400 flex flex-row justify-between items-center bg-gray-200 p-4 ">
                <div className="left-side  flex flex-row items-center gap-2"> 
                <img src="/folder.png" alt="" />
                <span className="font-serif">FOLDER 1</span>
                </div>
                <div className="right-side flex flex-row items-center justify-center gap-8">
                    <span className="font-bold">20 Sept 2024</span>
                    <span><Button value="EDIT" classname="mb-2"/></span>
                    <span><Button value="DELETE" classname="mb-2"/></span>
                </div>

            </div>
        </>
    )
}

export default Folder