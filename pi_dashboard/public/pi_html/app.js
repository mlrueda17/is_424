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

// Form submission for adding a new case
document
  .getElementById("caseForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("caseTitle").value;
    const description = document.getElementById("caseDescription").value;

    if (title && description) {
      // Add to Firestore
      db.collection("cases")
        .add({
          title: title,
          description: description,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          // Add the case to the UI
          loadCases();

          // Reset the form
          document.getElementById("caseForm").reset();
        })
        .catch((error) => {
          console.error("Error adding case:", error);
        });
    } else {
      console.error("Title or description is missing!");
    }
  });

// Function to display cases
function loadCases() {
  const caseList = document.getElementById("caseList");
  caseList.innerHTML = ""; // Clear existing cases

  db.collection("cases")
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        caseList.innerHTML =
          '<li class="list-group-item text-muted">No cases found</li>';
      } else {
        querySnapshot.forEach((doc) => {
          const caseData = doc.data();
          const caseId = doc.id;

          // Create list item with Bootstrap styling
          const listItem = document.createElement("li");
          listItem.className = "list-group-item";

          // Create case content with title, description, and delete button
          listItem.innerHTML = `
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <strong>${caseData.title}</strong>
              <p class="mb-1">${caseData.description}</p>
              ${
                caseData.timestamp
                  ? `<small class="text-muted">Added on ${caseData.timestamp
                      .toDate()
                      .toLocaleString()}</small>`
                  : ""
              }
            </div>
            <button class="btn btn-sm btn-danger delete-case" data-id="${caseId}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        `;

          caseList.appendChild(listItem);
        });

        // Add event listeners to all delete buttons
        document.querySelectorAll(".delete-case").forEach((button) => {
          button.addEventListener("click", function () {
            const caseId = this.getAttribute("data-id");
            deleteCase(caseId);
          });
        });
      }
    })
    .catch((error) => {
      console.error("Error getting cases:", error);
      caseList.innerHTML =
        '<li class="list-group-item text-danger">Error loading cases</li>';
    });
}

// Function to delete a case
function deleteCase(caseId) {
  if (confirm("Are you sure you want to delete this case?")) {
    db.collection("cases")
      .doc(caseId)
      .delete()
      .then(() => {
        console.log("Case successfully deleted!");
        loadCases(); // Refresh the list
      })
      .catch((error) => {
        console.error("Error removing case: ", error);
      });
  }
}
