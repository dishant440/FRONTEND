import React from 'react';

 const SideBar = ({ onSelect }) => {
  return (
    <div
      className="fixed top-[4rem] left-0 h-full bg-black pt-5 mt-4 text-white text-white w-52 shadow-md"
    >
      <div className="p-6">
        <ul className="space-y-4">
        <li
            className="text-lg font-medium group bg-amber-500 text-white hover:bg-amber-400 active:bg-amber-600 active:scale-95 active:shadow-inner p-2 rounded-md cursor-pointer flex items-center"
            onClick={() => onSelect('')}
        >
            
            CREATE FOLDER
          </li>
          <li
            className="text-lg font-medium group bg-amber-500 text-white hover:bg-amber-400 active:bg-amber-600 active:scale-95 active:shadow-inner p-2 rounded-md cursor-pointer flex items-center"
            onClick={() => onSelect('')}
          >
            
            UPLOAD FILE
          </li>
          
        </ul>
      </div>
    </div>
  );
}



export default SideBar;