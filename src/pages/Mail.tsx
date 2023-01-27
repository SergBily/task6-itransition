import React from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { InboxMessages, SendForm, SendMessages } from '../components';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Mail = () => (
  <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={0} sx={{ minHeight: '100vh' }}>
      <Grid item xs={3} sx={{ minHeight: '100%', backgroundColor: '#6ec7ff' }}>
        <Item sx={{ backgroundColor: 'transparent', border: 0 }}>
          <InboxMessages />
        </Item>
        <Item sx={{ backgroundColor: 'transparent', border: 0 }}>
          <SendMessages />
        </Item>
      </Grid>
      <Grid item xs={9} sx={{ minHeight: '100vh' }}>
        <SendForm />
      </Grid>
    </Grid>
  </Box>
);

export default Mail;
