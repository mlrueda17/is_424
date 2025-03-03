//Auth state
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User is logged in");
  } else {
    console.log("No user is logged in");
  }
});

//Login Submit Button
document.getElementById("loginSubmitButton").addEventListener("click", () => {
  let loginEmail = document.getElementById("loginEmail").value;
  let loginPassword = document.getElementById("loginPassword").value;
  auth
    .signInWithEmailAndPassword(loginEmail, loginPassword)
    .then((userCredential) => {
      alert("Signed In!");
      var user = userCredential.user;
    });
  console.log("Clicked");
});

//Signup Submit Button
document.getElementById("signupSubmitButton").addEventListener("click", () => {
  let signupEmail = document.getElementById("signupEmail").value;
  let singupPassword = document.getElementById("signupPassword").value;
  console.log("Clicked");
  auth
    .createUserWithEmailAndPassword(signupEmail, singupPassword)
    .then((userCredential) => {
      alert("Account Created!");
      var user = userCredential.user;
    });
});
