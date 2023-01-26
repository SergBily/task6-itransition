import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';
import './registration.scss';

const Registration = () => {
  const [name, setName] = useState<string>('');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  const hendleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submite');
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
            <h2 className="title">Mail App</h2>
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
                  <Button type="submit" fullWidth variant="contained" className="sign__btn">
                    Sign up
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <div className="sign__redirect">
              <p>Already have an account?</p>
              <Link to="/login">Sign in</Link>
            </div>
          </Grid>
        </Container>
      </form>
    </section>
  );
};

export default Registration;
