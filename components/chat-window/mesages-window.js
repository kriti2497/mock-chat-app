import { Grid } from '@mui/material';
import React, { useContext, useRef, useEffect } from 'react';
import ChatForm from './chat-form';
import { db } from '../../config/firebase';
import { useRouter } from 'next/router';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './message';
import AuthContext from '../../context/auth-context';
const MessagesWindow = ({ chatSnapshot }) => {
  const router = useRouter();
  const messageRef = db
    .collection('chats')
    .doc(router.query.id)
    .collection('messages')
    .orderBy('timestamp', 'asc');

  const [messagesSnapshot] = useCollection(messageRef);

  const endOfMsgRef = useRef(null);

  const { userAuth } = useContext(AuthContext);

  useEffect(() => {
    scrollToBottom();
  }, [messagesSnapshot]);

  const scrollToBottom = () => {
    endOfMsgRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <Grid display='flex' flexDirection={'column'} item flex='1'>
      <Grid
        sx={{ backgroundColor: '#f1f1f1', height: '80vh', overflowY: 'scroll' }}
      >
        {messagesSnapshot?.docs.map((eachMsg) => {
          return (
            <Message
              key={eachMsg.id}
              msgContent={eachMsg.data()}
              currentUser={eachMsg.data().sender === userAuth}
              isGroup={chatSnapshot && chatSnapshot.data().isGroup}
            />
          );
        })}
        <div ref={endOfMsgRef}></div>
      </Grid>
      <ChatForm scrollToBottom={scrollToBottom} />
    </Grid>
  );
};

export default MessagesWindow;
