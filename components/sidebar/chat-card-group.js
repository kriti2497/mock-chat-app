import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Avatar, Grid, Typography } from '@mui/material';
import stringAvatar from '../../utils/avatarStyling';
const ChatCardGroup = ({ chatid, groupChatData }) => {
  const router = useRouter();

  return (
    <Link href={'/chat/' + chatid}>
      <Grid
        display={'flex'}
        alignItems={'center'}
        p={2}
        sx={{
          backgroundColor: chatid === router.query.id ? '#4884df' : 'white',
          color: chatid === router.query.id ? 'white' : 'black',
          borderBottom: '1px solid #8080803d',
          cursor: 'pointer',
        }}
      >
        <Avatar {...stringAvatar(groupChatData.groupName)} />
        <Typography>{groupChatData.groupName}</Typography>
      </Grid>
    </Link>
  );
};

export default ChatCardGroup;
