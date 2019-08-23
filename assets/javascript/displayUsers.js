var app = document.getElementById('app');
var registredList = document.querySelector('.registred-members');
var registredUsers;
//Loading spinner during fetching data
let loader = `<div class="loader"></div>`;
registredList.innerHTML = loader;
var loaderClass = document.querySelector('.loader');

fetch('https://my-json-server.typicode.com/makkoyev/json/users')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        loaderClass.remove();
        registredUsers = new Object(data);
        console.log("Data Fetched:", data);
        registredUsers.forEach(element => { //Loop a 'card' for each element NAME | SURNAME | GENDER | DOCUMENT TYPE | DOCUMENT NUMBER | EMAIL
            registredList.innerHTML += `
            
            <div class="user-profile">
            <div class="profile">
            <div class="profile-title">
                <h3>${element.name} ${element.surname}</h3>
            </div>
                <div class="profile-data column">
                    <p><strong>User id:</strong> ${element.id}</p>
                    <p><strong>Gender:</strong> ${element.gender.charAt(0).toUpperCase()}</p>
                    <p><strong>Document Type:</strong> ${element.document_type} - ${element.identification}</p>
                    <p><strong>Email Address:</strong> ${element.email}</p>
                </div>  
            </div>     
            </div>

            `
        });
    });