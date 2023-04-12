import { Avatar, Grid, Typography } from '@mui/material';
import React from 'react';
import stringAvatar from '../../utils/avatarStyling';

const ModalHeader = ({ groupName }) => {
  return (
    <Grid
      display={'flex'}
      sx={{
        padding: '15px',
        borderBottom: '1px solid lightgrey',
      }}
      alignItems='center'
    >
      <Avatar {...stringAvatar(groupName.toUpperCase())} />
      <Typography
        sx={{
          paddingLeft: '10px',
        }}
      >
        {groupName}
      </Typography>
    </Grid>
  );
};

export default ModalHeader;
