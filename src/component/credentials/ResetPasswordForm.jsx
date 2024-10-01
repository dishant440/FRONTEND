import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RequestResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');

  const handleResetPassword = async () => {
    try {
      await axios.post(`/api/reset/${token}`, { password });
      alert('Password has been reset');
    } catch (error) {
      console.error(error);
      alert('Failed to reset password');
    }
  };

  return (
    <div>
      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default RequestResetPassword;
