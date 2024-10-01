
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast
import { useNavigate } from 'react-router-dom';

const UpdatePasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');


    const navigate = useNavigate()

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        const toastId = toast.loading("changing password")
        // Check if new passwords match
        if (newPassword !== confirmPassword) {
            toast.error("New passwords don't match."); // Use toast for error
            return;
        }

        try {
            // Make a POST request to change the password
            const response = await axios.put('http://192.168.29.65:7000/api/admin/change-password', {
                oldPassword:currentPassword,
                newPassword:newPassword,
            },
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            }
        );
            toast.update(toastId,{
                render:`${response.data.message}`,
                type:"success",
                isLoading: false,
                autoClose: 2000,

            }); // Use toast for success message
            setError(''); // Clear any previous error
            // Reset fields after success
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            navigate("/signin")
        } catch (err) {
            // Handle error response
            setError(err.response?.data?.message || 'Error changing password.');
            toast.update(toastId,{
                render:`${response.data.message}`,
                type:"error",
                isLoading: false,
                autoClose: 2000,

            });
        }
    };

    return (
        <div>
            <div className="max-w-md mx-auto my-8 p-4 border rounded shadow-lg mt-24 bg-black text-amber-500">
                <h2 className="text-lg font-bold mb-4 flex mx-auto justify-center">Update Password</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleUpdatePassword}>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="currentPassword">Current Password</label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            placeholder='ENTER CURRENT PASSWORD'
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="border rounded p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            placeholder='ENTER NEW PASSWORD'
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="border rounded p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            placeholder='CONFIRM PASSWORD'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border rounded p-2 w-full"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-amber-500 font-bold flex mx-auto text-white px-4 py-2 rounded">
                        Update Password
                    </button>
                </form>
            </div>
            <ToastContainer position='top-center'/> {/* Include ToastContainer to render toast notifications */}
        </div>
    );
};

export default UpdatePasswordForm;
