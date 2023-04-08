const checkUserExists = (usersSnapshot, email) => {
  let isExists = false;
  isExists = usersSnapshot?.docs.some((eachDoc) => {
    if (eachDoc.data().email === email) {
      return true;
    }
  });

  return isExists;
};

export default checkUserExists;
