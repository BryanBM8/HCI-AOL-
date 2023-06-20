const modeToggle = document.getElementById('mode-toggle');
const body = document.body;
    
modeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
});

var signIn = document.getElementById('sign-in');
if(signIn){
    signIn.addEventListener("click", function(e){
        window.location.href = "./login.html";
    });
}

var signUp = document.getElementById('sign-up');
if(signUp){
    signUp.addEventListener("click", function(e){
        window.location.href = "./register.html";
    });
}