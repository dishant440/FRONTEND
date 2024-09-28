
import React from "react";

const Sidebar = React.memo(({ onSelect }) => {
  console.log("SIDEBAR RE RENDERS");
  
  return (
    <div className=" top-[4rem] left-0 h-full bg-black pt-5 text-white w-54 shadow-md ">
      <div className="p-6">
        <ul className="space-y-4">
        <li
            className="text-md font-bold group bg-amber-500 font-serif text-white hover:bg-amber-400 p-2 rounded-md cursor-pointer flex justify-center items-center"
            onClick={() => onSelect("showHome")}
          >
            HOME
          </li>
          <li
            className="text-md font-serif font-bold group bg-amber-500 text-white hover:bg-amber-400 p-2 rounded-md cursor-pointer flex justify-center items-center"
            onClick={() => onSelect("createFolder")}
          >
            CREATE FOLDER
          </li>
          <li
            className="text-md font-serif font-bold group bg-amber-500 text-white hover:bg-amber-400 p-2 rounded-md cursor-pointer flex justify-center"
            onClick={() => onSelect("uploadFile")}
          >
            UPLOAD FILE
          </li>
          <li
            className="text-md font-serif font-bold group bg-amber-500 text-white hover:bg-amber-400 p-2 rounded-md cursor-pointer flex items-center"
            onClick={() => onSelect("addServiceEngineer")}
          >
            ADD SERVICE ENGINEER
          </li>
          <li
            className="text-md font-serif font-bold group bg-amber-500 text-white hover:bg-amber-400 p-2 rounded-md cursor-pointer flex items-center"
            onClick={() => onSelect("showServiceEngineer")}
          >
            SHOW SERVICE ENGINEER
          </li>
          <li
            className="text-md font-serif font-bold group bg-amber-500 text-white hover:bg-amber-400 p-2 rounded-md cursor-pointer flex justify-center items-center"
            onClick={() => onSelect("duMap")}
          >
            DU MAP
          </li>
          <li
            className="text-md font-serif font-bold group bg-amber-500 text-white hover:bg-amber-400 p-2 rounded-md cursor-pointer flex justify-center items-center"
            onClick={() => onSelect("duMap")}
          >
            ADD DISPENSER
          </li>
          
        </ul>
      </div>
    </div>
  );
});

export default React.memo(Sidebar);
