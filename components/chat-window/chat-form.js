import { Button, Grid, TextField } from '@mui/material';
import React, { useState, useContext } from 'react';
import { db } from '../../config/firebase';
import { useRouter } from 'next/router';
import firebase from 'firebase';
import AuthContext from '../../context/auth-context';

const ChatForm = ({ scrollToBottom }) => {
  const [message, setMessage] = useState('');
  const router = useRouter();

  const { userAuth } = useContext(AuthContext);

  const chatId = router.query.id;

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection('chats')
      .doc(chatId)
      .collection('messages')
      .add({
        type: 'text',
        value: message,
        sender: userAuth,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setMessage('');
        scrollToBottom();
      });
  };
  return (
    <Grid>
      <form
        onSubmit={sendMessage}
        style={{ display: 'flex', alignItems: 'center', height: '10vh' }}
      >
        <TextField
          sx={{ flex: '1' }}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <Button variant='contained' type='submit'>
          Send
        </Button>
      </form>
    </Grid>
  );
};

export default ChatForm;
