var emailList = [];

emailList = JSON.parse(localStorage.getItem("emailList")) || [];

document.getElementById('emailuser').addEventListener('submit', (event) => {
    event.preventDefault();

    const useremail = document.getElementById('email').value;
    console.log(useremail);

    if (!useremail) {
        alert('Email can\'t be empty');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(useremail)) {
        alert('Invalid email format');
        return;
    }

    const existingEmail = emailList.find((email) => email.useremail === useremail);
    if (existingEmail) {
        alert('Email already exists');
        return;
    }

    emailList.push({ useremail, role: '' });

    localStorage.setItem('emailList', JSON.stringify(emailList));
    alert('New email already submitted');

    displayEmailList();
});

document.getElementById('resetButton').addEventListener('click', () => {
    localStorage.removeItem('emailList');
    emailList = [];
    displayEmailList();
    alert('Data reset successfully');
});

function displayEmailList() {
    const emailListElement = document.getElementById('emailList');
    emailListElement.innerHTML = '';

    emailList.forEach((email, index) => {
        const emailDiv = document.createElement('div');
        emailDiv.textContent = email.useremail;

        const roleSelect = document.createElement('select');
        roleSelect.addEventListener('change', (event) => {
            const newRole = event.target.value;
            updateRole(index, newRole);
        });

        const optionUser = document.createElement('option');
        optionUser.value = 'member';
        optionUser.textContent = 'Member';
        roleSelect.appendChild(optionUser);

        const optionAdmin = document.createElement('option');
        optionAdmin.value = 'leader';
        optionAdmin.textContent = 'Leader';
        roleSelect.appendChild(optionAdmin);

        emailDiv.appendChild(roleSelect);
        emailListElement.appendChild(emailDiv);
    });
}

function updateRole(index, role) {
    const email = emailList[index];
    email.role = role;
    localStorage.setItem('emailList', JSON.stringify(emailList));
    alert(`Role updated successfully for ${email.useremail}`);
}

displayEmailList();
