document.getElementById('form').addEventListener('submit', (event) =>{
    event.preventDefault()
    var email2 = document.getElementById("email").value
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var password = document.getElementById("password").value;
    var storePass = JSON.parse(localStorage.getItem('storePass'))
    if(email2 === ""){
        alert("Email must be filled out")
        return false;
    }else if(!email2.match(emailRegex)){
        alert("Email is not valid");
        return false
    }

    if(password === ""){
        alert("Password must be filled out")
        return false
    }else if(password.length < 8){
        alert("Password must be at least 8 characters long")
        return false
    }

    if(!storePass[email2]){
        alert("Email not registered");
        return false
    }
    if(storePass === null){
        alert("Email Not Registered");
        return false
    }
    if(password === storePass){
        alert("Log In Success");
        window.location.href = "/home.html";
        return true
    }else{
        alert("Password is incorrect");
        return false
    }
})

var createNow = document.getElementById('create')
    if(createNow){
        createNow.addEventListener("click", function(e){
            window.location.href = "/Html/register.html";
        });
    }
    
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    
    modeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
    });