import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const User = () => {
    const { user, logout } = useAuth(); // Get user and logout from AuthContext
    const [showLogout, setShowLogout] = useState(false); // State to toggle logout button
    const navigate = useNavigate();
    const userRef = useRef(null); // Create a reference for the user icon container

    // Handle toggle to show/hide logout button
    const handleToggle = () => {
        setShowLogout((prev) => !prev);
    };

    // Handle logout function
    const handleLogout = () => {
        logout();
        navigate("/signin");
    };

    // Close the logout button if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // If the click is outside the user icon container and logout button
            if (userRef.current && !userRef.current.contains(event.target)) {
                setShowLogout(false); // Close the logout button
            }
        };

        // Add event listener to the whole document
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Cleanup the event listener on component unmount
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [userRef]);

    return (
        <>
            <div 
                className="flex flex-row gap-2 justify-center items-center cursor-pointer"
                onClick={handleToggle} // Toggle logout button on click
                ref={userRef} // Assign the ref to the user icon container
            >
                <span>
                    <img src="userIcon.png" alt="User Icon" />
                </span>
                <span className="text-white my-1 font-bold">{user}</span>
            </div>

            {/* Logout button appears when showLogout is true */}
            {showLogout && (
                <div className="mt-2" ref={userRef}>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                </div>
            )}
        </>
    );
};

export default User;
