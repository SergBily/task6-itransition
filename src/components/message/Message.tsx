import React from 'react';
import Avatar from '@mui/material/Avatar';
import './message.scss';
import { deepPurple } from '@mui/material/colors';

interface MessageProps {
  title: string
}

const Message = ({ title }: MessageProps) => {
  const openMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = e;
    (currentTarget as HTMLButtonElement).classList.add('neumorphic-pressed');
  };

  return (
    <button type="button" className="message__btn neumorphic" onClick={openMessage}>
      <Avatar sx={{ bgcolor: deepPurple[500] }}>MW</Avatar>
      {/* <p className="message__icon">MW</p> */}
      <p className="message__title">{title}</p>
    </button>
  );
};

export default Message;
