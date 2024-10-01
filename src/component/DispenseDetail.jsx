import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import Error from './Error';

const DispenserDetails = memo(() => {
  const [dispenserData, setDispenserData] = useState([]);

  useEffect(() => {
    const fetchDispenserData = async () => {
      try {
        const response = await axios.get('http://192.168.29.65:7000/api/getDUData', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        console.log(response.data);
        setDispenserData(response.data);
      } catch (error) {
        console.error("Error fetching dispenser data:", error);
      }
    };

    fetchDispenserData();
  }, []);

  return (
    <div className="dispenser-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 ">
      {dispenserData.length === 0 ? (
        <div className="flex"><Error message="NO DATA AVAILABLE" /></div>
      ) : (
        dispenserData.map((dispenser) => (
          <div key={dispenser.duNumber} className="dispenser-card rounded-xl shadow-lg p-6 bg-black text-white border border-gray-100 transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <div className="left-side">
              <h3 className="font-bold text-2xl text-amber-400 mb-4">{dispenser.model}</h3>
              <div className="space-y-2">
                <p className=""><strong>DU Number:</strong> {dispenser.duNumber}</p>
                <p className=""><strong>Tender ID:</strong> {dispenser.tenderId}</p>
                <p className=""><strong>Display Number:</strong> {dispenser.displayNumber}</p>
                <p className=""><strong>DU Display:</strong> {dispenser.duDisplay.join(", ")}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
});

export default DispenserDetails;
