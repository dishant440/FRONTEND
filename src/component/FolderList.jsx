
// import React, { useEffect } from "react";
// import Folder from "./Folder";
// import { customHooks } from "../hooks";
// import File from "./File";

// const FolderList = () => {
//     const { fetchAllContent, loading, error, content } = customHooks();
//     console.log(content);
    

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

//     return (
//         <div className="p-10 flex flex-col gap-4">
//             {content.map(folder => (
//                 <Folder key={folder._id} folderName={folder.folderName} dateOfCreation={folder.dateOfCreation} />
//             ))}
//           {content.Files && content.Files.length > 0 ? (
//             content.Files.map(file => (
//                 <File key={file._id} file={file} />
//             ))
//         ) : (
//             <div>No files available</div>
//         )}
//         </div>
//     );
// }

// export default FolderList;
import React, { useEffect } from "react";
import Folder from "./Folder";
import { customHooks } from "../hooks";
import File from "./File";

const FolderList = () => {
    const { fetchAllContent, loading, error, content } = customHooks();

    useEffect(() => {
        fetchAllContent();
        console.log("fetch content function called");
    }, []);

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
        </div>
    );
};

export default FolderList;
