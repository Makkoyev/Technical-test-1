// Validation + Disable button if no inputs
var fullName = document.querySelectorAll('.fullName input');
var registerButton = document.getElementById('registerButton');
var app = document.getElementById('app');
var birthDate = document.querySelectorAll('.date input');
var docSection = document.querySelectorAll('.document')[0].childNodes[3].childNodes;
var selectGender = document.querySelectorAll('input[type="radio"]');
var emailAddress = document.querySelectorAll('.email input');
var password = document.querySelectorAll('.password input');
var checkedGender = [];
var errors = true;

registerButton.setAttribute("disabled", null);

//VALIDATIONS 
fullName.forEach(event =>{
    event.addEventListener("input", function(){
        this.addEventListener("input", function(){
            if (fullName[0].value.length >= 4 && fullName[1].value.length >= 4) {
                registerButton.removeAttribute("disabled");
            } else {
                registerButton.setAttribute("disabled", null);
            }
        })
    })
})

birthDate.forEach(event =>{
    event.addEventListener("input", function(){
        this.addEventListener("input", function(){
            if (birthDate[0].value.length == 2 && birthDate[1].value.length == 2 && birthDate[2].value.length == 4) {
                registerButton.removeAttribute("disabled");
            } else {
                registerButton.setAttribute("disabled", null);
            }
        })
    })
})


docSection[3].addEventListener('input', function(){
    if (docSection[3].value.length >= 9) {
        registerButton.removeAttribute("disabled");
    } else {
        registerButton.setAttribute("disabled", null);
    }
})

selectGender.forEach(event =>{
    event.addEventListener("change", function(){
        if(this.checked){
            checkedGender = [];
            checkedGender.push(event.value);
        }
    })
})

emailAddress.forEach(event =>{
    event.addEventListener("input", function(){
        if (emailAddress[0].value == emailAddress[1].value && emailAddress[0].value.includes("@") && emailAddress[1].value.includes("@")) {
            registerButton.removeAttribute("disabled");
        } else {
            registerButton.setAttribute("disabled", null);
        }
    })
})
password.forEach(event =>{
    event.addEventListener("input", function(){
        if (password[0].value == password[1].value) {
            registerButton.removeAttribute("disabled");
        } else {
            registerButton.setAttribute("disabled", null);
        }
    })
})
function registerUser() {
    //URL FOR FETCHING USERS
    var url = 'https://my-json-server.typicode.com/makkoyev/json/users';

    fetch(url)
    .then(function (response) {
        console.log("Response Status: " + response.status, response);
        return response.json();
    })

    .then(function (getId) {
        //GET JSON LENGHT AND INCRESE IT BY ONE ON BUTTON CLICK TO GENERATE A NEW UNIQUE ID
        console.log(getId.length + 1);
        const data = {
            // CREATING BODY FOR POST REQUEST
            id: getId.length + 1,
            name: fullName[0].value,
            surname: fullName[1].value,
            birth: `${birthDate[0].value}/${birthDate[1].value}/${birthDate[2].value}`,
            document_type: `${docSection[1].value}`,
            identification: `${docSection[3].value}`,
            gender: `${checkedGender[0]}`,
            email: `${emailAddress[0].value}`,
            password: `${password[0].value}`
        }
        let postData = {
            method: 'POST',
            body: data,
            headers: new Headers()
        }
        fetch(url, postData)
            .then(function () {
                // CREATING A RESPONSE AFTER SUCCESSFULL POST REQUEST SHOWING INPUT DATA
                console.log("Method: " + postData.method, postData);
                app.innerHTML = `
                <div class="form column">
                    <p>First Name: <strong>${postData.body.name} </strong><br></p>
                    <p>Last Name: <strong>${postData.body.surname} </strong><br></p>
                    <p>Gender: <strong>${postData.body.gender} </strong><br></p>
                    <p>Birth Date: <strong>${postData.body.birth} </strong><br></p>
                    <p>Email Address: <strong>${postData.body.email}</strong></p>                    
                </div>
                `;
            })
    });
}