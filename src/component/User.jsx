import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const User = () => {
    const { user, logout } = useAuth(); 
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();


    const handleToggle = () => {
        setShowConfirm((prev) => !prev);
    };


    const handleLogout = () => {
        logout();
        navigate("/signin");
    };

    return (
        <>
            <div 
                className="flex flex-row gap-2 justify-center items-center cursor-pointer"
                onClick={handleToggle} 
            >
                <span>
                    <img src="userIcon.png" alt="User Icon" />
                </span>
                <span className="text-white my-1 font-bold">{user}</span>
            </div>
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h2 className="text-lg font-bold">Are you sure you want to logout?</h2>
                        <div className="flex justify-between mt-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                onClick={handleLogout} // Confirm logout
                            >
                                Yes, Logout
                            </button>
                            <button
                                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
                                onClick={() => setShowConfirm(false)} // Close modal
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default User;
