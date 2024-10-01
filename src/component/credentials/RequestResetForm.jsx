import { useState } from 'react';
import axios from 'axios';

const RequestResetForm = () => {
  const [email, setEmail] = useState('');

  const handleRequestReset = async () => {
    try {
      await axios.post('/api/requestPasswordReset', { email });
      alert('Password reset link sent to your email');
    } catch (error) {
      console.error(error);
      alert('Failed to send reset link');
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleRequestReset}>Send Reset Link</button>
    </div>
  );
};

export default RequestResetForm;
