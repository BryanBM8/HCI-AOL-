document.getElementById('form').addEventListener('submit', (event) =>{
    event.preventDefault()
    var email2 = document.getElementById("email").value
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var password = document.getElementById("password").value;
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

    var storePassword = localStorage.getItem(email2);

    if(storePassword === null){
        alert("Email not Registered!");
        return false;
    }

    if(password === storePassword){
        alert("Log in Successful!");
        localStorage.setItem("loggedInEmail", email2);
        localStorage.setItem("password",password);
        window.location.href = "./dashboard.html";
        return true;
    }else{
        alert("Password is incorrect!");
        return false;
    }
})
  

var createNow = document.getElementById('create')
    if(createNow){
        createNow.addEventListener("click", function(e){
            window.location.href = "register.html";
        });
    }
    
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    
    modeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
    });

    function togglePasswordVisibility() {
        var passwordInput = document.getElementById("password");
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