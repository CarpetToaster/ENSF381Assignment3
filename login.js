let passField = document.getElementById("password");
let userField = document.getElementById("username");

var triedLogin = false;

async function confirmLogin(){
    try{
        const results = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await results.json();

        for (let i = 0; i < data.length; i++){
            console.log(data[i]);
            if (data[i].username == userField.value && data[i].email == passField.value){
                displayMessage(true);
                break;
            }
        }
        displayMessage(false);
    }

    catch (error){
        console.error("Something went wrong: " + error);
    }
}

function displayMessage(success){
    let main = document.getElementById("loginArea");
    let show = document.createElement('p');
    show.style = "display: block; padding:10px; margin:5%; margin-top:-5px; margin-bottom: 40px;\
     text-align:center; border:1px solid black";

    show.id = "show";

    let messageSuccess = "Login successful! Redirecting...";
    let messageFail = "Invalid username or password!";


    if (success){
        show.textContent = messageSuccess;
        setTimeout(() =>{
            window.location.href = "course_view.html";
        }, 2000)
    } 
    
    else {
        show.textContent = messageFail;
    }

    if (!triedLogin){
        main.appendChild(show);
        triedLogin = true;
    }

    else if(triedLogin && success){
        main.removeChild(document.getElementById("show"));
        main.appendChild(show);
    }
}




