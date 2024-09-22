import React from "react";
import { Logo,User } from "./Index";

const Navbar = () =>{
    console.log("NAVBAR RE RENDER");
    
    return (
        <>
            <div className="navbar bg-black h-20 w-full  border-amber-400">
                <div className="flex flex-row justify-between">                    
                    <div><Logo/></div>
                    <div className="my-6 mx-10"><User/></div>
                </div>
            </div>
        </>
    );

}

export default React.memo(Navbar);