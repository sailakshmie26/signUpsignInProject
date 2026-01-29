let users = JSON.parse(localStorage.getItem('users')) || []

let currentUser = null;

let signUpForm = document.getElementById('signUpForm');
let signInForm = document.getElementById('signInForm');

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

function showError(input, message){
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    input.nextElementSibling.textContent = message;
}

function showSuccess(input){
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    input.nextElementSibling.textContent = "";
}

function togglePassword(id){
    const input = document.getElementById(id);
    input.type = input.type === "password"? "text" : "password";
}

function register(){
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const number = document.getElementById('number');
    const city = document.getElementById('city');
    const password = document.getElementById('password');
    const confPassword = document.getElementById('confPassword');

    let isValid = true;

    if(name.value.trim().length < 3){
        showError(name, "Name must be atleast 3 characters");
        isValid = false;
    } else{
        showSuccess(name);
    }

    if(!email.value.includes("@")){
        showError(email, "Enter a valid email address");
        isValid = false;
    } else{
        showSuccess(email);
    }

    if(number.value.length !== 10){
        showError(number, "Enter a valid 10-digit number");
        isValid = false;
    } else{
        showSuccess(number);
    }

    if(city.value.trim() === ""){
        showError(city, "City cannot be empty");
        isValid = false;
    } else{
        showSuccess(city);
    }

    if(!passwordRegex.test(password.value)){
        showError(password, "Password must be at least 8 characters with letters & numbers");
        isValid = false;
    } else{
        showSuccess(password);
    }
    
    if(password.value !== confPassword.value){
        showError(confPassword, "Passwords do not match!")
        isValid = false;
    } else{
        showSuccess(confPassword)
    }

    if(!isValid){
        return
    }

    const existingUser = users.find(user => 
        user.email === email.value || user.number === number.value
    );

    if(existingUser){
        showError(email, "Email or phone already registered");
        showError(number, "Email or phone already registered");
        return;
    }


const newUser = {
    id:Date.now(),
    name: name.value.trim(),
    email:email.value,
    number:number.value,
    city:city.value.trim(),
    password:password.value
};

    users.push(newUser);
    updateStorage();

   signUpForm.reset();
   alert("User registered successfully!")

}


function logIn(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if(!email || !password){
        return alert("Fill all fields!")
    }

    const user = users.find(user => user.email === email);

    if(!user){
        alert("User  not registered!")
        return 
    }

    if(user.password !== password){
        alert("Invalid credentials!")
        return;
    }

    currentUser = user;
    localStorage.setItem("currentUser",JSON.stringify(currentUser));

    window.location.href = "travelApp.html";

}


signUpForm?.addEventListener("submit", (e) =>{
    e.preventDefault();
    register();
})

signInForm?.addEventListener("submit", (e)=>{
    e.preventDefault();
    logIn();
})

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () =>{
        input.classList.remove("is-invalid")
    })
})

function check(){
    const isLogged = JSON.parse(localStorage.getItem('currentUser'))
    if(!isLogged){
        window.location.href = "signIn.html"
    }
}

function updateStorage(){
    localStorage.setItem('users',JSON.stringify(users))
}

function logOut(){
    localStorage.removeItem("currentUser");
    window.location.href = "signIn.html"
}