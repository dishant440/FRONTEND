import React from "react";
import { useState } from "react";
import {Input,Button} from "../component/Index"

const Signup = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    return(
       <>
      <div className="flex justify-evenly items-center p-4 mt-44 ">
        <div className="left bg-white shadow-xl hover:shadow-2xl flex flex-col w-[300px] h-[400px] justify-center items-center border mt-5">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold">Sign In</h1>
            
          
          </div>
          <form >

            <div className="mb-5">

            <Input
                Label="EMAIL"
                Placeholder="Enter Email"
                name="email"
                Value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                </div>
            <div>

            <Input
                Label="PASSWORD"
                Placeholder="*******"
                name="password"
                Value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button Type="submit" value="LOG IN" />
          </form>
        </div>
        <div className="right flex flex-col w-[400px] gap-y-3 mt-50">
         <img src="czar.svg" alt="" />
         
        </div>
      </div>
     
    </>
    )
}

export default Signup;