//Auth state
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User is logged in");
  } else {
    console.log("No user is logged in");
  }
});
