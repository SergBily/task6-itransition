import React, { useEffect } from 'react';
import './App.scss';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Login, Mail } from './pages';
import 'react-toastify/dist/ReactToastify.css';
import { getLocalStorage } from './utils/localStorage';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isUser: boolean = !!getLocalStorage('user');
    if (isUser) {
      navigate('/mail');
    }
  }, []);

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Login />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="mail" element={<Mail />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
