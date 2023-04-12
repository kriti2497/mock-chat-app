import {
  Avatar,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { db } from '../../config/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import stringAvatar from '../../utils/avatarStyling';

const MemberCard = ({
  user,
  deleteUserFromGroup,
  isAdmin,
  chatSnapshot,
  userAuth,
}) => {
  const userRef = db.collection('users').where('email', '==', user);
  const [userSnapshot] = useCollection(userRef);
  return (
    <ListItem
      sx={{
        '&:hover': {
          backgroundColor: '#d3d3d34a',
        },
      }}
      alignItems='center'
    >
      <ListItemAvatar>
        <Avatar
          {...stringAvatar(
            userSnapshot ? userSnapshot.docs[0].data().name : ''
          )}
        />
      </ListItemAvatar>
      <ListItemText
        primary={userSnapshot ? userSnapshot.docs[0].data().name : 'User'}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component='span'
              variant='body2'
              color='text.primary'
            >
              {user}
            </Typography>
          </React.Fragment>
        }
      />
      {isAdmin && (
        <Typography
          sx={{
            fontSize: '12px',
            backgroundColor: '#4caf50',
            color: 'white',
            padding: '2px 5px',
            borderRadius: '5px',
          }}
        >
          Admin
        </Typography>
      )}

      {!isAdmin && chatSnapshot.data().admin.includes(userAuth) && (
        <Tooltip title={'Remove user'}>
          <PersonRemoveIcon
            onClick={() => deleteUserFromGroup(user)}
            sx={{
              cursor: 'pointer',
              color: 'grey',
            }}
          />
        </Tooltip>
      )}
    </ListItem>
  );
};

export default MemberCard;
