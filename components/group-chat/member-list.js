import { Grid, List, Tooltip, Typography } from '@mui/material';
import React from 'react';
import MemberCard from './member-card';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { db } from '../../config/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import checkUserExists from '../../utils/checkUserExists';

const MemberList = ({ chatSnapshot, userAuth }) => {
  const userRef = db.collection('users');
  const [userSnapshot] = useCollection(userRef);

  const deleteUserFromGroup = (useremail) => {
    const confirm = window.confirm(
      'Are you sure you want to remove this user?'
    );

    if (!confirm) {
      return;
    }

    if (chatSnapshot.data().admin.includes(useremail)) {
      alert('Cannot delete admin');
      return;
    }

    const updatedGroupMembers = chatSnapshot
      .data()
      .users.filter((each) => each !== useremail);

    db.collection('chats')
      .doc(chatSnapshot.id)
      .set(
        {
          users: updatedGroupMembers,
        },
        {
          merge: true,
        }
      )
      .then(() => {
        alert('User removed from group');
      })
      .catch((err) => {
        alert('Something went wrong');
      });
  };

  const userAlreadyInGroup = (newUser, usersInGroup) => {
    let isPresent = false;
    isPresent = usersInGroup.some((user) => {
      if (user === newUser) {
        return true;
      }
    });

    return isPresent;
  };
  const addUsertoGroup = () => {
    const availableUsers = userSnapshot?.docs.filter(
      (eachUserInDB) =>
        !chatSnapshot.data().users.includes(eachUserInDB.data().email)
    );

    const newUser =
      prompt(`Enter user email, Kindly add one user at a time\n\nUsers available to add:${availableUsers.map(
        (each) => '\n' + each.data().email
      )}
  `).trim();

    if (!newUser) {
      alert('Please enter user email');
      return;
    }

    if (!checkUserExists(userSnapshot, newUser)) {
      alert('User doesnt exist in DB');
      return;
    }

    if (userAlreadyInGroup(newUser, chatSnapshot.data().users)) {
      alert('User already present in group');
      return;
    }

    const updatedGroupMembers = [...chatSnapshot.data().users, newUser];

    db.collection('chats')
      .doc(chatSnapshot.id)
      .set(
        {
          users: updatedGroupMembers,
        },
        {
          merge: true,
        }
      )
      .then(() => {
        // alert('User added to group');
      })
      .catch((err) => {
        alert('Something went wrong');
      });
  };
  return (
    <Grid
      sx={{
        maxHeight: '400px',
        overflowY: 'scroll',
      }}
    >
      <Grid
        display='flex'
        alignItems={'center'}
        justifyContent={'space-between'}
        p={2}
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: 'white',
          borderBottom: '0.5px solid lightgray',
        }}
      >
        <Typography>Members in this group</Typography>
        {chatSnapshot.data().admin.includes(userAuth) && (
          <Tooltip title='Add a user'>
            <PersonAddIcon
              onClick={addUsertoGroup}
              sx={{
                cursor: 'pointer',
              }}
            />
          </Tooltip>
        )}
      </Grid>
      <Grid>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {chatSnapshot &&
            chatSnapshot?.data().users.map((eachUser, index) => {
              return (
                <MemberCard
                  chatSnapshot={chatSnapshot}
                  userAuth={userAuth}
                  isAdmin={chatSnapshot?.data().admin.includes(eachUser)}
                  deleteUserFromGroup={deleteUserFromGroup}
                  key={index}
                  user={eachUser}
                />
              );
            })}
        </List>
      </Grid>
    </Grid>
  );
};

export default MemberList;
