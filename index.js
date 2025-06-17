index.js 

let userForm = document.getElementById("user-form");

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

const displayEntries = () => {
  const entries = retrieveEntries();

  const tableEntries = entries
    .map((entry) => {
      const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
      const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
      const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
      const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
      const acceptedTermsAndConditionsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndConditions}</td>`;
      return `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptedTermsAndConditionsCell}</tr>`;
    })
    .join("\n");

  const tbody = document.getElementById("user-entries");
  tbody.innerHTML = tableEntries;
};

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

const saveUserForm = (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTermsAndConditions =
    document.getElementById("acceptTerms").checked;

  if (!isValidAge(dob)) {
    alert("Age must be between 18 and 55 years.");
    return;
  }

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndConditions,
  };

  const userEntries = retrieveEntries();
  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
  userForm.reset();
};

userForm.addEventListener("submit", saveUserForm);
displayEntries();