//Auth state
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User is logged in");
    document.getElementById("loginLink").classList.add("d-none");
    document.getElementById("signupLink").classList.add("d-none");
    document.getElementById("signoutLink").classList.remove("d-none");
    document.getElementById("notificationBell").classList.remove("d-none");
    document.getElementById("activeCases").innerHTML = "";
    document.getElementById("solvedCases").innerHTML = "";
    document.getElementById("activeClients").innerHTML = "";
    document.getElementById("pendingReports").innerHTML = "";
    document.getElementById("recentCasesList").innerHTML = "";
    activeCases();
    solvedCases();
    activeClients();
    pendingReports();
    recentCases();
  } else {
    console.log("No user is logged in");
    document.getElementById("loginLink").classList.remove("d-none");
    document.getElementById("signupLink").classList.remove("d-none");
    document.getElementById("signoutLink").classList.add("d-none");
    document.getElementById("notificationBell").classList.add("d-none");
    document.getElementById("activeCases").innerHTML = "";
    document.getElementById("solvedCases").innerHTML = "";
    document.getElementById("activeClients").innerHTML = "";
    document.getElementById("pendingReports").innerHTML = "";
    document.getElementById("recentCasesList").innerHTML = "";
    activeCases();
    solvedCases();
    activeClients();
    pendingReports();
    recentCases();
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
      // alert("Signed In!");
      var user = userCredential.user;
      document.getElementById("loginEmail").value = "";
      document.getElementById("loginPassword").value = "";
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
      document.getElementById("signupEmail").value = "";
      document.getElementById("signupPassword").value = "";
      document.getElementById("signupFullName").value = "";
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
  const modalElement = document.getElementById("notificationModal");
  const bellIcon = document.getElementById("notificationBell");
  bellIcon.addEventListener("click", function (event) {
    event.preventDefault();
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
  });
});

// login modal
document.addEventListener("DOMContentLoaded", function () {
  const loginLink = document.getElementById("loginLink");
  const modalElement = document.getElementById("loginModal");
  loginLink.addEventListener("click", function (event) {
    event.preventDefault();
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
  });
});

// signup modal
document.addEventListener("DOMContentLoaded", function () {
  const signupLink = document.getElementById("signupLink");
  const signupModal = document.getElementById("signupModal");

  signupLink.addEventListener("click", function (event) {
    event.preventDefault();
    const modal = bootstrap.Modal.getOrCreateInstance(signupModal);
    modal.show();
  });
});

// New Case modal
document.addEventListener("DOMContentLoaded", function () {
  const newCaseButton = document.getElementById("newCaseButton");
  const newCaseModal = document.getElementById("newCaseModal");
  newCaseButton.addEventListener("click", function (event) {
    event.preventDefault();
    const modal = bootstrap.Modal.getOrCreateInstance(newCaseModal);
    modal.show();
  });
});

// New Client modal
document.addEventListener("DOMContentLoaded", function () {
  const newClientButton = document.getElementById("newClientButton");
  const newClientModal = document.getElementById("newClientModal");
  newClientButton.addEventListener("click", function (event) {
    event.preventDefault();
    const modal = bootstrap.Modal.getOrCreateInstance(newClientModal);
    modal.show();
  });
});

// New Report modal
document.addEventListener("DOMContentLoaded", function () {
  const newReportButton = document.getElementById("newReportButton");
  const newReportModal = document.getElementById("newReportModal");
  newReportButton.addEventListener("click", function (event) {
    event.preventDefault();
    const modal = bootstrap.Modal.getOrCreateInstance(newReportModal);
    modal.show();
  });
});

// Find ID of client
async function findId(email) {
  const data = await db
    .collection("internal_users")
    .where("email", "==", email)
    .get();

  const mydocs = data.docs;
  if (mydocs.length > 0) {
    return mydocs[0].id;
  } else {
    return null;
  }
}

// Quick actions new case to firebase
document
  .getElementById("newCaseSubmitButton")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    let casetitle = document.getElementById("newCaseTitle").value;
    let casedescription = document.getElementById("newCaseDescription").value;
    let casestatus = document.getElementById("newCaseStatus").value;
    let clientemail = document.getElementById("newCaseClientEmail").value;
    let duedate = new Date(document.getElementById("newCaseDueDate").value);
    let assigned_investigator_email = auth.currentUser.email;
    let assigned_investigator_id = auth.currentUser.uid;
    let userID = await findId(clientemail);
    db.collection("cases")
      .add({
        title: casetitle,
        description: casedescription,
        status: casestatus,
        related_client: clientemail,
        due_date: duedate,
        timestamp: new Date(),
        assigned_investigator: assigned_investigator_email,
        assigned_investigator_id: assigned_investigator_id,
        related_user_id: userID,
      })
      .then(() => {
        document.getElementById("newCaseForm").reset();
        alert("New Case Added!");
      });
  });

// Quick actions Add client to Firebase
document
  .getElementById("newClientSubmitButton")
  .addEventListener("click", (e) => {
    e.preventDefault();
    let ClientFullName = document.getElementById("newClientFullName").value;
    let ClientEmail = document.getElementById("newClientEmail").value;
    db.collection("internal_users")
      .add({
        full_name: ClientFullName,
        email: ClientEmail,
        timestamp: new Date(),
        role: "client",
        note: "created by investigator",
      })
      .then(() => {
        document.getElementById("newClientForm").reset();
        alert("New Client Added!");
      });
  });

document
  .getElementById("newReportSubmitButton")
  .addEventListener("click", (e) => {
    e.preventDefault();
    let reporttitle = document.getElementById("newReportTitle").value;
    let reportcasetitle = document.getElementById("newReportCaseTitle").value;
    let reportfilepath = document.getElementById("newReportFilePath").value;
    let generated_by = auth.currentUser.uid;
    db.collection("reports")
      .add({
        report_title: reporttitle,
        related_case_title: reportcasetitle,
        file_path: reportfilepath,
        generated_by: generated_by,
        timestamp: new Date(),
      })
      .then(() => {
        document.getElementById("newReportForm").reset();
        alert("New Report Added!");
      });
  });

// Find active cases
function activeCases() {
  db.collection("cases")
    .where("status", "==", "Active")
    .get()
    .then((data) => {
      mydocs = data.docs;
      let active_cases = mydocs.length;
      document.getElementById("activeCases").innerHTML = "";
      document.getElementById("activeCases").innerHTML = active_cases;
      document.getElementById("caseProgressReminder").innerHTML = "";
      document.getElementById("caseProgressReminder").innerHTML = active_cases;
    });
}

// Find solved cases
function solvedCases() {
  db.collection("cases")
    .where("status", "==", "Complete")
    .get()
    .then((data) => {
      mydocs = data.docs;
      let solved_cases = mydocs.length;
      document.getElementById("solvedCases").innerHTML = "";
      document.getElementById("solvedCases").innerHTML = solved_cases;
      document.getElementById("clientMeetingReminder").innerHTML = "";
      document.getElementById("clientMeetingReminder").innerHTML = solved_cases;
    });
}

// Find active clients
function activeClients() {
  db.collection("internal_users")
    .where("role", "==", "client")
    .get()
    .then((data) => {
      mydocs = data.docs;
      let active_clients = mydocs.length;
      document.getElementById("activeClients").innerHTML = "";
      document.getElementById("activeClients").innerHTML = active_clients;
    });
}

function pendingReports() {
  let week_from_now = new Date(Date.now() + 604800000);

  db.collection("cases")
    .where("due_date", "<", week_from_now)
    .get()
    .then((data) => {
      mydocs = data.docs;
      let due_soon = mydocs.length;
      document.getElementById("pendingReports").innerHTML = "";
      document.getElementById("pendingReports").innerHTML = due_soon;
      document.getElementById("pendingReportReminder").innerHTML = "";
      document.getElementById("pendingReportReminder").innerHTML = due_soon;
    });
}

function newCases() {
  let three_days_ago = new Date(Date.now() - 259200000);

  db.collection("cases")
    .orderBy("timestamp", "desc")
    .where("timestamp", ">", three_days_ago)
    .get()
    .then((data) => {
      mydocs = data.docs;
      let recent_cases = mydocs.length;
      document.getElementById("totalNotifications").innerHTML = "";
      document.getElementById("totalNotifications").innerHTML = recent_cases;
      document.getElementById("notificationBody").innerHTML = "";
      mydocs.forEach((d) => {
        let case_title = d.data().title;
        document.getElementById(
          "notificationBody"
        ).innerHTML += `<li class="mb-3"><i style="color:gold" class="fa-solid fa-bell"></i> Recently Added Case: ${case_title}</li>`;
      });
    });
}

newCases();

// Display cases on main page
function recentCases() {
  const recentCaseList = document.getElementById("recentCasesList");
  recentCaseList.innerHTML = ""; // Clear existing cases

  db.collection("cases")
    .orderBy("timestamp", "desc")
    .limit(5)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        recentCaseList.innerHTML =
          '<li class="list-group-item text-muted">No cases found</li>';
      } else {
        querySnapshot.forEach((doc) => {
          const caseData = doc.data();
          const caseId = doc.id;

          // Create list item with Bootstrap styling
          const tableRow = document.createElement("tr");

          // Create case content with title, description, and delete button
          tableRow.innerHTML = `
                    <td>${caseId}</td>
                    <td>${caseData.title}</td>
                    <td>${caseData.related_client}</td>
                    <td>${caseData.assigned_investigator}</td>
                    <td>${caseData.status}</td>
                    <td>${caseData.due_date.toDate().toLocaleDateString()}</td>
        `;

          recentCaseList.appendChild(tableRow);
        });
      }
    })
    .catch((error) => {
      console.error("Error getting cases:", error);
      recentCaseList.innerHTML =
        '<li class="list-group-item text-danger">Error loading cases</li>';
    });
}
