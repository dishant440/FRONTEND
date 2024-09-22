// import  {Navbar}  from "./component/Index";
import Signin from "./pages/Signin"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./component/ProtectedRoute";
import { Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

function App() {

  return (
   <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to="/admin" />} />
          <Route path="/admin" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path="/content/:folderId" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path="/signin" element={<Signin/>}/>
        </Routes>
      </BrowserRouter>
   </AuthProvider>
   <ToastContainer position="top-center"/>
   </>
  )
}


export default App;