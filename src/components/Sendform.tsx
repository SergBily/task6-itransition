import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MessageModel from '../models/MessageModel';
import UserService from '../services/UserService';
import UserModel from '../models/userModel';
import { getLocalStorage } from '../utils/localStorage';
import MessageService from '../services/MessageService';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const currentUser: string[] = [getLocalStorage('user').name];

const SendForm = () => {
  const [contacts, setContacts] = useState<UserModel[]>([]);
  const [message, setMessage] = useState<MessageModel>({
    from: '',
    to: '',
    title: '',
    body: '',
  });

  const getContacts = async (): Promise<void> => {
    const users: UserModel[] = await UserService.getAllUsers();
    setContacts(users);
  };

  useEffect(() => {
    getContacts();
  }, []);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage({ ...message, [event.target.id]: event.target.value });
  };

  const hendleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    MessageService.sendMessage(message);
  };

  return (
    <Grid item xs={12} sx={{ minHeight: '100%', backgroundColor: '#6ec7ff4d' }}>
      <form onSubmit={hendleOnSubmit}>
        <Item sx={{
          backgroundColor: '#6ec7ff',
          display: 'flex',
          justifyContent: 'center',
        }}
        >
          <button
            type="submit"
            style={{
              border: 0,
              display: 'flex',
              gap: '5px',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
          >
            <SendOutlinedIcon />
            <p style={{ margin: 0, fontSize: '1.2rem' }}>Send</p>
          </button>
        </Item>
        <Autocomplete
          id="from"
          size="medium"
          onChange={(event, value) => setMessage({ ...message, from: (value as string) })}
          options={currentUser}
          isOptionEqualToValue={(option, value) => option === value}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              required
              {...params}
              value={message.from}
              onChange={changeHandler}
              variant="standard"
              label="From:"
              placeholder="name"
              sx={{ margin: '8px' }}
            />
          )}
        />
        <Autocomplete
          id="to"
          size="medium"
          onChange={(event, value) => setMessage({ ...message, to: (value?.name as string) })}
          options={contacts}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              required
              {...params}
              value={message.to}
              onChange={changeHandler}
              variant="standard"
              label="To:"
              placeholder="name"
              sx={{ margin: '8px' }}
            />
          )}
        />
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <Input
            value={message.title}
            onChange={changeHandler}
            id="title"
            sx={{ fontSize: '20px', letterSpacing: '1px' }}
            startAdornment={<InputAdornment position="start">Title</InputAdornment>}
          />
        </FormControl>
        <TextField
          value={message.body}
          onChange={changeHandler}
          id="body"
          label="Multiline"
          multiline
          minRows={25}
          fullWidth
          variant="filled"
          sx={{ margin: '8px' }}
        />
      </form>
    </Grid>
  );
};

export default SendForm;
