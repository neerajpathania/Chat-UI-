import React, { Suspense } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from './components/auth/signup';
import OTPInput from './components/auth/otpScreen';
import ProfileSetup from './components/auth/Profile';
import ChatScreen from './layout/chatScreen';
import { Toaster } from "react-hot-toast";

function App() {

  const DeafultRoute = () => {
    const token = localStorage.getItem("authToken");
    return token ? <Navigate to='/home' /> : <Navigate to='/Signup' />
  }

  return (
    <Suspense>
      <Toaster reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DeafultRoute />} />
          <Route path="/otp" element={<OTPInput />} />
          <Route path="/profile" element={<ProfileSetup />} />
          <Route path="/home" element={<ChatScreen />} />
        </Routes>
      </BrowserRouter>
    </Suspense>

  )
}

export default App
