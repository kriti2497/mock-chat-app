import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState, useContext } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import checkUserExists from '../utils/checkUserExists';
import AuthContext from '../context/auth-context';
import { db } from '../config/firebase';

const LoginUser = () => {
  const [email, setemail] = useState('');
  const userRef = db.collection('users');
  const [usersSnapshot, loading, error] = useCollection(userRef);

  const { userAuth, login } = useContext(AuthContext);

  const loginUser = () => {
    if (checkUserExists(usersSnapshot, email)) {
      login(email);
    } else {
      alert('User doesnt exist in DB');
    }
  };
  return (
    <Grid item p={2}>
      <Typography>Login User to DB</Typography>
      <TextField
        id='outlined-basic'
        placeholder='Email'
        value={email}
        onChange={(e) => setemail(e.target.value)}
        variant='outlined'
      />
      <Button variant='outlined' onClick={loginUser}>
        Login
      </Button>
    </Grid>
  );
};

export default LoginUser;
