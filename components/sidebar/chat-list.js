import { Grid } from '@mui/material';
import React from 'react';
import getRecipientEmail from '../../utils/getRecipientEmail';
import ChatCard from './chat-card';
import ChatCardGroup from './chat-card-group';

const ChatList = ({ chatSnapshot, userAuth, activeChat }) => {
  return (
    <Grid>
      {chatSnapshot?.map((eachDoc) => {
        return eachDoc.data().isGroup ? (
          <ChatCardGroup
            key={eachDoc.id}
            chatid={eachDoc.id}
            groupChatData={eachDoc.data()}
          />
        ) : (
          <ChatCard
            key={eachDoc.id}
            chatid={eachDoc.id}
            // highlightActiveChat={activeChat}
            recipientEmail={getRecipientEmail(eachDoc.data().users, userAuth)}
          />
        );
      })}
    </Grid>
  );
};

export default ChatList;
