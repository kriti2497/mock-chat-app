import { Grid } from '@mui/material';
import React, { useContext } from 'react';
import ChatHeader from './chat-header';
import MessagesWindow from './mesages-window';
import AuthContext from '../../context/auth-context';

const ChatScreen = ({ chatSnapshot }) => {
  const { userAuth } = useContext(AuthContext);
  return (
    <Grid display='flex' flexDirection={'column'} flex='1'>
      <ChatHeader chatSnapshot={chatSnapshot} userAuth={userAuth} />
      <MessagesWindow chatSnapshot={chatSnapshot} />
    </Grid>
  );
};

export default ChatScreen;
