let userForm = document.getElementById("user-form");

function retrieveEntries() {
  return JSON.parse(localStorage.getItem("userEntries") || "[]");
}

function saveEntries(entries) {
  localStorage.setItem("userEntries", JSON.stringify(entries));
}

function displayEntries() {
  const entries = retrieveEntries();
  const userEntriesDiv = document.getElementById("user-entries");

  if (entries.length === 0) {
    userEntriesDiv.innerHTML = `<p class="text-center text-gray-500">No entries yet.</p>`;
    return;
  }

  const table = document.createElement("table");
  table.className = "table-auto w-full border border-gray-300 mt-4";

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr class="bg-gray-200">
      <th class="px-4 py-2">Name</th>
      <th class="px-4 py-2">Email</th>
      <th class="px-4 py-2">Password</th>
      <th class="px-4 py-2">DOB</th>
      <th class="px-4 py-2">Accepted Terms?</th>
    </tr>
  `;

  const tbody = document.createElement("tbody");
  entries.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-4 py-2">${entry.name}</td>
      <td class="px-4 py-2">${entry.email}</td>
      <td class="px-4 py-2">${entry.password}</td>
      <td class="px-4 py-2">${entry.dob}</td>
      <td class="px-4 py-2">${entry.accepted ? "Yes" : "No"}</td>
    `;
    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  userEntriesDiv.innerHTML = "";
  userEntriesDiv.appendChild(table);
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
