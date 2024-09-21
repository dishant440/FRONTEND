
// import React, { useEffect } from "react";
// import Folder from "./Folder";
// import { customHooks } from "../hooks";
// import File from "./File";
// import { useNavigate } from "react-router-dom";

// const FolderList = () => {
//     const navigate = useNavigate();
//     const { fetchAllContent, loading, error, content } = customHooks();

//     useEffect(() => {
//         fetchAllContent();
//         console.log("fetch content function called");
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     const handleFolderClick = (id) =>{
//         navigate(`/content/${id}`)
//     }

//     return (
//         <div className="p-10 flex flex-col gap-4">
//             {/* Render Folders */}
//             {content.Folders && content.Folders.length > 0 ? (
//                 content.Folders.map(folder => (
//                     <Folder
//                         key={folder._id}
//                         folderName={folder.folderName}
//                         dateOfCreation={folder.dateOfCreation}
//                         onClick = {handleFolderClick}
//                     />
//                 ))
//             ) : (
//                 <div>No folders available</div>
//             )}

//             {/* Render Files */}
//             {content.Files && content.Files.length > 0 ? (
//                 content.Files.map(file => (
//                     <File key={file._id} file={file} fileName={file.fileName} dateOfCreation={file.dateOfCreation} />
//                 ))
//             ) : (
//                 <div>No files available</div>
//             )}
//         </div>
//     );
// };

// export default FolderList;
import React, { useEffect, useState } from "react";
import Folder from "./Folder";
import { customHooks } from "../hooks";
import File from "./File";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FolderList = () => {
    const [subContent, setSubContent] = useState(null);  // State for subfolder content
    const navigate = useNavigate();
    const { fetchAllContent, loading, error, content } = customHooks();

    useEffect(() => {
        fetchAllContent();
        console.log("fetch content function called");
    }, []);

    const handleFolderClick = async (id) => {
        try {
            const response = await axios.get(`http://localhost:7000/api/${id}`);
            setSubContent(response.data);  
        } catch (err) {
            console.error("Error fetching folder content", err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-10 flex flex-col gap-4">
            {/* Render Folders */}
            {content.Folders && content.Folders.length > 0 ? (
                content.Folders.map(folder => (
                    <Folder
                        key={folder._id}
                        folderName={folder.folderName}
                        dateOfCreation={folder.dateOfCreation}
                        onClick={() => handleFolderClick(folder._id)} // Handle folder click
                    />
                ))
            ) : (
                <div>No folders available</div>
            )}

            {/* Render Files */}
            {content.Files && content.Files.length > 0 ? (
                content.Files.map(file => (
                    <File key={file._id} file={file} fileName={file.fileName} dateOfCreation={file.dateOfCreation} />
                ))
            ) : (
                <div>No files available</div>
            )}

            {/* Render Subfolders and Files of the clicked folder */}
            {subContent && (
                <div>
                    <h2>Subfolders and Files</h2>

                    {/* Render Subfolders */}
                    {subContent.Folders && subContent.Folders.length > 0 ? (
                        subContent.Folders.map(folder => (
                            <Folder
                                key={folder._id}
                                folderName={folder.folderName}
                                dateOfCreation={folder.dateOfCreation}
                                onClick={() => handleFolderClick(folder._id)}  // Handle subfolder click recursively
                            />
                        ))
                    ) : (
                        <div>No subfolders available</div>
                    )}

                    {/* Render Subfiles */}
                    {subContent.Files && subContent.Files.length > 0 ? (
                        subContent.Files.map(file => (
                            <File key={file._id} file={file} fileName={file.fileName} dateOfCreation={file.dateOfCreation} />
                        ))
                    ) : (
                        <div>No files available</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FolderList;
