import React from "react";
import { Logo } from "./Logo";
import { User } from "./User";

export const Navbar = () =>{
    return (
        <>
            <div className="navbar bg-black h-16 w-full">
                <div className="flex flex-row justify-between">                    
                    <div><Logo/></div>
                    <div className="my-4 mx-10"><User/></div>
                </div>
            </div>
        </>
    );

}

