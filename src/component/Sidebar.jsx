
import React from "react";

const Sidebar = React.memo(({ onSelect }) => {
  console.log("SIDEBAR RE RENDERS");
  
  return (
    <div className=" top-[4rem] left-0 h-full bg-black pt-5 text-white w-52 shadow-md">
      <div className="p-6">
        <ul className="space-y-4">
          <li
            className="text-lg font-medium group bg-amber-500 text-white hover:bg-amber-400 p-2 rounded-md cursor-pointer flex items-center"
            onClick={() => onSelect("createFolder")}
          >
            CREATE FOLDER
          </li>
          <li
            className="text-lg font-medium group bg-amber-500 text-white hover:bg-amber-400 p-2 rounded-md cursor-pointer flex items-center"
            onClick={() => onSelect("uploadFile")}
          >
            UPLOAD FILE
          </li>
        </ul>
      </div>
    </div>
  );
});

export default React.memo(Sidebar);
