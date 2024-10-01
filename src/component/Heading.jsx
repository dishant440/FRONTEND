import React from "react";

const Heading = ({refreshFolders}) => {
    console.log("HEADING RE RENDERS");
    
    return(
        <>
        <div className="flex flex-col sticky">

        <div className="mx-10 my-2 flex bg-black text-amber-400 border-l-4 border-r-4 border-amber-400 items-center justify-between px-20 py-5">
                <span className="font-bold text-md">NAME</span>
                <div className="flex flex-row justify-right gap-24 mr-48">
               
                <span className="font-bold text-md">CREATED AT</span>
                <span className="font-bold text-md ">DATE</span>
                </div>
               
            </div>
            <div className="flex justify-center m-4">

            
                        </div>
        </div>
        </>
    )
}


export default React.memo(Heading);