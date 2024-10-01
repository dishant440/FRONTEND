// import React from "react";
// import { useState } from "react";
// import {Input,Button} from "../component/Index"
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// const Signin = () => {

//     const [email,setEmail] = useState("");
//     const [password,setPassword] = useState("");
//     const navigate = useNavigate();
//     const {login} = useAuth();

//     async function handleSubmit(e) {
//       e.preventDefault();
//       const toastId = toast.loading("Signing in...");
    
//       if (!email || !password) {
//         toast.update(toastId, {
//           render: "Fields are required",
//           type: "error",
//           isLoading: false,
//           autoClose: 2000,
//         });
//         return;
//       }
    
//       try {
//         const response = await axios.post("http://192.168.29.65:7000/api/login", {
//           email,
//           password
//         });
        

//         const userData = response.data.user;
//         console.log(userData);
        
//         localStorage.setItem("token", response.data.token);

//         axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
  
//         toast.update(toastId, {
//           render: "Signin successful!",
//           type: "success",
//           isLoading: false,
//           autoClose: 2000,
//         });
    
//         login(userData); 
//         navigate("/admin");
//       } catch (error) {
      
//         toast.update(toastId, {
//           render: error.response?.data?.message || "Error during SIGN IN",
//           type: "error",
//           isLoading: false,
//           autoClose: 2000,
//         });
//       }
//     }
    

//     return(
//        <>
    
//       <div className="flex justify-evenly items-center p-4 mt-44 ">
//         <div className="left bg-white shadow-xl hover:shadow-2xl flex flex-col w-[300px] h-[400px] justify-center items-center border-t-2  mt-5">
//           <div className="mb-6 text-center">
//             <h1 className="text-3xl font-bold">Sign In</h1>           
//           </div>
//           <form onSubmit={handleSubmit}>

//             <div className="mb-5">

//             <Input
//                 Label="EMAIL"
//                 Placeholder="Enter Email"
//                 type="search"
//                 name="username"
//                 Value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 autoComplete="off"
//                 />
//                 </div>
//             <div>

//             <Input
//                 Label="PASSWORD"
//                 Type="password"
//                 Placeholder="*******"
//                 name="password"
//                 Value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />

                
//             </div>
//                 <div className="flex justify-center items-center">
//             <Button Type="submit" value="LOG IN" classname="w-full "/>

//                 </div>
//           </form>
//         </div>
//         <div className="right flex flex-col w-[400px] gap-y-3 mt-50">
//          <img src="czar.svg" alt="" />
         
//         </div>
//       </div>
//      <ToastContainer position="top-center"/>
//     </>
//     )
// }



// export default Signin;
import React, { useState } from "react";
import { Input, Button } from "../component/Index";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

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
            const response = await axios.post("http://192.168.29.65:7000/api/login", {
                email,
                password
            });

            const userData = response.data.user;
            console.log(userData);

            localStorage.setItem("token", response.data.token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

            toast.update(toastId, {
                render: "Signin successful!",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });

            login(userData);
            navigate("/admin");
        } catch (error) {
            toast.update(toastId, {
                render: error.response?.data?.message || "Error during SIGN IN",
                type: "error",
                isLoading: false,
                autoClose: 2000,
            });
        }
    }

    const handleForgotPassword = () => {
        navigate("/sendResetLink"); // Navigate to the password reset link page
    };

    return (
        <>
            <div className="flex justify-evenly items-center p-4 mt-44">
                <div className="left bg-white shadow-xl hover:shadow-2xl flex flex-col w-[300px] h-[400px] justify-center items-center border-t-2 mt-5">
                    <div className="mb-6 text-center">
                        <h1 className="text-3xl font-bold">Sign In</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <Input
                                Label="EMAIL"
                                Placeholder="Enter Email"
                                type="search"
                                name="username"
                                Value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <Input
                                Label="PASSWORD"
                                Type="password"
                                Placeholder="*******"
                                name="password"
                                Value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-center items-center">
                            <Button Type="submit" value="LOG IN" classname="w-full " />
                        </div>
                        {/* Add Forgot Password Link */}
                        <div className="mt-4 text-center">
                            <button
                                type="button"
                                className="text-black underline hover:text-blue-700"
                                onClick={handleForgotPassword}
                            >
                                Forgot Password?
                            </button>
                        </div>
                    </form>
                </div>
                <div className="right flex flex-col w-[400px] gap-y-3 mt-50">
                    <img src="czar.svg" alt="" />
                </div>
            </div>
            <ToastContainer position="top-center" />
        </>
    );
};

export default Signin;
