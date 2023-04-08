import { Button, Grid, TextField } from '@mui/material';
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
          console.log(err);
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
    <Grid item>
      <h4>Add User to DB</h4>
      <TextField
        id='outlined-basic1'
        label='Outlined'
        placeholder='Name'
        value={name}
        onChange={(e) => setname(e.target.value)}
        variant='outlined'
      />
      <TextField
        id='outlined-basic'
        label='Outlined'
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
