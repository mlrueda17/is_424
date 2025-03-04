//Auth state
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User is logged in");
    document.getElementById("loginLink").classList.add("d-none");
    document.getElementById("signupLink").classList.add("d-none");
    document.getElementById("signoutLink").classList.remove("d-none");
  } else {
    console.log("No user is logged in");
    document.getElementById("loginLink").classList.remove("d-none");
    document.getElementById("signupLink").classList.remove("d-none");
    document.getElementById("signoutLink").classList.add("d-none");
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
});

//Signup Submit Button
document.getElementById("signupSubmitButton").addEventListener("click", () => {
  let signupEmail = document.getElementById("signupEmail").value;
  let singupPassword = document.getElementById("signupPassword").value;
  auth
    .createUserWithEmailAndPassword(signupEmail, singupPassword)
    .then((userCredential) => {
      alert("Account Created!");
      var user = userCredential.user;
    });
});

//Signout Submit Button
document.getElementById("signoutLink").addEventListener("click", () => {
  auth.signOut().then(() => {
    alert("You are now signed out");
  });
});


// // code for notification modal 
// document.addEventListener("DOMContentLoaded", function () {
//   const modal = document.getElementById("notificationModal");
//   const bellIcon = document.getElementById("notificationBell");
//   const closeModal = document.querySelector(".close");

//   // Show modal when clicking the bell icon
//   bellIcon.addEventListener("click", function (event) {
//       event.preventDefault(); // Prevent default anchor behavior
//       modal.classList.add("show");
//   });

//   // Close modal when clicking the close button
//   closeModal.addEventListener("click", function () {
//       modal.classList.remove("show");
//   });

//   // Close modal when clicking outside of it
//   window.addEventListener("click", function (event) {
//       if (event.target === modal) {
//           modal.classList.remove("show");
//       }
//   });
// });

