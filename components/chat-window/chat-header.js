import { Avatar, Grid, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import stringAvatar from '../../utils/avatarStyling';
import getRecipientEmail from '../../utils/getRecipientEmail';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GroupSettings from '../group-chat/group-settings';

const ChatHeader = ({ chatSnapshot, userAuth }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
      <Typography marginLeft={2} flex={1}>
        {chatSnapshot ? chatTitleDisplay(chatSnapshot?.data()) : ''}
      </Typography>

      {chatSnapshot?.data().isGroup && (
        <Typography sx={{ cursor: 'pointer', marginRight: '10px' }}>
          <MoreVertIcon onClick={handleClick} />
        </Typography>
      )}

      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => setOpenModal(true)}>Manage Group</MenuItem>
      </Menu>

      <GroupSettings
        chatSnapshot={chatSnapshot}
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
    </Grid>
  );
};

export default ChatHeader;
