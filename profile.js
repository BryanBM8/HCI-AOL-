var file = document.getElementById("Img");
var image = document.getElementById("profileimg");

image.addEventListener("click", function() {
    file.click();
});

file.addEventListener("change", function(e) {
    var selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type.includes("image")) {
        var reader = new FileReader();

        reader.onload = function(event) {
            image.src = event.target.result;
        };

        reader.readAsDataURL(selectedFile);
    } else {
        alert("Mohon pilih file gambar yang valid.");
        file.value = null;
    }
});


function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function toggleEdit() {
    var nameInput = document.getElementById("nameInput");
    var dateInput = document.getElementById("dateInput");
    var passwordInput= document.getElementById("passwordInput");
    var emailInput=document.getElementById("emailInput");
    var editButton = document.getElementById("editButton");

    if (nameInput.hasAttribute("readonly")) {
        nameInput.removeAttribute("readonly");
        dateInput.removeAttribute("readonly");
        emailInput.removeAttribute("readonly");
        passwordInput.removeAttribute("readonly");
        editButton.textContent = "Save";
        nameInput.focus();
    } else {
        nameInput.setAttribute("readonly", true);
        dateInput.setAttribute("readonly", true);
        emailInput.setAttribute("readonly", true);
        var emailValue = emailInput.value;
        if (!validateEmail(emailValue)) {
            alert("Mohon masukkan email yang valid.");
            return;
        }
        passwordInput.setAttribute("readonly", true);
        editButton.textContent = "Edit";
        saveToLocalStorage();
    }
}

function saveToLocalStorage() {
    var nameInput = document.getElementById("nameInput");
    var dateInput = document.getElementById("dateInput");
    var emailInput=document.getElementById("emailInput");
    var passwordInput= document.getElementById("passwordInput");
    var nameValue = nameInput.value;
    var dateValue = dateInput.value;
    var emailValue= emailInput.value;    var passwordValue= passwordInput.value;
    localStorage.setItem("savedName", nameValue);
    localStorage.setItem("savedDate", dateValue);
    localStorage.setItem("savedPassword", passwordValue);
    localStorage.setItem("saveEmail",emailValue);
}

var savedName = localStorage.getItem("savedName");
var savedDate = localStorage.getItem("savedDate");
var savedEmail=localStorage.getItem("savedEmail");
var savedPassword = localStorage.getItem("savedPassword");
var nameInput = document.getElementById("nameInput");
var dateInput = document.getElementById("dateInput");
var emailInput=document.getElementById("emailInput");
var passwordInput=document.getElementById("passwordInput");
if (savedName) {
    nameInput.value = savedName;
}
if (savedDate) {
    dateInput.value = savedDate;
}
if (savedEmail) {
    emailInput.value = savedEmail;
}
if (savedPassword) {
    passwordInput.value = savedPassword;
}



function togglePasswordVisibility() {
    var passwordInput = document.getElementById("passwordInput");
    var toggleButton = document.getElementById("toggleButton");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleButton.textContent = "Hide";
        passwordInput.setAttribute("data-visible", "true");
    } else {
        passwordInput.type = "password";
        toggleButton.textContent = "Show";
        passwordInput.setAttribute("data-visible", "false");
    }

 
}
    var editButton = document.getElementById("editButton");
    editButton.addEventListener("click", toggleEdit);

    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    
    modeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
    });