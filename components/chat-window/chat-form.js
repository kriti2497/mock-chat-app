import { Button, Grid, TextField } from '@mui/material';
import React, { useState, useContext } from 'react';
import { db } from '../../config/firebase';
import { useRouter } from 'next/router';
import firebase from 'firebase';
import AuthContext from '../../context/auth-context';
import SendIcon from '@mui/icons-material/Send';

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
        db.collection('chats').doc(chatId).set(
          {
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
          },
          {
            merge: true,
          }
        );
        setMessage('');
        scrollToBottom();
      });
  };
  return (
    <Grid>
      <form
        onSubmit={sendMessage}
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '10vh',
          backgroundColor: '#f1f1f1',
        }}
      >
        <TextField
          sx={{
            flex: '1',
          }}
          InputProps={{
            style: {
              margin: '10px',
              height: '35px',
              backgroundColor: 'white',
            },
          }}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <Button variant='text' type='submit'>
          <SendIcon
            sx={{
              color: '42a5f5',
            }}
          />
        </Button>
      </form>
    </Grid>
  );
};

export default ChatForm;
