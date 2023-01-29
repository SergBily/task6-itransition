import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Message from './message/Message';
import MessageService from '../services/MessageService';
import { getLocalStorage } from '../utils/localStorage';
import { socket } from '../socket/socket';
import ResponseMessageModel from '../models/ResponseMessageModel';

interface InboxMessagesProps {
  setCurrentOpenMessage: (m: ResponseMessageModel) => void,
  setIsOpenMessage: (m: boolean) => void
}

const InboxMessages = ({ setCurrentOpenMessage, setIsOpenMessage }: InboxMessagesProps) => {
  const [messages, setMessages] = useState<ResponseMessageModel[]>([]);
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
      <Accordion sx={{ backgroundColor: 'transparent', border: 0 }} defaultExpanded>
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
                  message={m}
                  key={uniqueKey()}
                  setIsOpenMessage={setIsOpenMessage}
                  setCurrentOpenMessage={setCurrentOpenMessage}
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
