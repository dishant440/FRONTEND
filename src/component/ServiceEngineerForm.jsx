// import React, { useState } from "react";

// const ServiceEngineerForm = ({ onClose }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phoneNo, setPhoneNo] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newServiceEngineer = { name, email, password, phoneNo };

//     console.log("New Service Engineer:", newServiceEngineer);
    
//     onClose(); // Close the form after submission
//   };

//   return (
//     <div className="bg-black text-white p-6 rounded-lg shadow-lg w-96">
//       <h2 className="text-xl font-bold mb-4">NEW SERVICE ENGINEER</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm mb-1">Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="border p-2 w-full bg-gray-700"
//             placeholder="Enter name"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm mb-1">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="border p-2 w-full bg-gray-700"
//             placeholder="Enter email"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm mb-1">Set Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="border p-2 w-full bg-gray-700"
//             placeholder="Set password"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm mb-1">Phone No</label>
//           <input
//             type="text"
//             value={phoneNo}
//             onChange={(e) => setPhoneNo(e.target.value)}
//             className="border p-2 w-full bg-gray-700"
//             placeholder="Enter phone number"
//             required
//           />
//         </div>
//         <div className="flex justify-end space-x-4">
//           <button
//             type="button"
//             onClick={onClose}
//             className="bg-red-500 text-white px-4 py-2 rounded"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="bg-amber-500 text-white px-4 py-2 rounded"
//           >
//             Create
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ServiceEngineerForm;


import React, { useState } from "react";
import { useServiceEngineer } from "../hooks/useServiceEngineer";

const ServiceEngineerForm = ({ onClose }) => {
  const { addServiceEngineer, loading, error } = useServiceEngineer();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const engineerData = { name, email, phoneNo, password };
    await addServiceEngineer(engineerData);
    onClose();
  };

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">New Service Engineer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border p-2 w-full mb-4 bg-gray-700"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 w-full mb-4 bg-gray-700"
          required
        />
        <input
          type="tel"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          placeholder="Phone No"
          className="border p-2 w-full mb-4 bg-gray-700"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Set Password"
          className="border p-2 w-full mb-4 bg-gray-700"
          required
        />
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-amber-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceEngineerForm;
