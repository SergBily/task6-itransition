import React from 'react';
import Avatar from '@mui/material/Avatar';
import './message.scss';
import { deepPurple } from '@mui/material/colors';
import ResponseMessageModel from '../../models/ResponseMessageModel';

interface MessageSendProps {
  keyAvatar: number,
  message: ResponseMessageModel,
}

const MessageSend = ({ keyAvatar, message }: MessageSendProps) => (
  <button
    type="button"
    className="message__btn neumorphic"
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

export default MessageSend;
