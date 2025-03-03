//Auth state
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User is logged in");
  } else {
    console.log("No user is logged in");
  }
});

// Log in Button
// login_submit_button.addEventListener("click", () => {
//   let login_email = document.getElementById("login_email").value;
//   let login_password = document.getElementById("login_password").value;
//   auth
//     .signInWithEmailAndPassword(login_email, login_password)
//     .then((userCredential) => {
//       alert("Signed In!");
//       login_modal.classList.remove("is-active");
//       var user = userCredential.user;
//     })
//     .catch((err) => {
//       console.log(err);
//       r_e("login_messages_div").classList.remove("is-hidden");
//       r_e("login_messages").innerHTML += err.message;
//       setTimeout(() => {
//         r_e("login_messages_div").classList.add("is-hidden");
//         r_e("login_messages").innerHTML = "";
//       }, 5000);
//     });

//   r_e("login_email").value = "";
//   r_e("login_password").value = "";
// });

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
