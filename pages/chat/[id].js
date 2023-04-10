import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import ChatScreen from '../../components/chat-window/chat-screen';
import Sidebar from '../../components/sidebar/sidebar';
import { db } from '../../config/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import AuthContext from '../../context/auth-context';
import getRecipientEmail from '../../utils/getRecipientEmail';
const ChatWindow = () => {
  const router = useRouter();
  const { userAuth } = useContext(AuthContext);

  const chatRef = db.collection('chats').doc(router.query.id);
  const [chatSnapshot] = useCollection(chatRef);

  return (
    <Grid display='flex'>
      <Sidebar
        currentlyActive={
          chatSnapshot
            ? getRecipientEmail(chatSnapshot.data().users, userAuth)
            : ''
        }
      />
      <ChatScreen key={router.query.id} chatSnapshot={chatSnapshot} />
    </Grid>
  );
};

export default ChatWindow;
