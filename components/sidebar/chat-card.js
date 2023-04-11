import { Avatar, Grid, Typography } from '@mui/material';
import React from 'react';
import { db } from '../../config/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';
import Link from 'next/link';
import stringAvatar from '../../utils/avatarStyling';

const ChatCard = ({ recipientEmail, chatid }) => {
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
          backgroundColor: chatid === router.query.id ? '#4884df' : 'white',
          color: chatid === router.query.id ? 'white' : 'black',
          borderBottom: '1px solid #8080803d',
          cursor: 'pointer',
        }}
      >
        <Avatar
          {...stringAvatar(
            recipientSnapshot ? recipientSnapshot.docs[0].data().name : ''
          )}
        />
        <Typography>{recipientSnapshot?.docs[0].data().name}</Typography>
      </Grid>
    </Link>
  );
};

export default ChatCard;
