// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



// const ServiceEngineerForm = () => {
//   const [engineers, setEngineers] = useState([]); // List of service engineers
//   const [selectedEngineer, setSelectedEngineer] = useState(''); // Selected engineer
//   const [duNumber, setDuNumber] = useState(''); // DU number input
//   const [duSuggestions, setDuSuggestions] = useState([]); // Suggestions for DU number
//   const [modelNo, setModelNo] = useState(''); // Model number auto-filled
//   const [files, setfiles] = useState([]); // Files based on modelNo
//   const [file,setFileName] = useState("");
//   const [displayNumber,setdisplayNumber] = useState("");
//   const [display,setDisplay] = useState([])
//   console.log(files);
  

//   // Fetch service engineers based on input
//   const handleSubmit = async () =>{
//     const payload = {
//         serviceEngineer: selectedEngineer,
//         duNumber: duNumber,
//         model: modelNo,
//         fileName: file
//       };
//       try {
//         await axios.post('http://192.168.29.65:7000/api/add-du-map', payload,{
//             headers:{
//                 Authorization:`Bearer ${localStorage.getItem("token")}`
//             }
//         });
//         toast.success("DU Map added successfully!", {
//           position: "top-right",
//           autoClose: 2000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,  
//           draggable: true,
//           progress: undefined,
//         });
//       } catch (error) {
//         console.error("Error adding DU map:", error);
//         toast.error("Failed to add DU Map.", {
//           position: "top-right",
//           autoClose: 2000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       }
//   }
//   const fetchEngineers = async (name) => {
//     const response = await axios.get(`http://192.168.29.65:7000/api/serviceEngineer?name=${name}`);
//     setEngineers(response.data);
//   };

//   // Fetch DU suggestions when DU number changes
//   const fetchDuSuggestions = async (duNumber) => {
//     if (duNumber.length >= 2) {
//       const response = await axios.get(`http://192.168.29.65:7000/api/getDUNumber?duNumber=${duNumber}`);
//       setDuSuggestions(response.data); // List of DU numbers
//       setDisplay(response.data.duDisplay)
//     } else {
//       setDuSuggestions([]); // Clear suggestions if input is less than 2 characters
//     }
//   };

//   // Fetch files based on modelNo
//   const fetchFiles = async (modelNo) => {
//     const response = await axios.get(`http://192.168.29.65:7000/api/fileByModelNo?modelNo=${modelNo}`);
//     setfiles(response.data.files); 
//   };

//   useEffect(() => {
//     // Fetch DU suggestions when DU number changes
//     fetchDuSuggestions(duNumber);
//   }, [duNumber]);

//   useEffect(() => {
//     // Fetch files when modelNo is updated
//     if (modelNo) {
//       fetchFiles(modelNo);
//     }
//   }, [modelNo]);

//   const handleEngineerInputChange = (e) => {
//     const name = e.target.value;
//     setSelectedEngineer(name);
//     fetchEngineers(name); // Fetch engineers based on input
//   };
  
//   const handleDUNumberChange = (e) =>{
//     const duNumber = e.target.value;
//     setDuNumber(duNumber)
//     fetchDuSuggestions(duNumber)
//   }

//   // const handleDuSuggestionClick = async (suggestedDu) => {
//   //   setDuNumber(suggestedDu.duNumber); // Set DU number from suggestion
//   //   setModelNo(suggestedDu.modelNo); // Set ModelNo from suggestion
//   //   setDuSuggestions([]); // Clear suggestions after selection
//   // };

//   return (
//     <div className="max-w-md mx-auto border rounded-lg shadow-md bg-white mt-36 p-10">
//       <h3 className="text-lg font-semibold mb-4 mx-auto">DU MAP</h3>

//       {/* Service Engineer Search Field */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Service Engineer:</label>
//         <input
//           type="text"
//           value={selectedEngineer}
//           onChange={handleEngineerInputChange}
//           className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//         />
//         {engineers.length > 0 && (
//           <ul className="border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto">
//             {engineers.map((engineer, index) => (
//               <li 
//                 key={index} 
//                 onClick={() => {
//                   setSelectedEngineer(engineer.name);
//                   setEngineers([]); // Clear engineers suggestions after selection
//                 }} 
//                 className="p-2 hover:bg-gray-100 cursor-pointer"
//               >
//                 {engineer.name}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* DU Number Input Field with Suggestions */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">DU Number:</label>
//         <input
//           type="text"
//           value={duNumber}
//           onChange={handleDUNumberChange}
//           className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//         />
//         {duSuggestions.length > 0 && (
//           <ul className="border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto">
//             {duSuggestions.map((suggestion, index) => (
//               <li 
//                 key={index} 
//                 onClick={() => {
//                     setDuNumber(suggestion.duNumber)
//                     setDuSuggestions([])
//                     setModelNo(suggestion.modelNo)

//                 }} 
//                 className="p-2 hover:bg-gray-100 cursor-pointer"
//               >
//                 {suggestion.duNumber}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       {/* DU Display select */}

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Files:</label>
//             <select 
//             id="duDisplay"
//             value={displayNumber}
//             onChange={(e)=>setdisplayNumber(e.target.value)}
//             >
//                 <option value="" className='' disabled>Select Display</option>
//                 {files.map((file,index)=>(
//                 <option key={index} value={file.fileName}>
//                     {file.fileName}
//                 </option>)             
                    
//                 )}
//             </select>
//       </div>

//       {/* Model No Auto-filled Field */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Model No:</label>
//         <input
//           type="text"
//           value={modelNo}
//           readOnly
//           className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-gray-100 cursor-not-allowed"
//         />
//       </div>

//       {/* File Names Based on ModelNo */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Files:</label>
//             <select 
//             id="fileName"
//             value={file}
//             onChange={(e)=>setFileName(e.target.value)}
//             >
//                 <option value="" className='' disabled>Select File</option>
//                 {files.map((file,index)=>(
//                 <option key={index} value={file.fileName}>
//                     {file.fileName}
//                 </option>)             
                    
//                 )}
//             </select>
//       </div>
//       <button
//         onClick={handleSubmit}
//         className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         Submit
//       </button>
//     <ToastContainer/>
//     </div>
    
//   );

// };

// export default ServiceEngineerForm;


import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ServiceEngineerForm = () => {
  const [engineers, setEngineers] = useState([]); // List of service engineers
  const [selectedEngineer, setSelectedEngineer] = useState(''); // Selected engineer
  const [duNumber, setDuNumber] = useState(''); // DU number input
  const [duSuggestions, setDuSuggestions] = useState([]); // Suggestions for DU number
  const [modelNo, setModelNo] = useState(''); // Model number auto-filled
  const [files, setfiles] = useState([]); // Files based on modelNo
  const [file, setFileName] = useState(""); // Selected file
  const [displayNumber, setDisplayNumber] = useState(""); // Selected display number
  const [display, setDisplay] = useState([]); // duDisplay options array
  const [fileId,setFileId] = useState("")

  console.log("files",files);

  const handleSubmit = async () => {

    if (!selectedEngineer || !duNumber || !modelNo || !file || !displayNumber || !fileId) {
      toast.error("Please fill out all required fields.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return; // Stop form submission if validation fails
    }
  
    console.log("Before submission:", { displayNumber }); // Check this before the payload
    const payload = {
      serviceEngineer: selectedEngineer,
      duNumber: duNumber,
      model: modelNo,
      fileName: file,
      displayNumber: displayNumber ,// Make sure this has a value,
      fileId:fileId
    };
    
    console.log("Payload before submission:", payload);
    
    
    try {
      await axios.post('http://192.168.29.65:7000/api/add-du-map', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      toast.success("DU Map added successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error adding DU map:", error);
      toast.error("Failed to add DU Map.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const fetchEngineers = async (name) => {
    const response = await axios.get(`http://192.168.29.65:7000/api/serviceEngineer?name=${name}`);
    setEngineers(response.data);
  };

  // Fetch DU suggestions when DU number changes
  const fetchDuSuggestions = async (duNumber) => {
    if (duNumber.length >= 2) {
      const response = await axios.get(`http://192.168.29.65:7000/api/getDUNumber?duNumber=${duNumber}`);
      setDuSuggestions(response.data); // List of DU numbers
    } else {
      setDuSuggestions([]); // Clear suggestions if input is less than 2 characters
    }
  };

  // Fetch files based on modelNo
  const fetchFiles = async (modelNo) => {
    const response = await axios.get(`http://192.168.29.65:7000/api/fileByModelNo?modelNo=${modelNo}`);
    setfiles(response.data.files);
    
  };

  useEffect(() => {
    // Fetch DU suggestions when DU number changes
    fetchDuSuggestions(duNumber);
  }, [duNumber]);

  useEffect(() => {
    // Fetch files when modelNo is updated
    if (modelNo) {
      fetchFiles(modelNo);
    }
  }, [modelNo]);

  const handleEngineerInputChange = (e) => {
    const name = e.target.value;
    setSelectedEngineer(name);
    fetchEngineers(name); // Fetch engineers based on input
  };

  const handleDUNumberChange = (e) => {
    const duNumber = e.target.value;
    setDuNumber(duNumber)
    fetchDuSuggestions(duNumber)
  };

  // Handle when a DU suggestion is clicked
  const handleDuSuggestionClick = async (suggestedDu) => {
    setDuNumber(suggestedDu.duNumber); // Set DU number from suggestion
    setModelNo(suggestedDu.modelNo); // Set ModelNo from suggestion
    setDuSuggestions([]); // Clear suggestions after selection
    setDisplay(suggestedDu.duDisplay); // Set duDisplay in state
};


  return (
    <div className="max-w-md mx-auto border rounded-lg shadow-md bg-black mt-36 p-10">
      <h3 className="text-xl text-white flex justify-center font-semibold mb-4 mx-auto">DU MAP</h3>


{/* Service Engineer Search Field */}
<div className="mb-4 relative"> {/* Add relative positioning here */}
  <label className="block text-sm font-medium text-white">Service Engineer:</label>
  <input
    type="text"
    value={selectedEngineer}
    onChange={handleEngineerInputChange}
    className="mt-1 p-2 border border-gray-300 rounded-md text-black w-full"
  />
  {engineers.length > 0 && (
    <ul className="border border-gray-300 bg-gray-200 text-black  rounded-md mt-1 max-h-40 overflow-y-auto z-10 absolute w-full"> {/* Adjusted position */}
      {engineers.map((engineer, index) => (
        <li
          key={index}
          onClick={() => {
            setSelectedEngineer(engineer.name);
            setEngineers([]); // Clear engineers suggestions after selection
          }}
          className="p-2 hover:bg-gray-100 cursor-pointer text-black"
        >
          {engineer.name}
        </li>
      ))}
    </ul>
  )}
</div>



<div className="mb-4 relative">
  <label className="block text-sm font-medium text-white">DU Number:</label>
  <input
    type="text"
    value={duNumber}
    onChange={handleDUNumberChange}
    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
  />
  {duSuggestions.length > 0 && (
    <ul className="border border-gray-500 rounded-md mt-1 max-h-40 overflow-y-auto z-50 absolute bg-gray-200 w-full">
      {duSuggestions.map((suggestion, index) => (
        <li
          key={index}
          onClick={() => handleDuSuggestionClick(suggestion)} // Set DU and ModelNo
          className="p-2 hover:bg-gray-100 cursor-pointer"
        >
          {suggestion.duNumber}
        </li>
      ))}
    </ul>
  )}
</div>

      {/* DU Display select */}
      <div>
        <label className="block text-sm font-medium text-white ">DU Display:</label>
        {/* <select
          id="duDisplay"
          value={displayNumber}
          onChange={(e) => setDisplayNumber(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        > */}
       <select
        id="duDisplay"
        value={displayNumber}
        onChange={(e) => {
        setDisplayNumber(e.target.value);
            console.log("Selected display number:", e.target.value); // Debugging line
         }}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        >
  <option value="" disabled>Select DU Display</option>
  {display.map((displayOption, index) => (
    <option key={index} value={displayOption}>
      {displayOption}
    </option>
  ))}
</select>

      </div>

      {/* Model No Auto-filled Field */}
      <div className="mb-4 mt-4">
        <label className="block text-sm font-medium text-white">Model No:</label>
        <input
          type="text"
          value={modelNo}
          readOnly
          className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* File Names Based on ModelNo */}
      <div>
        <label className="block text-sm font-medium text-white">Files:</label>
        <select
          id="fileName"
          value={file}
          onChange={(e) => {
            const selectedFile = files.find(f => f.fileName === e.target.value)
            setFileName(selectedFile.fileName); // Store file name
            setFileId(selectedFile.fileId); // Store fileId
          }}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="" disabled>Select File</option>
          {files.map((fileOption, index) => (
            <option key={index} value={fileOption.fileName}>
              {fileOption.fileName}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 flex mx-auto bg-amber-500 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
      <ToastContainer />
    </div>
  );
};

export default ServiceEngineerForm;


// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ServiceEngineerForm = () => {
//   const [engineers, setEngineers] = useState([]); // List of service engineers
//   const [selectedEngineer, setSelectedEngineer] = useState(''); // Selected engineer
//   const [duNumber, setDuNumber] = useState(''); // DU number input
//   const [duSuggestions, setDuSuggestions] = useState([]); // Suggestions for DU number
//   const [modelNo, setModelNo] = useState(''); // Model number auto-filled
//   const [files, setFiles] = useState([]); // Files based on modelNo
//   const [file, setFileName] = useState(""); // Selected file name
//   const [fileId, setFileId] = useState(""); // Selected fileId
//   const [displayNumber, setDisplayNumber] = useState(""); // Selected display number
//   const [display, setDisplay] = useState([]); // duDisplay options array

//   const handleSubmit = async () => {
//     console.log("Before submission:", { displayNumber, fileId }); // Debugging before payload
//     const payload = {
//       serviceEngineer: selectedEngineer,
//       duNumber: duNumber,
//       model: modelNo,
//       fileName: file, // file name
//       fileId: fileId, // fileId
//       displayNumber: displayNumber // display number
//     };
    
//     console.log("Payload before submission:", payload);
    
//     try {
//       await axios.post('http://192.168.29.65:7000/api/add-du-map', payload, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`
//         }
//       });
//       toast.success("DU Map added successfully!", {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     } catch (error) {
//       console.error("Error adding DU map:", error);
//       toast.error("Failed to add DU Map.", {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }
//   };

//   // Fetch files based on modelNo
//   const fetchFiles = async (modelNo) => {
//     const response = await axios.get(`http://192.168.29.65:7000/api/fileByModelNo?modelNo=${modelNo}`);
//     setFiles(response.data.files); // Assuming files have fileId and fileName
//   };

//   useEffect(() => {
//     if (modelNo) {
//       fetchFiles(modelNo);
//     }
//   }, [modelNo]);

//   return (
//     <div className="max-w-md mx-auto border rounded-lg shadow-md bg-white mt-36 p-10">
//       {/* Other form inputs */}

//       {/* File Names Based on ModelNo */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Files:</label>
//         <select
//           id="fileName"
//           value={file}
//           onChange={(e) => {
//             const selectedFile = files.find(f => f.fileName === e.target.value);
//             setFileName(selectedFile.fileName); // Store file name
//             setFileId(selectedFile.fileId); // Store fileId
//           }}
//           className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//         >
//           <option value="" disabled>Select File</option>
//           {files.map((fileOption, index) => (
//             <option key={index} value={fileOption.fileName}>
//               {fileOption.fileName}
//             </option>
//           ))}
//         </select>
//       </div>

//       <button
//         onClick={handleSubmit}
//         className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         Submit
//       </button>
//       <ToastContainer />
//     </div>
//   );
// };

// export default ServiceEngineerForm;
