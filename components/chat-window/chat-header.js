import { Avatar, Grid, Typography } from '@mui/material';
import React from 'react';
import getRecipientEmail from '../../utils/getRecipientEmail';

const ChatHeader = ({ chatSnapshot, userAuth }) => {
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
      <Avatar />
      <Typography marginLeft={2}>
        {chatSnapshot
          ? getRecipientEmail(chatSnapshot?.data().users, userAuth)
          : ''}
      </Typography>
    </Grid>
  );
};

export default ChatHeader;
