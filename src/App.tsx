import React, { useEffect } from 'react';
import './App.scss';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Login, Mail } from './pages';
import 'react-toastify/dist/ReactToastify.css';
import { SocketControl } from './socket/socket';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isUser: boolean = !!localStorage.getItem('sessionID');
    if (isUser) {
      SocketControl.reconnect();
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
