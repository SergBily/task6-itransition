import React from 'react';
import Avatar from '@mui/material/Avatar';
import './message.scss';
import { deepPurple } from '@mui/material/colors';
import ResponseMessageModel from '../../models/ResponseMessageModel';

interface MessageProps {
  keyAvatar: number,
  message: ResponseMessageModel,
  setCurrentOpenMessage: (m: ResponseMessageModel) => void,
  setIsOpenMessage: (m: boolean) => void
}

const Message = ({
  keyAvatar, message, setCurrentOpenMessage, setIsOpenMessage,
}: MessageProps) => {
  const openMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = e;
    (currentTarget as HTMLButtonElement).classList.add('neumorphic-pressed');
    setIsOpenMessage(true);
    setCurrentOpenMessage(message);
  };

  return (
    <button
      type="button"
      className="message__btn neumorphic"
      onClick={openMessage}
    >
      <Avatar
        key={keyAvatar}
        sx={{ bgcolor: deepPurple[500] }}
      >
        {message.sender.name.slice(0, 1).toUpperCase()}
      </Avatar>
      <p className="message__title">{message.title}</p>
    </button>
  );
};

export default Message;
