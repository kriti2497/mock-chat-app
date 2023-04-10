import { Grid, Typography } from '@mui/material';
import React from 'react';
const Message = ({ msgContent, currentUser }) => {
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
        <Typography>{msgContent.value}</Typography>
      </Grid>
    </Grid>
  );
};

export default Message;
