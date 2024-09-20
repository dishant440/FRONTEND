import React from "react";
import { MainComponent, Navbar, Sidebar } from "../component/Index";

const handleSelection = () => {
    // Your selection logic here
}

const Dashboard = () => {
    
  return (
      <div className="flex flex-col h-screen">
          <Navbar />
          <div className="flex flex-1">
              <div className="flex-none">
                  <Sidebar onSelect={handleSelection} />
              </div>
              <div className="flex-1 bg-gray-100">
                  <MainComponent />
              </div>
          </div>
      </div>
  );
};


export default Dashboard;
