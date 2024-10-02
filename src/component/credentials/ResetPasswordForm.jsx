// import { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const RequestResetPassword = () => {
//   const { token } = useParams();
//   const [password, setPassword] = useState('');

//   const handleResetPassword = async () => {
//     try {
//       await axios.post(`/api/reset/${token}`, { password });
//       alert('Password has been reset');
//     } catch (error) {
//       console.error(error);
//       alert('Failed to reset password');
//     }
//   };

//   return (
//     <div>
//       <input
//         type="password"
//         placeholder="Enter new password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleResetPassword}>Reset Password</button>
//     </div>
//   );
// };

// export default RequestResetPassword;


import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RequestResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const navigate = useNavigate()
   
  const handleResetPassword = async () => {
    try {
      await axios.post('http://192.168.29.65:7000/api/verify-otp', { otp, email, newPassword },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      alert('newPassword has been reset');
      navigate("/signin")
    } catch (error) {
      console.error(error);
      alert('Failed to reset newPassword');
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
    </div>
  );
};

export default RequestResetPassword;
