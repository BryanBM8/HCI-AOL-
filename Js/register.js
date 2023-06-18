document.getElementById('form').addEventListener('submit', (event) =>{
    event.preventDefault()
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value;
    var email2 = document.getElementById("mail2").value;
    if(email === ""){
        alert("Username must be filled out")
        return false;
    }else if(email.length < 8){
        alert("Username must be atleast 8 length");
        return false
    }
    if(email2 === ""){
        alert("Email must be filled out")
        return false
    }else if(!email2.endsWith('@gmail.com')){
        alert("Email must be use gmail")
        return false
    }
    if(password === ""){
        alert("Password must be filled out")
        return false
    }else if(password.length < 8){
        alert("Password must be at least 8 characters long")
        return false
    }
    alert("Sign Up Success");
    window.location.href= '/index.html'
})

var createNow = document.getElementById('create')
    if(createNow){
        createNow.addEventListener("click", function(e){
            window.location.href = "/index.html";
        });
    }
    
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    
    modeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
    });