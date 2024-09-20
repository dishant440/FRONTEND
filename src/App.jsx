// import  {Navbar}  from "./component/Index";
import Signin from "./pages/Signin"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {

  return (
   <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/admin" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
   </AuthProvider>
  )
}


export default App;