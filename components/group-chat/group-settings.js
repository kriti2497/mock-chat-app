import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Modal,
  Typography,
} from '@mui/material';
import React from 'react';
import MemberList from './member-list';
import ModalHeader from './modal-header';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  outline: 'none',
  overflow: 'hidden',
};

const GroupSettings = ({ open, handleClose, chatSnapshot, userAuth }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='parent-modal-title'
      aria-describedby='parent-modal-description'
    >
      <Box sx={{ ...style, width: 500 }}>
        <ModalHeader
          groupName={chatSnapshot ? chatSnapshot.data().groupName : ''}
        />
        <MemberList chatSnapshot={chatSnapshot} userAuth={userAuth} />
      </Box>
    </Modal>
  );
};

export default GroupSettings;
