import { Avatar, Grid, Typography } from '@mui/material';
import React from 'react';
import stringAvatar from '../../utils/avatarStyling';
import getRecipientEmail from '../../utils/getRecipientEmail';

const ChatHeader = ({ chatSnapshot, userAuth }) => {
  const chatTitleDisplay = (chat) => {
    if (!chat.isGroup) {
      return getRecipientEmail(chat.users, userAuth);
    } else {
      return chat.groupName;
    }
  };
  return (
    <Grid
      item
      display='flex'
      alignItems={'center'}
      p={2}
      sx={{
        borderBottom: '1px solid whitesmoke',
      }}
      height='10vh'
    >
      <Avatar
        {...stringAvatar(
          chatSnapshot
            ? chatTitleDisplay(chatSnapshot?.data()).toUpperCase()
            : ''
        )}
      />
      <Typography marginLeft={2}>
        {chatSnapshot ? chatTitleDisplay(chatSnapshot?.data()) : ''}
      </Typography>
    </Grid>
  );
};

export default ChatHeader;
