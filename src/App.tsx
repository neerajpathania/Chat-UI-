import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/auth/signup';
import OTPInput from './components/auth/otpScreen';
import ProfileSetup from './components/auth/Profile';
import ChatScreen from './layout/chatScreen';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/otp" element={<OTPInput />} />
        <Route path="/profile" element={<ProfileSetup />} />
        <Route path="/home" element={<ChatScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
