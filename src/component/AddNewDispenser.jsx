// import React, { useState } from "react";

// const AddNewDispenser = () => {
//   const [duNumber, setduNumber] = useState("");
//   const [duDisplay, setduDisplay] = useState([]); // Array for storing display numbers
//   const [model, setModelNo] = useState("");
//   const [displayNumber, setDisplayNumber] = useState(0); // Maximum allowed display numbers
//   const [newDisplay, setNewDisplay] = useState(""); // To hold the current display number input

//   // Function to handle adding display number
//   const handleAddDisplay = (e) => {
//     e.preventDefault();

//     // Ensure we do not exceed the entered displayNumber limit
//     if (duDisplay.length < displayNumber && newDisplay) {
//       setduDisplay([...duDisplay, newDisplay]); // Add the new display number
//       setNewDisplay(""); // Reset the input field
//     }
//   };

//   const handleRemoveDisplay = (index) => {
//     setduDisplay(duDisplay.filter((_, i) => i !== index)); // Remove display at specific index
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic
//     console.log({
//       duNumber,
//       model,
//       duDisplay,
//     });
//     // Reset form
//     setduNumber("");
//     setModelNo("");
//     setDisplayNumber(0);
//     setduDisplay([]);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-8 mt-10 bg-white shadow-lg rounded-md max-w-lg mx-auto">
//       <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add New Dispenser</h2>
      
//       {/* DU Number */}
//       <div className="mb-4">
//         <label className="block text-sm font-bold mb-2 text-gray-600">
//           DU Number:
//         </label>
//         <input
//           type="text"
//           value={duNumber}
//           onChange={(e) => setduNumber(e.target.value)}
//           className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />
//       </div>

//       {/* Model */}
//       <div className="mb-4">
//         <label className="block text-sm font-bold mb-2 text-gray-600">
//           Model:
//         </label>
//         <input
//           type="text"
//           value={model}
//           onChange={(e) => setModelNo(e.target.value)}
//           className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />
//       </div>

//       {/* Number of Displays */}
//       <div className="mb-4">
//         <label className="block text-sm font-bold mb-2 text-gray-600">
//           Number of Displays:
//         </label>
//         <input
//           type="number"
//           value={displayNumber}
//           onChange={(e) => setDisplayNumber(Number(e.target.value))}
//           min={1}
//           className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />
//       </div>

//       {/* Add Display Numbers */}
//       {duDisplay.length < displayNumber && (
//         <div className="mb-4">
//           <label className="block text-sm font-bold mb-2 text-gray-600">
//             Add Display Number:
//           </label>
//           <div className="flex gap-4">
//             <input
//               type="text"
//               value={newDisplay}
//               onChange={(e) => setNewDisplay(e.target.value)}
//               className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               type="button"
//               onClick={handleAddDisplay}
//               className="px-4 py-2 bg-black text-white font-semibold rounded-md transition"
//             >
//               Add
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Display Added Numbers */}
//       <ul className="mb-4 space-y-2">
//         {duDisplay.map((display, index) => (
//           <li key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded-md">
//             <span>{display}</span>
//             <button
//               type="button"
//               onClick={() => handleRemoveDisplay(index)}
//               className="px-2 py-1 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
//             >
//               Remove
//             </button>
//           </li>
//         ))}
//       </ul>

//       {/* Submit Button */}
//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="px-6 py-3 bg-amber-500 text-white font-bold rounded-md hover:bg-amber-400 transition"
//         >
//           CREATE DISPENSER
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AddNewDispenser;


import React, { useState } from "react";
import useCreateDispenser from "../hooks/useCreateDispenser"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNewDispenser = () => {
  const [duNumber, setduNumber] = useState("");
  const [duDisplay, setduDisplay] = useState([]); // Array for storing display numbers
  const [model, setModelNo] = useState("");
  const [displayNumber, setDisplayNumber] = useState(0); // Maximum allowed display numbers
  const [newDisplay, setNewDisplay] = useState(""); // To hold the current display number input
  const [tenderId, setTenderId] = useState("")

  const { createDispenser, loading, error } = useCreateDispenser();

  // Function to handle adding display number
  const handleAddDisplay = (e) => {
    e.preventDefault();

    // Ensure we do not exceed the entered displayNumber limit
    if (duDisplay.length < displayNumber && newDisplay) {
      setduDisplay([...duDisplay, newDisplay]); // Add the new display number
      setNewDisplay(""); // Reset the input field
    }
  };

  const handleRemoveDisplay = (index) => {
    setduDisplay(duDisplay.filter((_, i) => i !== index)); // Remove display at specific index
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dispenserData = {
      duNumber,
      model,
      duDisplay,
      displayNumber,
      tenderId
    };

    await createDispenser(dispenserData); 

  

  };

  return (
    <>
    <form onSubmit={handleSubmit} className="p-8 bg-black text-white shadow-lg rounded-md max-w-lg mx-auto grid gap-4 my-36">
      <h2 className="text-2xl flex mx-auto font-semibold mb-6">ADD NEW DISPENSER</h2>
      
      {/* DU Number */}
      <div className="grid grid-cols-1 gap-2">
        <label className="block text-sm font-bold ">DU Number:</label>
        <input
          type="text"
          placeholder="ENTER DU NUMBER"
          value={duNumber}
          onChange={(e) => setduNumber(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  text-black"
          required
        />
      </div>

      {/* Model */}
      <div className="grid grid-cols-1 gap-2"> 
        <label className="block text-sm font-bold ">Model:</label>
        <input
          type="text"
          placeholder="ENTER MODEL (eg MODEL-1234)"
          value={model}
          onChange={(e) => setModelNo(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  text-black"
          required
        />
      </div>
       {/* Tender Id */}
       <div className="grid grid-cols-1 gap-2">
        <label className="block text-sm font-bold ">Tender Id:</label>
        <input
          type="text"
          placeholder="ENTER TENDER ID"
          value={tenderId}
          onChange={(e) => setTenderId(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  text-black"
          required
        />
      </div>

      {/* Number of Displays */}
      <div className="grid grid-cols-1 gap-2">
        <label className="block text-sm font-bold ">Number of Displays:</label>
        <input
          type="number"
          placeholder="ENTER NO OF DISPLAY IN DU"
          value={displayNumber}
          onChange={(e) => setDisplayNumber(Number(e.target.value))}
          min={1}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          required
        />
      </div>

      {/* Add Display Numbers */}
      {duDisplay.length < displayNumber && (
        <div className="grid grid-cols-1 gap-2">
          <label className="block text-sm font-bold ">Add Display Number:</label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={newDisplay}
              onChange={(e) => setNewDisplay(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <button
              type="button"
              onClick={handleAddDisplay}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition text-black"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Display Added Numbers */}
      <div className="grid grid-cols-2 gap-4">
        {duDisplay.map((display, index) => (
          <div key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded-md text-black">
            <span >{display}</span>
            <button
              type="button"
              onClick={() => handleRemoveDisplay(index)}
              className="px-2 py-1 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        {/* <button
          type="submit"
          className="px-6 py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition"
        >
          ADD DISPENSER
        </button> */}
         <button type="submit" disabled={loading} className="px-6 py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition">
          {loading ? "Creating..." : "ADD DISPENSER"}
      </button>
      </div>
    </form>
    <ToastContainer position="top-center"/>
    </>
  );
};

export default AddNewDispenser;



// import React, { useState } from "react";

// const AddNewDispenser = () => {
//   const [duNumber, setduNumber] = useState("");
//   const [duDisplay, setduDisplay] = useState([]); // Array for storing display numbers
//   const [model, setModelNo] = useState("");
//   const [displayNumber, setDisplayNumber] = useState(0); // Maximum allowed display numbers
//   const [newDisplay, setNewDisplay] = useState(""); // To hold the current display number input

//   // Function to handle adding display number
//   const handleAddDisplay = (e) => {
//     e.preventDefault();
    
//     // Ensure we do not exceed the entered displayNumber limit
//     if (duDisplay.length < displayNumber && newDisplay) {
//       setduDisplay([...duDisplay, newDisplay]); // Add the new display number
//       setNewDisplay(""); // Reset the input field
//     }
//   };

//   const handleRemoveDisplay = (index) => {
//     setduDisplay(duDisplay.filter((_, i) => i !== index)); // Remove display at specific index
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic
//     console.log({
//       duNumber,
//       model,
//       duDisplay,
//     });
//     // Reset form
//     setduNumber("");
//     setModelNo("");
//     setDisplayNumber(0);
//     setduDisplay([]);
//   };

//   return (
//     <div className="p-8 grid grid-cols-2 gap-8">
//       {/* Left Side: Form */}
//       <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-md p-6 grid gap-4">
//         <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Dispenser</h2>
        
//         {/* DU Number */}
//         <div className="grid gap-2">
//           <label className="block text-sm font-bold text-gray-600">DU Number:</label>
//           <input
//             type="text"
//             value={duNumber}
//             onChange={(e) => setduNumber(e.target.value)}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         {/* Model */}
//         <div className="grid gap-2">
//           <label className="block text-sm font-bold text-gray-600">Model:</label>
//           <input
//             type="text"
//             value={model}
//             onChange={(e) => setModelNo(e.target.value)}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         {/* Number of Displays */}
//         <div className="grid gap-2">
//           <label className="block text-sm font-bold text-gray-600">Number of Displays:</label>
//           <input
//             type="number"
//             value={displayNumber}
//             onChange={(e) => setDisplayNumber(Number(e.target.value))}
//             min={1}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         {/* Add Display Numbers */}
//         {duDisplay.length < displayNumber && (
//           <div className="grid gap-2">
//             <label className="block text-sm font-bold text-gray-600">Add Display Number:</label>
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 value={newDisplay}
//                 onChange={(e) => setNewDisplay(e.target.value)}
//                 className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 type="button"
//                 onClick={handleAddDisplay}
//                 className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
//               >
//                 Add
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="px-6 py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition"
//         >
//           Submit Dispenser
//         </button>
//       </form>

//       {/* Right Side: Display Entered Values */}
//       <div className="bg-gray-100 shadow-lg rounded-md p-6">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">Entered Values</h2>
//         <div className="grid gap-4">
//           <div>
//             <strong>DU Number:</strong> <span>{duNumber || "Not entered"}</span>
//           </div>
//           <div>
//             <strong>Model:</strong> <span>{model || "Not entered"}</span>
//           </div>
//           <div>
//             <strong>Number of Displays:</strong> <span>{displayNumber || "Not entered"}</span>
//           </div>
//           <div>
//             <strong>Display Numbers:</strong>
//             <ul className="list-disc pl-4">
//               {duDisplay.length > 0 ? (
//                 duDisplay.map((display, index) => (
//                   <li key={index} className="flex justify-between items-center gap-4">
//                     <span>{display}</span>
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveDisplay(index)}
//                       className="px-2 py-1 text-sm bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
//                     >
//                       Remove
//                     </button>
//                   </li>
//                 ))
//               ) : (
//                 <li>No display numbers added</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddNewDispenser;
