import React from "react";
import {Navbar,Sidebar} from "../component/Index";


const handleSelection = () =>{

}

const Dashboard = () =>{
 

    return(
        <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex ">
        <div className="flex-none w-48">
          <Sidebar onSelect={handleSelection} />
        </div>
        <div className="flex-1 ">
         
        </div>
      </div>
    </div>
    )
}

export default Dashboard;