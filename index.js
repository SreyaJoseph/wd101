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

    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class='px-4 py-2'>${entry.name}</td>`;
        const emailCell = `<td class='px-4 py-2'>${entry.email}</td>`;
        const passwordCell = `<td class='px-4 py-2'>${entry.password}</td>`;
        const dobCell = `<td class='px-4 py-2'>${entry.dob}</td>`;
        const acceptTermsCell = `<td class='px-4 py-2'>${entry.acceptTerms ? "Yes" : "No"}</td>`;
        const row = `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const table = `
        <table class="table-auto w-full border border-gray-300 mt-4">
            <thead>
                <tr class="bg-gray-200">
                    <th class="px-4 py-2">Name</th>
                    <th class="px-4 py-2">Email</th>
                    <th class="px-4 py-2">Password</th>
                    <th class="px-4 py-2">DOB</th>
                    <th class="px-4 py-2">Accepted Terms?</th>
                </tr>
            </thead>
            <tbody>
                ${tableEntries}
            </tbody>
        </table>`;

    document.getElementById("user-entries").innerHTML = table;
}

function saveUserForm(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let acceptTerms = document.getElementById("acceptTerms").checked;

    const dobDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    const dayDiff = today.getDate() - dobDate.getDate();
    const exactAge = (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) ? age - 1 : age;

    if (exactAge < 18 || exactAge > 55) {
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

    // Optional: Reset form after submission
    userForm.reset();
}

userForm.addEventListener("submit", saveUserForm);

// Display on initial load
displayEntries();
