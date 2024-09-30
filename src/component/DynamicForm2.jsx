import axios from 'axios';
import { useState, useEffect } from 'react';

const ServiceEngineerForm = () => {
  const [engineers, setEngineers] = useState([]); // List of service engineers
  const [selectedEngineer, setSelectedEngineer] = useState(''); // Selected engineer
  const [duNumber, setDuNumber] = useState(''); // DU number input
  const [duSuggestions, setDuSuggestions] = useState([]); // Suggestions for DU number
  const [modelNo, setModelNo] = useState(''); // Model number auto-filled
  const [files, s] = useState([]); // Files based on modelNo
  const [file,Name] = useState("")
  console.log(files);
  

  // Fetch service engineers based on input
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
    s(response.data.files); 
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
  
  const handleDUNumberChange = (e) =>{
    const duNumber = e.target.value;
    setDuNumber(duNumber)
    fetchDuSuggestions(duNumber)
  }

  const handleDuSuggestionClick = async (suggestedDu) => {
    setDuNumber(suggestedDu.duNumber); // Set DU number from suggestion
    setModelNo(suggestedDu.modelNo); // Set ModelNo from suggestion
    setDuSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="max-w-md mx-auto border rounded-lg shadow-md bg-white mt-36 p-10">
      <h3 className="text-lg font-semibold mb-4 mx-auto">DU MAP</h3>

      {/* Service Engineer Search Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Service Engineer:</label>
        <input
          type="text"
          value={selectedEngineer}
          onChange={handleEngineerInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {engineers.length > 0 && (
          <ul className="border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto">
            {engineers.map((engineer, index) => (
              <li 
                key={index} 
                onClick={() => {
                  setSelectedEngineer(engineer.name);
                  setEngineers([]); // Clear engineers suggestions after selection
                }} 
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {engineer.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* DU Number Input Field with Suggestions */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">DU Number:</label>
        <input
          type="text"
          value={duNumber}
          onChange={handleDUNumberChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {duSuggestions.length > 0 && (
          <ul className="border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto">
            {duSuggestions.map((suggestion, index) => (
              <li 
                key={index} 
                onClick={() => {
                    setDuNumber(suggestion.duNumber)
                    setDuSuggestions([])
                    setModelNo(suggestion.modelNo)

                }} // Fix suggestion clicks
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {suggestion.duNumber}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Model No Auto-filled Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Model No:</label>
        <input
          type="text"
          value={modelNo}
          readOnly
          className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* File Names Based on ModelNo */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Files:</label>
            <select 
            id="fileName"
            value={file}
            onChange={(e)=>Name(e.target.value)}
            >
                <option value="" className='p-4' disabled>Select File</option>
                {files.map((file,index)=>(
                <option key={index} value={file.fileName}>
                    {file.fileName}
                </option>)             
                    
                )}
            </select>
      </div>
    </div>
  );
};

export default ServiceEngineerForm;
