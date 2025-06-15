let userForm = document.getElementById("user-form");

function retrieveEntries() {
  return JSON.parse(localStorage.getItem("userEntries") || "[]");
}

function saveEntries(entries) {
  localStorage.setItem("userEntries", JSON.stringify(entries));
}

function displayEntries() {
  const entries = retrieveEntries();
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  entries.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class='px-4 py-2'>${entry.name}</td>
      <td class='px-4 py-2'>${entry.email}</td>
      <td class='px-4 py-2'>${entry.password}</td>
      <td class='px-4 py-2'>${entry.dob}</td>
      <td class='px-4 py-2'>${entry.accepted ? "Yes" : "No"}</td>
    `;
    tableBody.appendChild(row);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18 && age <= 55;
}

function saveUserForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const accepted = document.getElementById("acceptTerms").checked;

  if (!isValidEmail(email)) {
    alert("Please enter a valid email.");
    return;
  }

  if (!isValidAge(dob)) {
    alert("Age must be between 18 and 55 years.");
    return;
  }

  const newEntry = { name, email, password, dob, accepted };
  const entries = retrieveEntries();
  entries.push(newEntry);
  saveEntries(entries);
  displayEntries();
  userForm.reset();
}

userForm.addEventListener("submit", saveUserForm);
window.addEventListener("DOMContentLoaded", displayEntries);
