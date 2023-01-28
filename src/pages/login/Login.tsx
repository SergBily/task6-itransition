import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import { toast } from 'react-toastify';
import AuthService from '../../services/AuthService';

const Login = () => {
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  const hendleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await AuthService.login(name);
    const { data } = response;
    console.log(response.data);
    if (response.status === 200) {
      localStorage.setItem('name', `${data.name}`);
      toast.success('You are sign in!', { autoClose: 2000, position: 'bottom-right' });
      navigate('/mail');
    } else {
      toast.error('Уrror try again!', { autoClose: 2000, position: 'bottom-right' });
    }
  };

  return (
    <section>
      <form onSubmit={hendleOnSubmit} className="sign__form">
        <Container maxWidth="xs" className="sign__container">
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            className="sign__container-grid"
          >
            <h2 className="title">Mail app</h2>
            <Paper elevation={2} sx={{ padding: 1 }} style={{ maxWidth: '100%' }}>
              <Grid container spacing={3} direction="column">
                <Grid item>
                  <TextField
                    id="name"
                    type="text"
                    fullWidth
                    label="Name"
                    placeholder="Enter your name"
                    variant="outlined"
                    value={name}
                    onChange={changeHandler}
                  />
                </Grid>
                <Grid item>
                  <Button type="submit" variant="contained" fullWidth className="sign__btn">
                    Sign in
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <div className="sign__redirect">
              <p>No account?</p>
              <Link to="/registration" className="sign__link">Sign up</Link>
            </div>
          </Grid>
        </Container>
      </form>
    </section>
  );
};

export default Login;
