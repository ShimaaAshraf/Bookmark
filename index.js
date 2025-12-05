const siteNameInput = document.getElementById('sitename');
const siteURLInput = document.getElementById('siteURL');
const submitButton = document.getElementById('btnSumbit');
let sitesList = [];
let updateIndex = null; // To keep track of the bookmark being updated

// Event Listeners
submitButton.onclick = handleSubmit;
siteURLInput.addEventListener('input', () => validateURL(siteURLInput));

// Load sites from local storage on startup
if (localStorage.getItem('data') != null) {
    sitesList = JSON.parse(localStorage.getItem('data'));
    displaySites();
}

// Handle form submission for both adding and updating
function handleSubmit() {
    if (!validateURL(siteURLInput) || siteNameInput.value === '') {
        window.alert("Please enter a valid Site Name and URL.");
        return;
    }

    const site = {
        sName: siteNameInput.value,
        sURL: siteURLInput.value
    };

    if (updateIndex !== null) {
        // Update existing site
        sitesList[updateIndex] = site;
        submitButton.textContent = 'Submit';
        updateIndex = null;
    } else {
        // Add new site
        sitesList.push(site);
    }

    localStorage.setItem('data', JSON.stringify(sitesList));
    displaySites();
    resetForm();
}

// Display sites in the table
function displaySites() {
    let tableContent = ``;
    for (let i = 0; i < sitesList.length; i++) {
        tableContent += `
            <tr>
                <td>${i + 1}</td>
                <td>${sitesList[i].sName}</td>
                <td><a target="_blank" href="${sitesList[i].sURL}"><button class="btn btn-secondary"><i class="fa-solid fa-eye pe-2"></i>Visit</button></a></td>
                <td><button onclick="prepareUpdate(${i})" class="btn btn-warning"><i class="fa-solid fa-pen-to-square"></i> Update</button></td>
                <td><button onclick="deleteSite(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i>Delete</button></td>
            </tr>`;
    }
    document.getElementById('tablebody').innerHTML = tableContent;
}

// Prepare form for updating a site
function prepareUpdate(index) {
    updateIndex = index;
    siteNameInput.value = sitesList[index].sName;
    siteURLInput.value = sitesList[index].sURL;
    submitButton.textContent = 'Update Bookmark';
    window.scrollTo(0, 0); // Scroll to top to see the form
}

// Reset form (clear form)
function resetForm() {
    siteNameInput.value = '';
    siteURLInput.value = '';
    siteNameInput.classList.remove('is-valid', 'is-invalid');
    siteURLInput.classList.remove('is-valid', 'is-invalid');
    if (updateIndex !== null) {
        submitButton.textContent = 'Submit';
        updateIndex = null;
    }
}

// Delete site
function deleteSite(index) {
    sitesList.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(sitesList)); //update local storage
    displaySites();
}

// Validate URL
function validateURL(element) {
    // A more robust regex that requires http:// or https://
    const regex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/;
    const urlValue = element.value;
    if (regex.test(urlValue)) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        return true;
    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        return false;
    }
}
