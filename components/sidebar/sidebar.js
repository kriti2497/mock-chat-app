import { Grid } from '@mui/material';
import React, { useContext } from 'react';
import ChatList from './chat-list';
import Header from './header';
import NewChat from './new-chat';
import { db } from '../../config/firebase';
import AuthContext from '../../context/auth-context';
import { useCollection } from 'react-firebase-hooks/firestore';

const Sidebar = ({ currentlyActive }) => {
  const { userAuth } = useContext(AuthContext);

  const chatRef = db
    .collection('chats')
    .where('users', 'array-contains', userAuth)
    .orderBy('lastUpdated', 'desc');

  const userRef = db.collection('users');

  const [chatSnapshot] = useCollection(chatRef);

  const [userSnapshot] = useCollection(userRef);

  return (
    <Grid
      width={'350px'}
      height='100vh'
      sx={{
        backgroundColor: 'white',
        borderRight: '0.5px solid #8080803d',
        overflowY: 'scroll',
      }}
    >
      <Header currentUser={userAuth} />
      <NewChat
        userSnapshot={userSnapshot}
        chatSnapshot={chatSnapshot?.docs}
        userAuth={userAuth}
      />
      <ChatList
        activeChat={currentlyActive}
        chatSnapshot={chatSnapshot?.docs}
        userAuth={userAuth}
      />
    </Grid>
  );
};

export default Sidebar;
