// import React, { memo } from "react";
// import Button from "./Button";

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



// const File = memo((props) => {
//     const formattedTime = formatTime(props.dateOfCreation);
//     const formattedDate = formatDate(props.dateOfCreation);
//     console.log("FILE RE RENDERS");

//     const handleDeleteClick = () => {
//         alert("Button clicked"); // Check if this alert shows up
//         if (onClick) {
//             props.onClick(); // Call the onClick function passed from the parent
//         }
//     };

//     return (
//         <div className="folder-div hover:shadow-md border-amber-400 flex flex-row justify-between items-center bg-gray-200 p-4">
//             <div className="left-side flex flex-row items-center gap-2"> 
//                 <img src="/fileIcon.png" alt="File" />
//                 <span className="font-serif">{props.fileName}</span>
//             </div>
//             <div className="right-side flex flex-row items-center justify-center gap-8">
//                 <span className="font-bold mr-14">{formattedTime+" IST"}</span>
//                 <span className="font-bold mr-2">{formattedDate}</span>
//                 <span><Button  value="EDIT" classname="mb-2" /></span>
//                 <span><Button onClick={handleDeleteClick} value="DELETE" classname="mb-2" /></span>
//             </div>
//         </div>
//     );
// });

// export default File;


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

// Function to format the time
const formatTime = (isoDate) => {
    const dateObj = new Date(isoDate);
    
    let hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minutes} ${ampm}`;
};

const File = memo(({ fileName, dateOfCreation, onClick }) => {
    const formattedTime = formatTime(dateOfCreation);
    const formattedDate = formatDate(dateOfCreation);

    // Function to handle the delete button click
    const handleDeleteClick = () => {
       
        if (onClick) {
            onClick(); // Call the onClick function passed from the parent
        }
    };

    return (
        <div className="folder-div hover:shadow-md border-amber-400 flex flex-row justify-between items-center bg-gray-200 p-4">
            <div className="left-side flex flex-row items-center gap-2"> 
                <img src="/fileIcon.png" alt="File" />
                <span className="font-serif">{fileName}</span>
            </div>
            <div className="right-side flex flex-row items-center justify-center gap-8">
                <span className="font-bold mr-14">{formattedTime + " IST"}</span>
                <span className="font-bold mr-2">{formattedDate}</span>
                <span><Button value="EDIT" classname="mb-2" /></span>
                <span>
                    <Button onClick={handleDeleteClick} value="DELETE" classname="mb-2" />
                </span>
            </div>
        </div>
    );
});

export default File;


