import { Button, Grid } from '@mui/material';
import React from 'react';
import { db } from '../../config/firebase';
import chatExists from '../../utils/chatExists';
import checkUserExists from '../../utils/checkUserExists';

const NewChat = ({ userAuth, chatSnapshot, userSnapshot }) => {
  const newUserChat = () => {
    const chatUser =
      prompt(`Enter user email\n\nUsers currently in DB:${userSnapshot?.docs.map(
        (each) => '\n' + each.data().email
      )}
    `);
    if (!chatUser || !chatUser.trim()) {
      alert('Please enter user email');
      return;
    }

    if (chatExists(chatUser, chatSnapshot)) {
      alert('You already have a chat with this user');
      return;
    }

    if (!checkUserExists(userSnapshot, chatUser)) {
      alert('User doesnt exist in DB');
      return;
    }

    db.collection('chats')
      .add({
        users: [userAuth, chatUser],
      })
      .then(() => {
        alert('New chat created');
      })
      .catch((err) => {
        alert('Something went wrong');
      });
  };
  return (
    <Grid
      item
      p={2}
      sx={{
        position: 'sticky',
        top: '72px',
        backgroundColor: 'white',
        zIndex: 1000,
        borderBottom: '1px solid #f1f1f1',
      }}
    >
      <Button fullWidth variant='outlined' onClick={newUserChat}>
        ADD NEW CHAT
      </Button>
    </Grid>
  );
};

export default NewChat;
