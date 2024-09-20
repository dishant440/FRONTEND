import React from "react";
import { Logo,User } from "./Index";

const Navbar = () =>{
    return (
        <>
            <div className="navbar bg-black h-20 w-full border-b-4 border-amber-400">
                <div className="flex flex-row justify-between">                    
                    <div><Logo/></div>
                    <div className="my-6 mx-10"><User/></div>
                </div>
            </div>
        </>
    );

}

export default Navbar;