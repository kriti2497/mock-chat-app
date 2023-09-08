import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import checkUserExists from '../utils/checkUserExists';
import { db } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

const AddDB = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const userRef = db.collection('users');
  const [usersSnapshot, loading, error] = useCollection(userRef);

  const addToDB = async () => {
    if (email.trim() !== '' && name.trim() !== '') {
      if (checkUserExists(usersSnapshot, email)) {
        console.log('test')
        alert('User exists');
        return;
      }

      db.collection('users')
        .doc(uuidv4())
        .set(
          {
            name: name,
            email: email,
          },
          {
            merge: true,
          }
        )
        .then(() => {
          alert('User added');
        })
        .catch((err) => {
          alert('Error Occured');
        });

      //   await setDoc(
      //     doc(db, "users", uuidv4()),
      //     {
      //       name: name,
      //       email: email,
      //     },
      //     {
      //       merge: true,
      //     }
      //   );
    } else {
      alert('Enter name and email');
    }
  };
  return (
    <Grid item m={2}>
      <Typography>Add User to DB</Typography>
      <TextField
        id='outlined-basic1'
        placeholder='Name'
        value={name}
        onChange={(e) => setname(e.target.value)}
        variant='outlined'
      />
      <TextField
        id='outlined-basic'
        placeholder='Email'
        value={email}
        onChange={(e) => setemail(e.target.value)}
        variant='outlined'
      />
      <Button variant='outlined' onClick={addToDB}>
        Add DB
      </Button>
    </Grid>
  );
};

export default AddDB;
