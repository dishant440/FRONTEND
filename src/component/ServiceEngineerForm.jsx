import React, { useState } from "react";

const ServiceEngineerForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, e.g., send data to the server
    const newServiceEngineer = { name, email, password, phoneNo };
    console.log("New Service Engineer:", newServiceEngineer);

    // Call API to submit the data (axios.post or similar)
    
    onClose(); // Close the form after submission
  };

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">NEW SERVICE ENGINEER</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full bg-gray-700"
            placeholder="Enter name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full bg-gray-700"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Set Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full bg-gray-700"
            placeholder="Set password"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Phone No</label>
          <input
            type="text"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            className="border p-2 w-full bg-gray-700"
            placeholder="Enter phone number"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-amber-500 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceEngineerForm;
