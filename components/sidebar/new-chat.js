import { Button, Grid } from '@mui/material';
import React from 'react';
import { db } from '../../config/firebase';
import chatExists from '../../utils/chatExists';
import checkUserExists from '../../utils/checkUserExists';
import firebase from 'firebase';
import { useRouter } from 'next/router';

const NewChat = ({ userAuth, chatSnapshot, userSnapshot }) => {
  const router = useRouter();
  const newUserChat = () => {
    const chatUser =
      prompt(`Enter user email\n\nUsers currently in DB:${userSnapshot?.docs.map(
        (each) => '\n' + each.data().email
      )}
    `).trim();
    if (!chatUser) {
      alert('Please enter user email');
      return;
    }

    if (chatUser === userAuth) {
      alert('WOW! You want to have a chat with yourself? How lonely are you!');
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
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
        isGroup: false,
      })
      .then((res) => {
        router.push(`/chat/${res.id}`);
        // alert('New chat created');
      })
      .catch((err) => {
        alert('Something went wrong');
      });
  };

  const newGroupChat = () => {
    const chatUsers =
      prompt(`Enter user emails separated by commas\n\nUsers currently in DB:${userSnapshot?.docs.map(
        (each) => '\n' + each.data().email
      )}
    `);

    if (!chatUsers || !chatUsers.trim()) {
      alert('Please enter user email');
      return;
    }

    const usersArray = chatUsers
      .split(',')
      .map((each) => each.trim())
      .filter(
        (each) =>
          each.trim() !== '' &&
          checkUserExists(userSnapshot, each) &&
          each !== userAuth
      );

    if (usersArray.length < 1) {
      alert('Invalid entries');
      return;
    }

    const groupName = prompt(`Enter group name`);

    if (!groupName || !groupName.trim()) {
      alert('Please enter group name');
      return;
    }

    // usersArray.forEach(eachUser => {
    //   if (!checkUserExists(userSnapshot, chatUser)) {
    //     alert('User doesnt exist in DB');
    //     return;
    //   }
    // })

    db.collection('chats')
      .add({
        users: [userAuth, ...usersArray],
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
        isGroup: true,
        groupName: groupName,
        admin: [userAuth],
      })
      .then((res) => {
        router.push(`/chat/${res.id}`);
        // alert('New chat created');
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
      <Button
        fullWidth
        variant='outlined'
        onClick={newUserChat}
        sx={{ marginBottom: '10px' }}
      >
        ADD NEW CHAT
      </Button>

      <Button fullWidth variant='outlined' onClick={newGroupChat}>
        ADD NEW GROUP CHAT
      </Button>
    </Grid>
  );
};

export default NewChat;
