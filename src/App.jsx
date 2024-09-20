// import  {Navbar}  from "./component/Index";
import Signin from "./pages/Signin"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./component/ProtectedRoute";
import { Navigate } from "react-router-dom";

function App() {

  return (
   <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to="/admin" />} />
          <Route path="/admin" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path="/signin" element={<Signin/>}/>
        </Routes>
      </BrowserRouter>
   </AuthProvider>
  )
}


export default App;