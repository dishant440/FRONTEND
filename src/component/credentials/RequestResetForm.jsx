// import { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer,toast } from 'react-toastify';

// const RequestResetForm = () => {
//   const [email, setEmail] = useState('');

//   const handleRequestReset = async () => {
//     const toastId = toast.loading("Processing Request")
//     try {
//       await axios.post('/api/requestPasswordReset', { email });
//       toast.update(toastId,{
//         render:`Reset Link sent to ${email}`,
//         type:'success',
//         isLoading:false,
//         autoClose:3000
//       })
      
//     } catch (error) {
//       toast.update(toastId,{
//         render:`Something went wrong try again`,
//         type:'error',
//         isLoading:false,
//         autoClose:3000
//       })
//     }
//   };

//   return (
//     <div>
//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <button onClick={handleRequestReset}>Send Reset Link</button>
//     </div>
//   );
// };

// export default RequestResetForm;

import { useState } from 'react';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";

const RequestResetForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleRequestReset = async () => {
    const toastId = toast.loading("Sending Otp")
    try {
      await axios.post('http://192.168.29.65:7000/api/requestPasswordReset', { email });
      toast.update(toastId,{
        render:`Reset Link sent to ${email}`,
        type:'success',
        isLoading:false,
        autoClose:1000}
      );
      navigate("/verify-otp")
    } catch (error) {
      toast.update(toastId,{
                render:`Something went wrong try again`,
                type:'error',
                isLoading:false,
                autoClose:3000
              })
      setError('Failed to send otp');
      setMessage(''); // Clear any previous success message
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Your Password</h2>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
          />
        </div>
        <button
          onClick={handleRequestReset}
          className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          SEND OTP
        </button>
      </div>
      <ToastContainer position='top-center'/>
    </div>
  );
};

export default RequestResetForm;

