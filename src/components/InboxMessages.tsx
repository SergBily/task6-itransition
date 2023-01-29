import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Message from './message/Message';
import MessageService from '../services/MessageService';
import { getLocalStorage } from '../utils/localStorage';
import MessageModel from '../models/MessageModel';
import { socket } from '../socket/socket';

const InboxMessages = () => {
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const uniqueKey = () => Math.random();

  const getMessages = async () => {
    const m = await MessageService.getMessages(getLocalStorage('user')._id);
    setMessages(m);
  };

  socket.on('message:receive', (m) => {
    setMessages([...messages, m]);
  });

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div>
      <Accordion sx={{ backgroundColor: 'transparent', border: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ color: '#fff', fontSize: '1.5rem' }}>INBOX</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map(
              (m) => (
                <Message
                  key={uniqueKey()}
                  title={m.title}
                  sender={m.sender}
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

export default InboxMessages;
