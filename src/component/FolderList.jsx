
import React, { useEffect } from "react";
import Folder from "./Folder";
import { customHooks } from "../hooks";
import File from "./File";

const FolderList = () => {
    const { fetchAllContent, loading, error, content } = customHooks();

    useEffect(() => {
        fetchAllContent();
    }, []); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-10 flex flex-col gap-4">
            {content.map(folder => (
                <Folder key={folder._id} folderName={folder.folderName} dateOfCreation={folder.dateOfCreation} />
            ))}
           {content.Files.map(file => (
                <File key={file._id} fileName={file.fileName} dateOfCreation={file.dateOfCreation} />
            ))}
        </div>
    );
}

export default FolderList;
