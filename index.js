document.getElementById('form').addEventListener('submit', (event) =>{
    event.preventDefault()
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value;
    if(email === ""){
        alert("Email must be filled out")
        return false;
    }else if(email.indexOf("@") === -1){
        return false
    }
    if(password === ""){
        alert("Password must be filled out")
        return false
    }else if(password.length < 8){
        alert("Password must be at least 8 characters long")
        return false
    }
    alert("Log In Success");
    window.location.href= './Html/home.html'
})

var createNow = document.getElementById('create')
    if(createNow){
        createNow.addEventListener("click", function(e){
            window.location.href = "./Html/register.html";
        });
    }
    
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    
    modeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
    });