import { Grid } from '@mui/material';
import React from 'react';
import getRecipientEmail from '../../utils/getRecipientEmail';
import ChatCard from './chat-card';

const ChatList = ({ chatSnapshot, userAuth, activeChat }) => {
  return (
    <Grid>
      {chatSnapshot?.map((eachDoc) => {
        return (
          <ChatCard
            key={eachDoc.id}
            chatid={eachDoc.id}
            highlightActiveChat={activeChat}
            recipientEmail={getRecipientEmail(eachDoc.data().users, userAuth)}
          />
        );
      })}
    </Grid>
  );
};

export default ChatList;
