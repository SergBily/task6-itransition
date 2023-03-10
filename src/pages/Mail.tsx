import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {
  InboxMessages, Logout, SendForm, SendMessages,
} from '../components';
import OpenMessage from '../components/OpenMessage';
import ResponseMessageModel from '../models/ResponseMessageModel';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Mail = () => {
  const [currentOpenMessage, setCurrentOpenMessage] = useState<ResponseMessageModel>();
  const [isOpenMessage, setIsOpenMessage] = useState<boolean>(false);
  const [isSendedMessage, setisSendedMessage] = useState<boolean>(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0} sx={{ minHeight: '100vh' }}>
        <Grid
          item
          xs={3}
          sx={{
            maxHeight: '100vh',
            backgroundColor: '#6ec7ff',
            overflow: 'auto',
          }}
        >
          <Item sx={{ backgroundColor: 'transparent', border: 0 }}>
            <Logout />
          </Item>
          <Item sx={{ backgroundColor: 'transparent', border: 0 }}>
            <InboxMessages
              setCurrentOpenMessage={setCurrentOpenMessage}
              setIsOpenMessage={setIsOpenMessage}
            />
          </Item>
          <Item sx={{ backgroundColor: 'transparent', border: 0 }}>
            <SendMessages isSendedMessage={isSendedMessage} />
          </Item>
        </Grid>
        <Grid item xs={9} sx={{ minHeight: '100vh' }}>
          {isOpenMessage
            ? (
              <OpenMessage
                message={currentOpenMessage as ResponseMessageModel}
                setIsOpenMessage={setIsOpenMessage}
              />
            )
            : <SendForm setisSendedMessage={setisSendedMessage} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Mail;
