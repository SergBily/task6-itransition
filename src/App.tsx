import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Login, Mail } from './pages';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <div className="wrapper">
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="mail" element={<Mail />} />
    </Routes>
    <ToastContainer />
  </div>
);

export default App;
