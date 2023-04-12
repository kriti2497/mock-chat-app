import { Grid, Typography } from '@mui/material';
import React from 'react';
import moment from 'moment';
import { db } from '../../config/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const Message = ({ msgContent, currentUser, isGroup }) => {
  const userRef = db
    .collection('users')
    .where('email', '==', msgContent.sender);
  const [userSnapshot] = useCollection(userRef);

  return (
    <Grid
      display={'flex'}
      justifyContent={currentUser ? 'flex-end' : 'flex-start'}
      m={2}
    >
      <Grid
        maxWidth={'70%'}
        width='fit-content'
        sx={{
          wordBreak: 'break-word',
          borderRadius: '10px',
          padding: '10px',
          color: currentUser ? 'white' : 'black',
          backgroundColor: currentUser ? '#4884df' : 'white',
        }}
      >
        {!currentUser && isGroup && userSnapshot && (
          <Typography
            sx={{
              fontSize: '13px',
              color: 'darkslateblue',
              fontWeight: 700,
            }}
          >
            {userSnapshot.docs[0].data().name}
          </Typography>
        )}
        <Typography>{msgContent.value}</Typography>
        <Typography
          sx={{
            fontSize: '10px',
            textAlign: 'right',
            color: currentUser ? 'lightgrey' : 'darkgray',
          }}
        >
          {msgContent?.timestamp
            ? moment(msgContent.timestamp.toDate().getTime()).format('LT')
            : '...'}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Message;
