document.getElementById('form').addEventListener('submit', (event) =>{
    event.preventDefault()
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var user= document.getElementById("user").value
    var password = document.getElementById("password").value;
    var email2 = document.getElementById("mail2").value;
   
    if(user === ""){
        alert("Username must be filled out")
        return false;
    }else if(user.length < 8){
        alert("Username must be atleast 8 length");
        return false
    }
    if(email2 === ""){
        alert("Email must be filled out")
        return false
    }else if(!email2.match(emailRegex)){
        alert("Email is not valid")
        return false
    }
    if(password === ""){
        alert("Password must be filled out")
        return false
    }else if(password.length < 8){
        alert("Password must be at least 8 characters long")
        return false
    }
    if(localStorage.getItem(email2)){
        alert("Email already registered");
        return false
    }
    localStorage.setItem(email2, password);
    alert("Sign Up Success");
    window.location.href= './login.html'
    return true
})


var createNow = document.getElementById('create')
    if(createNow){
        createNow.addEventListener("click", function(e){
            window.location.href = "./login.html";
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
