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

const File = memo(({ fileName, dateOfCreation , fileId}) => {
    const formattedTime = formatTime(dateOfCreation);
    const formattedDate = formatDate(dateOfCreation);

    return (
        <div className="flex items-center justify-between bg-black p-4 py-4">
 
        <div className="flex items-center flex-grow">
          <img src={`/fileIcon.png`} alt="Folder Icon" className="w-8 h-8 mr-2" />
          <span className="font-semibold text-lg mx-4">{fileName}</span>
        </div>
  
    
        <div className="flex flex-row items-end gap-4">
          <div className="text-md mx-8 font-bold mb-1">
            {new Date(dateOfCreation).toLocaleDateString()}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(fileId)}
              className="bg-amber-500 text-white py-1 px-3 mx-4 font-bold rounded hover:bg-amber-400"
            >
                EDIT
            </button>
            <button
              onClick={() => onDelete(fileId)}
              className="bg-red-500 text-white py-1 px-3 font-bold rounded hover:bg-red-600"
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    );
});

export default File;


