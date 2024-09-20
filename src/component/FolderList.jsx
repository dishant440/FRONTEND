
import React, { useEffect } from "react";
import Folder from "./Folder";
import { customHooks } from "../hooks";

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
                <Folder 
                    key={folder._id} 
                    folderName={folder.folderName} 
                    dateOfCreation={folder.dateOfCreation} 
                    
                />
            ))}
        </div>
    );
}

export default FolderList;
