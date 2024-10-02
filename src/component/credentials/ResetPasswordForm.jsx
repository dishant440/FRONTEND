import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const RequestResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const navigate = useNavigate()

  const toastId = toast.loading("Verifying Please Wait ...")
  const handleResetPassword = async () => {
    try {
      await axios.post('http://192.168.29.65:7000/api/verify-otp', { otp, email, newPassword },
        { headers: { 'Content-Type': 'application/json' } }
      );   
      toast.update(toastId,{
        render:"Password was reset ...",
        type:"success",
        isLoading:false,
        autoClose:3000
      })
      navigate("/signin")
    } catch (error) {
      toast.update(toastId,{
        render:"Invalid OTP or Email",
        type:"error",
        isLoading:false,
        autoClose:2000,
      })
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Reset newPassword</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setnewPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleResetPassword}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Reset Password
        </button>
      </div>
      <ToastContainer position='top-center'/>
    </div>
  );
};

export default RequestResetPassword;
