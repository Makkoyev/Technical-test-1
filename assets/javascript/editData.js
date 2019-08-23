var userList = document.getElementById("user-list");
var app = document.getElementById("app");
var registredUsers = [];
var targets = [];
var userDiv = document.getElementById("edit-user");
var selectedId;
var data = {};

const url = 'https://my-json-server.typicode.com/makkoyev/json/users';
fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        registredUsers = new Object(data);
        registredUsers.forEach(element => {
            userList.innerHTML += `

                <option value="${element.id}">${element.id} - ${element.name} ${element.surname} </option>

            `
        })
    })

userList.addEventListener("change", function () {
    targets = [];
    targets.push(userList.value);
})

function editUser() {
    registredUsers.forEach(element => {
        if (element.id == targets) {
            console.log(`Selected: ${element.name} ${element.surname}`)
            userDiv.innerHTML = `
                <div class="column edit-data">
                    <input type="text" class="input-name" placeholder="${element.name}">
                    <input type="text" class="input-surname" placeholder="${element.surname}">
                    <input type="text" class="input-email" placeholder="${element.email}">
                    <input type="text" class="input-password" placeholder="${element.password}">

                    <input type="button" value="Edit: ${element.name} ${element.surname}" onclick="putData()">
                </div>
            
            `;
            selectedId = element.id;
        }
    })
}

function putData() {
    inputName = document.querySelector('.input-name');
    inputSurname = document.querySelector('.input-surname');
    inputEmail = document.querySelector('.input-email');
    inputPassword = document.querySelector('.input-password');
    data = {
        "name": inputName.value,
        "surname": inputSurname.value,
        "email": inputEmail.value,
        "password": inputPassword.value
    };
    fetch(url + "/" + selectedId, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            console.log("Server response:", response.status, data);
            app.innerHTML = `
                <div class="column">
                    <p>The server response is: <strong>${response.status}</strong></p>
                    <p>Your Name have been changed to: <strong>${data.name}</strong></p>
                    <p>Your Surname have been changed to: <strong>${data.surname}</strong></p>
                    <p>Your Email have been changed to: <strong>${data.email}</strong></p>
                    <p>Your Password have been changed to: <strong>${data.password}</strong></p>
                </div>
            
            `;
        })
        .catch(function (error) {
            console.log(error)
        })
}