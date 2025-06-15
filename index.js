let userForm = document.getElementById("user-form");

function retrieveEntries() {
    let entries = localStorage.getItem("userEntries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
}

function displayEntries() {
    const entries = retrieveEntries();
    const tableBody = document.querySelector("#entriesTable tbody");
    tableBody.innerHTML = "";

    entries.forEach((entry) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td class='px-4 py-2'>${entry.name}</td>
          <td class='px-4 py-2'>${entry.email}</td>
          <td class='px-4 py-2'>${entry.password}</td>
          <td class='px-4 py-2'>${entry.dob}</td>
          <td class='px-4 py-2'>${entry.acceptTerms ? "Yes" : "No"}</td>
        `;
        tableBody.appendChild(row);
    });
}

function saveUserForm(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let acceptTerms = document.getElementById("acceptTerms").checked;

    // Optional: Add email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Improved age validation
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55 years.");
        return;
    }

    const newEntry = {
        name,
        email,
        password,
        dob,
        acceptTerms
    };

    const entries = retrieveEntries();
    entries.push(newEntry);
    localStorage.setItem("userEntries", JSON.stringify(entries));
    displayEntries();

    userForm.reset();
}

userForm.addEventListener("submit", saveUserForm);
displayEntries();
