let userForm = document.getElementById("user-form");

function retrieveEntries() {
    let entries = localStorage.getItem("userEntries");
    if (entries){
        entries = JSON.parse(entries);
    }
    else {
        entries = [];
    }
    return entries;
}

let userEntries = retrieveEntries();

function displayEntries(){


    const entries = retrieveEntries();
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class= 'px-4 py-2'>${entry.name}</td>`;
        const emailCell = `<td class= 'px-4 py-2'>${entry.email}</td>`;
        const passwordCell = `<td class= 'px-4 py-2'>${entry.password}</td>`;
        const dobCell = `<td class= 'px-4 py-2'>${entry.dob}</td>`;
        const acceptTermsCell = `<td class= 'px-4 py-2'>${entry.acceptTerms ? "Yes" : "No"}</td>`;
        const row = `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");


const table = `<table class="table-auto w-full"> <tr>
<th class="px-4 py-2">Name</th>
<th class="px-4 py-2">Email</th> 
<th class="px-4 py-2">Password</th>  
<th class="px-4 py-2">Date of Birth</th>
<th class="px-4 py-2">Accept Terms</th>
</tr>${tableEntries}</table>`;

let details = document.getElementById("user-entries");
    details.innerHTML = table;
}
function saveUserForm(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let acceptTerms = document.getElementById("acceptTerms").checked;
    console.log(name, email, password, dob, acceptTerms);


    const dobDate = new Date(dob);
    const today = new Date();
    const ageDiff = today - dobDate;
    const ageDate = new Date(ageDiff);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55 years.");
        return; // Stop form submission
    }


    const entry = {
        name,
        email,
        password,
        dob,
        acceptTerms
    };

    userEntries.push(entry);
    localStorage.setItem("userEntries", JSON.stringify(userEntries));
    displayEntries(); // Refresh the displayed entries
}

userForm.addEventListener("submit", saveUserForm); 
displayEntries(); // Call displayEntries to show existing entries on page load