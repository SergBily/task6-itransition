import React from 'react';
import Avatar from '@mui/material/Avatar';
import './message.scss';
import { deepPurple } from '@mui/material/colors';

interface MessageProps {
  title: string,
  sender: {
    name: string,
    id: string
  }
  keyAvatar: number
}

const Message = ({ title, sender, keyAvatar }: MessageProps) => {
  const openMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = e;
    (currentTarget as HTMLButtonElement).classList.add('neumorphic-pressed');
  };

  return (
    <button type="button" className="message__btn neumorphic" onClick={openMessage}>
      <Avatar
        key={keyAvatar}
        sx={{ bgcolor: deepPurple[500] }}
      >
        {sender.name[0].toUpperCase()}
      </Avatar>
      <p className="message__title">{title}</p>
    </button>
  );
};

export default Message;
