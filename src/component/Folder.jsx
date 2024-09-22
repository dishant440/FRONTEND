// import React, { memo } from "react";
// import Button from "./Button";
// import { useFolder } from "../hooks";

// // Function to format the date
// const formatDate = (isoDate) => {
//     const dateObj = new Date(isoDate);
//     const day = dateObj.getDate();
//     const year = dateObj.getFullYear();
//     const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     const month = monthNames[dateObj.getMonth()];

//     return `${day} ${month} ${year}`;
// };
// const formatTime = (isoDate) => {
//     const dateObj = new Date(isoDate);
    
//     // Extract the hours and minutes
//     let hours = dateObj.getUTCHours();
//     const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');
    
//     // Determine AM/PM suffix
//     const ampm = hours >= 12 ? 'PM' : 'AM';
    
//     // Convert to 12-hour format
//     hours = hours % 12;
//     hours = hours ? hours : 12; // the hour '0' should be '12'
    
//     // Combine hours and minutes
//     return `${hours}:${minutes} ${ampm}`;
// }


// const Folder = memo(({folderName,dateOfCreation,onClick}) => {
//     const formattedTime = formatTime(dateOfCreation);
//     const formattedDate = formatDate(dateOfCreation);

//     return (
//         <div className="folder-div hover:shadow-md border-amber-400 flex flex-row justify-between items-center bg-gray-200 p-4">
//             <div className="left-side flex flex-row items-center gap-2"
//             onClick={onClick}

//             > 
//                 <img src="/folder.png" alt="Folder Icon" />
//                 <span className="font-serif pointer">{folderName}</span>
//             </div>
//             <div className="right-side flex flex-row items-center justify-center gap-8">
//                 <span className="font-bold mr-14">{formattedTime+" IST"}</span>
//                 <span className="font-bold mr-2">{formattedDate}</span>
//                 <span><Button value="EDIT" classname="mb-2" /></span>
//                 <span><Button value="DELETE" classname="mb-2" /></span>
//             </div>
//         </div>
//     );
// });

// export default Folder;


import React, { memo, useState } from "react";
import Button from "./Button";
import { useFolder } from "../hooks"; // Import your hook

// Function to format the date
const formatDate = (isoDate) => {
    const dateObj = new Date(isoDate);
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[dateObj.getMonth()];

    return `${day} ${month} ${year}`;
};

const formatTime = (isoDate) => {
    const dateObj = new Date(isoDate);
    let hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
    return `${hours}:${minutes} ${ampm}`;
};

const Folder = memo(({ folderName, dateOfCreation, folderId, onClick,onClickEdit }) => {
    
    const { editFolder, loading } = useFolder(); // Use the hook
    const [newName, setNewName] = useState(folderName); // State for editing the folder name

    const handleEdit = async () => {
        const newFolderName = prompt("Enter new folder name:", folderName);
        if (newFolderName && newFolderName !== folderName) {
            await editFolder(newFolderName, folderId); // Call the editFolder hook
        }
    };

    const formattedTime = formatTime(dateOfCreation);
    const formattedDate = formatDate(dateOfCreation);

    return (
        <div className="folder-div hover:shadow-md border-amber-400 flex flex-row justify-between items-center bg-gray-200 p-4">
            <div className="left-side flex flex-row items-center gap-2" onClick={onClick}>
                <img src="/folder.png" alt="Folder Icon" />
                <span className="font-serif pointer">{folderName}</span>
            </div>
            <div className="right-side flex flex-row items-center justify-center gap-8">
                <span className="font-bold mr-14">{formattedTime + " IST"}</span>
                <span className="font-bold mr-2">{formattedDate}</span>
                <span>
                    <Button value="EDIT" classname="mb-2" onClick={onClickEdit} />
                </span>
                <span>
                    <Button value="DELETE" classname="mb-2" />
                </span>
            </div>
        </div>
    );
});

export default Folder;
