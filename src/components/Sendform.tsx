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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const SendForm = () => {
  const [allUser, setAllUser] = useState<UserModel[]>([]);
  const [message, setMessage] = useState<MessageModel>({
    from: '',
    to: '',
    title: '',
    body: '',
  });

  const getUsers = async (): Promise<void> => {
    const users: UserModel[] = await UserService.getAllUsers();
    setAllUser(users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage({ ...message, [event.target.id]: event.target.value });
  };

  const sendMessage = () => {
    console.log(message);
  };

  return (
    <Grid item xs={12} sx={{ minHeight: '100%', backgroundColor: '#6ec7ff4d' }}>
      <Item sx={{
        backgroundColor: '#6ec7ff',
        display: 'flex',
        justifyContent: 'center',
      }}
      >
        <button
          type="button"
          onClick={sendMessage}
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

      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <Input
          value={message.from}
          onChange={changeHandler}
          id="from"
          sx={{ fontSize: '20px', letterSpacing: '1px' }}
          startAdornment={<InputAdornment position="start">From:</InputAdornment>}
        />
      </FormControl>
      <Autocomplete
        id="to"
        size="medium"
        onChange={(event, value) => setMessage({ ...message, to: (value?.name as string) })}
        options={allUser}
        isOptionEqualToValue={(option, value) => option === value}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
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
    </Grid>
  );
};

export default SendForm;
