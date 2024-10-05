// import  {Navbar}  from "./component/Index";
import Signin from "./pages/Signin"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./component/ProtectedRoute";
import { Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import UpdatePasswordForm from "./component/credentials/UpdatePasswordForm";
import RequestResetForm from "./component/credentials/RequestResetForm"
import ResetPasswordForm from "./component/credentials/ResetPasswordForm"

import { Provider } from 'react-redux';
import { store } from './store';


function App() {

  return (
   <>
   <Provider store={store}>
   <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to="/admin" />} />
          <Route path="/admin" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path="/content/:folderId" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/update-password" element={<UpdatePasswordForm/>}/>
          <Route path="/sendResetLink" element={<RequestResetForm/>}/>
          <Route path="/verify-otp" element={<ResetPasswordForm/>}/>
        </Routes>
      </BrowserRouter>
   </AuthProvider>
   </Provider>
   <ToastContainer position="top-center"/>
   </>
  )
}


export default App;

