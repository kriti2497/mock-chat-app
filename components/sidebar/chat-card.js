import { Avatar, Grid, Typography } from '@mui/material';
import React from 'react';
import { db } from '../../config/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ChatCard = ({ recipientEmail, chatid, highlightActiveChat }) => {
  const router = useRouter();
  const recipientRef = db
    .collection('users')
    .where('email', '==', recipientEmail);

  const [recipientSnapshot] = useCollection(recipientRef);
  return (
    <Link href={'/chat/' + chatid}>
      <Grid
        display={'flex'}
        alignItems={'center'}
        p={2}
        sx={{
          backgroundColor:
            highlightActiveChat === recipientSnapshot?.docs[0].data().email
              ? '#4884df'
              : 'white',
          color:
            highlightActiveChat === recipientSnapshot?.docs[0].data().email
              ? 'white'
              : 'black',
          borderBottom: '1px solid #8080803d',
          cursor: 'pointer',
        }}
      >
        <Avatar
          sx={{
            marginRight: '10px',
          }}
        />
        <Typography>{recipientSnapshot?.docs[0].data().name}</Typography>
      </Grid>
    </Link>
  );
};

export default ChatCard;
