import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ResponseMessageModel from '../models/ResponseMessageModel';
import { getLocalStorage } from '../utils/localStorage';
import MessageService from '../services/MessageService';
import MessageSend from './message/MessageSend';

interface SendMessageProps {
  isSendedMessage: boolean
}

const SendMessages = ({ isSendedMessage }: SendMessageProps) => {
  const [messages, setMessages] = useState<ResponseMessageModel[]>([]);
  const uniqueKey = () => Math.random();

  const getMessages = async () => {
    const m = await MessageService.getSendedMessages(getLocalStorage('user')._id);
    setMessages(m);
  };

  useEffect(() => {
    getMessages();
  }, [isSendedMessage]);

  return (
    <div>
      <Accordion sx={{ backgroundColor: 'transparent', border: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ color: '#fff', fontSize: '1.5rem' }}>SENT MAIL</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map(
              (m) => (
                <MessageSend
                  message={m}
                  key={uniqueKey()}
                  keyAvatar={uniqueKey()}
                />
              ),
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SendMessages;
