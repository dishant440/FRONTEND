// import React from "react";
// import Folder from "./Folder";

// const FolderList = ({folders}) => {

//     const handleEditFolder = () => {

//     }
//     const handleDeleteFolder = () => {

//     }
//     console.log(folders);
    
//     return(
//         <>
//             <div className="main-div flex flex-col gap-4 ">
//                 {folders && folders.map((folder,index)=>(
//                   <div className="bg-black text-amber-400 py-2">
//                         <Folder key={index}
//                         folder={folder.folderName}
//                         dateOfCreation={folder.dateOfCreation}
//                         onEdit={handleEditFolder} 
//                         onDelete={handleDeleteFolder}
//                         />
//                   </div>
//                 ))}
//             </div>
//         </>
//     )
// }

// export default FolderList;

import React from "react";
import Folder from "./Folder";
import File from "./File";

const FolderList = ({ folders, onFolderClick,files }) => {
    console.log(files);
    
    return (
      <div className="main-div flex flex-col gap-4">
        {folders && folders.map((folder, index) => (
          <div 
            key={index} 
            className="bg-black text-amber-400 py-2 cursor-pointer"
            onClick={() => onFolderClick(folder._id)}  // Handle folder click
          >
            <Folder
              folder={folder.folderName}
              dateOfCreation={folder.dateOfCreation}
            />
            {/* <File>? */}
          </div>
        ))}
        {files && files.map((file,index)=>(
           
            <div key={index}
            className="text-amber-400 py-2 cursor-pointer"
            >
                <File fileName={file.fileName} dateOfCreation={file.dateOfCreation} fileId={file._id}/>

            </div>
            
            
            
        ))

        }
      </div>
    );
  };
  
  export default FolderList;
  