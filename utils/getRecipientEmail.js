const getRecipientEmail = (usersArray, userEmail) => {
  return usersArray.filter((eachUser) => eachUser !== userEmail)[0];
};

export default getRecipientEmail;
