import { Button, Grid, TextField } from '@mui/material';
import React, { useState, useContext } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import checkUserExists from '../utils/checkUserExists';
import AuthContext from '../context/auth-context';
import { db } from '../config/firebase';

const LoginUser = () => {
  const [email, setemail] = useState('');
  const userRef = db.collection('users');
  const [usersSnapshot, loading, error] = useCollection(userRef);

  const { userAuth, setuserAuth } = useContext(AuthContext);

  const loginUser = () => {
    console.log('Logged In');
    if (checkUserExists(usersSnapshot, email)) {
      setuserAuth(email);
    } else {
      alert('User doesnt exist in DB');
    }
  };
  return (
    <Grid item>
      {console.log(userAuth)}
      <h4>Login User to DB</h4>
      <TextField
        id='outlined-basic'
        label='Outlined'
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