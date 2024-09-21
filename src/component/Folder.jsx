import React, { memo } from "react";
import Button from "./Button";

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
    
    // Extract the hours and minutes
    let hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');
    
    // Determine AM/PM suffix
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    // Combine hours and minutes
    return `${hours}:${minutes} ${ampm}`;
}


const Folder = memo(({folderName,dateOfCreation,onClick}) => {
    const formattedTime = formatTime(dateOfCreation);
    const formattedDate = formatDate(dateOfCreation);

    return (
        <div className="folder-div hover:shadow-md border-amber-400 flex flex-row justify-between items-center bg-gray-200 p-4"
            onClick={onClick}
        >
            <div className="left-side flex flex-row items-center gap-2"> 
                <img src="/folder.png" alt="Folder Icon" />
                <span className="font-serif">{folderName}</span>
            </div>
            <div className="right-side flex flex-row items-center justify-center gap-8">
                <span className="font-bold mr-14">{formattedTime+" IST"}</span>
                <span className="font-bold mr-2">{formattedDate}</span>
                <span><Button value="EDIT" classname="mb-2" /></span>
                <span><Button value="DELETE" classname="mb-2" /></span>
            </div>
        </div>
    );
});

export default Folder;


