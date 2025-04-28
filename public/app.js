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
document.getElementById("loginSubmitButton").addEventListener("click", (e) => {
  e.preventDefault();
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
document.getElementById("signupSubmitButton").addEventListener("click", (e) => {
  e.preventDefault();
  let signupEmail = document.getElementById("signupEmail").value;
  let singupPassword = document.getElementById("signupPassword").value;
  let full_name = document.getElementById("signupFullName").value;
  let role = "client";
  let timestamp = new Date();
  auth
    .createUserWithEmailAndPassword(signupEmail, singupPassword)
    .then((userCredential) => {
      alert("Account Created!");
      var user = userCredential.user;
      db.collection("internal_users").doc(user.uid).set({
        email: signupEmail,
        full_name: full_name,
        role: role,
        user_id: user.uid,
        timestamp: timestamp,
      });
    });
});

//Signout Submit Button
document.getElementById("signoutLink").addEventListener("click", () => {
  auth.signOut().then(() => {
    alert("You are now signed out");
  });
});

// code for notification modal
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("notificationModal");
  const bellIcon = document.getElementById("notificationBell");
  const closeModal = document.querySelector(".close");

  // Show modal when clicking the bell icon
  bellIcon.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    modal.classList.add("show");
  });

  // Close modal when clicking the close button
  closeModal.addEventListener("click", function () {
    modal.classList.remove("show");
  });

  // Close modal when clicking outside of it
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  });
});

// login modal
document.addEventListener("DOMContentLoaded", function () {
  const loginLink = document.getElementById("loginLink");
  const modalElement = document.getElementById("loginModal");

  if (loginLink && modalElement) {
    loginLink.addEventListener("click", function (event) {
      event.preventDefault();
      const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
      modal.show();
    });
  } else {
    console.error("loginLink or loginModal not found!");
  }
});

// signup modal
document.addEventListener("DOMContentLoaded", function () {
  const signupLink = document.getElementById("signupLink");
  const signupModal = document.getElementById("signupModal");

  if (signupLink && signupModal) {
    signupLink.addEventListener("click", function (event) {
      event.preventDefault();
      const modal = bootstrap.Modal.getOrCreateInstance(signupModal);
      modal.show();
    });
  } else {
    console.error("signupLink or signupModal not found!");
  }
});

// New Case modal
document.addEventListener("DOMContentLoaded", function () {
  const newCaseButton = document.getElementById("newCaseButton");
  const newCaseModal = document.getElementById("newCaseModal");

  if (newCaseButton && newCaseModal) {
    newCaseButton.addEventListener("click", function (event) {
      event.preventDefault();
      const modal = bootstrap.Modal.getOrCreateInstance(newCaseModal);
      modal.show();
    });
  } else {
    console.error("signupLink or signupModal not found!");
  }
});

// New Client modal
document.addEventListener("DOMContentLoaded", function () {
  const newClientButton = document.getElementById("newClientButton");
  const newClientModal = document.getElementById("newClientModal");

  if (newClientButton && newClientModal) {
    newClientButton.addEventListener("click", function (event) {
      event.preventDefault();
      const modal = bootstrap.Modal.getOrCreateInstance(newClientModal);
      modal.show();
    });
  } else {
    console.error("signupLink or signupModal not found!");
  }
});

// New Report modal
document.addEventListener("DOMContentLoaded", function () {
  const newReportButton = document.getElementById("newReportButton");
  const newReportModal = document.getElementById("newReportModal");

  if (newReportButton && newReportModal) {
    newReportButton.addEventListener("click", function (event) {
      event.preventDefault();
      const modal = bootstrap.Modal.getOrCreateInstance(newReportModal);
      modal.show();
    });
  } else {
    console.error("signupLink or signupModal not found!");
  }
});
// Quick actions new case to firebase
document
  .getElementById("newCaseSubmitButton")
  .addEventListener("click", (e) => {
    e.preventDefault();
    let casetitle = document.getElementById("newCaseTitle").value;
    let casedescription = document.getElementById("newCaseDescription").value;
    let casestatus = document.getElementById("newCaseStatus").value;
    let clientemail = document.getElementById("newCaseClientEmail").value;
    let duedate = document.getElementById("newCaseDueDate").value;
    db.collection("cases").add({
      title: casetitle,
      description: casedescription,
      status: casestatus,
      related_client: clientemail,
      due_date: duedate,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  });

// Quick actions Add client to Firebase
document
  .getElementById("newClientSubmitButton")
  .addEventListener("click", (e) => {
    e.preventDefault();
    let ClientFullName = document.getElementById("newClientFullName").value;
    let ClientEmail = document.getElementById("newClientEmail").value;
    db.collection("internal_users").add({
      ClientName: ClientFullName,
      ClientEmail: ClientEmail,
    });
  });

document
  .getElementById("newReportSubmitButton")
  .addEventListener("click", (e) => {
    e.preventDefault();
    let reporttitle = document.getElementById("newReportTitle").value;
    let reportcasetitle = document.getElementById("newReportCaseTitle").value;
    let reportfilepath = document.getElementById("newReportFilePath").value;
    db.collection("reports").add({
      ReportTitle: reporttitle,
      RelatedCaseTitle: reportcasetitle,
      FilePath: reportfilepath,
    });
  });
