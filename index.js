const userForm = document.getElementById("user-form");

const retrieveEntries = () => {
  const entries = localStorage.getItem("user-entries");
  return entries ? JSON.parse(entries) : [];
};

const displayEntries = () => {
  const entries = retrieveEntries();
  const tableBody = document.getElementById("table-body");

  tableBody.innerHTML = "";

  entries.forEach(entry => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="border px-4 py-2">${entry.name}</td>
      <td class="border px-4 py-2">${entry.email}</td>
      <td class="border px-4 py-2">${entry.password}</td>
      <td class="border px-4 py-2">${entry.dob}</td>
      <td class="border px-4 py-2">${entry.acceptedTerms ? "Yes" : "No"}</td>
    `;

    tableBody.appendChild(row);
  });
};

const isValidAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18 && age <= 55;
};

const saveUserForm = (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTerms = document.getElementById("acceptTerms").checked;

  if (!isValidAge(dob)) {
    alert("Age must be between 18 and 55 years.");
    return;
  }

  const entry = { name, email, password, dob, acceptedTerms };

  const userEntries = retrieveEntries();
  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));

  displayEntries();
  userForm.reset();
};

userForm.addEventListener("submit", saveUserForm);
window.addEventListener("DOMContentLoaded", displayEntries);
