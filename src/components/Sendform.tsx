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
import { toast } from 'react-toastify';
import MessageModel from '../models/MessageModel';
import UserService from '../services/UserService';
import UserModel from '../models/userModel';
import { getLocalStorage } from '../utils/localStorage';
import MessageHandlers from '../socket/messageHandlers';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const call = (p: boolean) => p;

interface SendFormProps {
  setisSendedMessage: (m: typeof call) => void
}

const SendForm = ({ setisSendedMessage }: SendFormProps) => {
  const currentUser: string[] = [getLocalStorage('user').name];
  const defaultMessage: MessageModel = {
    sender: {
      id: '',
      name: currentUser[0],
    },
    recipient: {
      id: '',
      name: '',
    },
    title: '',
    body: '',
  };
  const [contacts, setContacts] = useState<UserModel[]>([]);
  const [message, setMessage] = useState<MessageModel>(defaultMessage);

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

  const addId = () => ({
    ...message,
    sender: {
      ...message.sender,
      id: getLocalStorage('user')._id,
    },
    recipient: {
      ...message.recipient,
      id: contacts.find((e) => e.name === message.recipient.name)?._id as string,
    },
  });

  const hendleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const m = addId();
    MessageHandlers.sendMessage(m);
    setisSendedMessage((pre: any) => !pre);
    setMessage({ ...message, title: '', body: '' });
    toast.success('Mail has been sent!', { autoClose: 2000, position: 'bottom-right' });
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
        <TextField
          required
          fullWidth
          value={currentUser}
          variant="standard"
          label="From:"
          placeholder="name"
          sx={{ margin: '8px' }}
        />
        <Autocomplete
          id="to"
          size="medium"
          autoComplete
          onChange={
            (event, value) => setMessage({
              ...message,
              recipient: { ...message.recipient, name: (value?.name as string) },
            })
}
          options={contacts}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              required
              {...params}
              value={message.recipient.name}
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
          label="Message"
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
