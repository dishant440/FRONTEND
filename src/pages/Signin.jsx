import React from "react";
import { useState } from "react";
import {Input,Button} from "../component/Index"
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Signin = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const {login} = useAuth();

    async function handleSubmit(e) {
      e.preventDefault();
      const toastId = toast.loading("Signing in...");
    
      if (!email || !password) {
        toast.update(toastId, {
          render: "Fields are required",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
        return;
      }
    
      try {
        const response = await axios.post("http://localhost:7000/api/login", {
          email,
          password
        });
        

    
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
  
        toast.update(toastId, {
          render: "Signin successful!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
    
        login(); 
        navigate("/");
      } catch (error) {
      
        toast.update(toastId, {
          render: error.response?.data?.message || "Error during SIGN IN",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    }
    

    return(
       <>
    
      <div className="flex justify-evenly items-center p-4 mt-44 ">
        <div className="left bg-white shadow-xl hover:shadow-2xl flex flex-col w-[300px] h-[400px] justify-center items-center border-t-2  mt-5">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold">Sign In</h1>           
          </div>
          <form onSubmit={handleSubmit}>

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
                <div className="flex justify-center items-center ">
            <Button Type="submit" value="LOG IN" classname="w-full"/>

                </div>
          </form>
        </div>
        <div className="right flex flex-col w-[400px] gap-y-3 mt-50">
         <img src="czar.svg" alt="" />
         
        </div>
      </div>
     <ToastContainer position="top-center"/>
    </>
    )
}

export default Signin;