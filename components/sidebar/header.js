import { Avatar, Button, Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';
import AuthContext from '../../context/auth-context';
import stringAvatar from '../../utils/avatarStyling';

const Header = ({ currentUser }) => {
  const { logout } = useContext(AuthContext);
  return (
    <Grid
      item
      display='flex'
      alignItems={'center'}
      justifyContent={'space-between'}
      p={2}
      sx={{
        position: 'sticky',
        top: '0',
        backgroundColor: 'white',
        zIndex: 1000,
        borderBottom: '1px solid #f1f1f1',
      }}
    >
      <Avatar {...stringAvatar(currentUser.toUpperCase())} />
      <Typography>{currentUser}</Typography>
      <Button variant='contained' onClick={logout}>
        Logout
      </Button>
    </Grid>
  );
};

export default Header;
