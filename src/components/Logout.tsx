import * as React from 'react';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { getLocalStorage } from '../utils/localStorage';
import UserModel from '../models/userModel';

const Logout = () => {
  const navigate = useNavigate();
  const currentUser: UserModel = getLocalStorage('user');
  const exit = async () => {
    AuthService.logout(currentUser._id);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0 1rem',
    }}
    >
      <p style={{ fontSize: '1.5rem', color: '#673ab7' }}>{currentUser.name}</p>
      <button
        type="button"
        onClick={exit}
        style={{
          backgroundColor: 'transparent',
          border: 0,
        }}
      >
        <ExitToAppOutlinedIcon
          fontSize="large"
          sx={{ cursor: 'pointer' }}
        />
      </button>
    </div>
  );
};

export default Logout;
