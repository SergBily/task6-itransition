import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import EmailIcon from '@mui/icons-material/Email';
import ResponseMessageModel from '../models/ResponseMessageModel';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface OpenMessageProp {
  message: ResponseMessageModel,
  setIsOpenMessage: (m: boolean) => void,
}

const OpenMessage = ({ message, setIsOpenMessage }: OpenMessageProp) => {
  const onClickMessage = () => {
    setIsOpenMessage(false);
  };

  return (
    <Grid item xs={12} sx={{ minHeight: '100%', backgroundColor: '#6ec7ff4d' }}>
      <Item sx={{
        backgroundColor: '#6ec7ff',
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
      }}
      >
        <button
          type="button"
          onClick={onClickMessage}
          style={{
            border: 0,
            display: 'flex',
            gap: '5px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          <EmailIcon />
          <p style={{ margin: 0, fontSize: '1.2rem' }}>New mail</p>
        </button>
      </Item>
      <Item sx={{
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        fontSize: '1.5rem',
        fontWeight: '500',
      }}
      >
        <p>{ message.title}</p>
      </Item>
      <Item sx={{
        backgroundColor: 'transparent',
        textAlign: 'start',
        fontSize: '1.3rem',
      }}
      >
        <p>{`From: ${message.sender.name}`}</p>
        <p>{new Date(message.createdAt).toLocaleString()}</p>
      </Item>
      <Item sx={{
        backgroundColor: 'transparent',
        textAlign: 'start',
        paddingTop: '2rem',
        fontSize: '1.3rem',
        minHeight: '100vh',
      }}
      >
        { message.body}
      </Item>
    </Grid>
  );
};

export default OpenMessage;
