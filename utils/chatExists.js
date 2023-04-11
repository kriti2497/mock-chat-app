const chatExists = (userEmail, chatSnapshot) => {
  let isExist = false;
  isExist = chatSnapshot?.some((eachDoc) => {
    if (
      eachDoc.data().users.length == 2 &&
      eachDoc.data().users.includes(userEmail)
    ) {
      return true;
    }
  });

  return isExist;
};

export default chatExists;
