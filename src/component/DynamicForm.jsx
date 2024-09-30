import { useState, useEffect } from "react";
import axios from "axios";

const YourComponent = () => {
    const [engineerInput, setEngineerInput] = useState("");
    const [engineers, setEngineers] = useState([]);
    const [selectedEngineer, setSelectedEngineer] = useState("");
    const [duInput, setDuInput] = useState("");
    const [duNumbers, setDUNumbers] = useState([]);
    const [modelNo, setModelNo] = useState("");
    const [fileNames, setFileNames] = useState([]);
    const [fileName, setFileName] = useState("");

    // Fetch engineers based on input
    useEffect(() => {
        const fetchEngineers = async () => {
            if (engineerInput.length > 0 && !engineers.some(engineer => engineer.name === engineerInput)) {
                try {
                    const response = await axios.get(`http://192.168.29.65:7000/api/serviceEngineer?name=${engineerInput}`);
                    setEngineers(response.data);
                } catch (error) {
                    console.error("Error fetching engineers:", error);
                }
            } else {
                setEngineers([]);
            }
        };

        const debounceFetch = setTimeout(fetchEngineers, 300);
        return () => clearTimeout(debounceFetch);
    }, [engineerInput],[]);

    // Fetch DU Numbers based on input
    useEffect(() => {
        const fetchDUNumbers = async () => {
            if (duInput.length > 0) {
                try {
                    const response = await axios.get(`http://192.168.29.65:7000/api/getDUNumber?duNumber=${duInput}`);
                    setDUNumbers(response.data);
                    if (response.data.length > 0) {
                        setModelNo(response.data[0].modelNo);
                    } else {
                        setModelNo(""); 
                    }
                } catch (error) {
                    console.error("Error fetching DU numbers:", error);
                }
            } else {
                setDUNumbers([]);
                setModelNo("Model Not available");
            }
        };

        const debounceFetch = setTimeout(fetchDUNumbers, 300);
        return () => clearTimeout(debounceFetch);
    }, [duInput]);

    const handleDUNumberSelect = (duNumber, model) => {
        setDuInput(duNumber);
        // setDUNumbers()
        setModelNo(model); 
        setDUNumbers([]); 
    };

    // Fetch file names based on modelNo
    useEffect(() => {
        const fetchFileNames = async () => {
            if (modelNo) {
                try {
                    const token = localStorage.getItem("token");
                    const response = await axios.get(`http://192.168.29.65:7000/api/fileByModelNo/${modelNo}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (response.data && response.data.files) {
                        setFileNames(response.data.files);
                        setFileName(response.data.files[0].fileName);
                    } else {
                        setFileNames([]);
                        setFileName("");
                    }
                } catch (error) {
                    console.error("Error fetching file names:", error);
                }
            } else {
                setFileNames([]);
                setFileName("");
            }
        };

        fetchFileNames();
    }, [modelNo]);

    const handleEngineerSelect = (engineer) => {
        setEngineerInput(engineer.name);
        setSelectedEngineer(engineer.name);
        setEngineers([]);
    };

    return (
      <>
            <form className="flex flex-row gap-4 p-4">
            {/* Input for Service Engineer with Suggestions */}
            <div className="flex-1">
                <label htmlFor="serviceEngineer" className="block mb-1 font-bold">Service Engineer</label>
                <input
                    id="serviceEngineer"
                    type="text"
                    placeholder="ENTER SERVICE ENGINEER"
                    value={engineerInput}
                    onChange={(e) => {
                        setEngineerInput(e.target.value);
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                {/* Show suggestions for engineers */}
                {engineers.length > 0 && (
                    <ul className="bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-auto">
                        {engineers.map((engineer, index) => (
                            <li
                                key={index}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleEngineerSelect(engineer)}
                            >
                                {engineer.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Input for DU Number with Suggestions */}
            <div className="flex-1">
                <label htmlFor="duNumber" className="block mb-1 font-bold">DU Number</label>
                <input
                    id="duNumber"
                    type="text"
                    value={duInput}
                    placeholder="ENTER DU NUMBER"
                    onChange={(e) => setDuInput(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                {/* Show suggestions for DU Numbers */}
                {duNumbers.length > 0 && (
                    <ul className="bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-auto">
                        {duNumbers.map((du, index) => (
                            <li
                                key={index}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleDUNumberSelect(du.duNumber, du.modelNo)}
                            >
                                {du.duNumber}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Model No (Auto-filled) */}
            <div className="flex-1">
                <label htmlFor="modelNo" className="block mb-1 font-bold">Model No</label>
                <input
                    id="modelNo"
                    type="text"
                    value={modelNo}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            {/* FileName (Converted to Select) */}
            <div className="flex-1">
                <label htmlFor="fileName" className="block mb-1 font-bold">File</label>
                <select
                    id="fileName"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="" disabled>Select a file</option>
                    {fileNames.map((file, index) => (
                        <option key={index} value={file.fileName}>
                            {file.fileName}
                        </option>
                    ))}
                </select>
            </div>
        </form>
        <button 
        className="flex mx-auto justify-center mt-36 bg-black text-white font-bold px-4 py-2 rounded"
        onClick={() => console.log()}
        >
          ASSIGN
        </button>
      </>
        
    );
};

export default YourComponent;
