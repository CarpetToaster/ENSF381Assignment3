var triedLogin = false;

function confirmSignup(){
    let messageField = document.getElementById("messageField");
    messageField.style = "display: block; padding:10px; margin:5%; margin-top:-5px; margin-bottom: 40px;\
    text-align:center; border:1px solid black";

    let username = checkUsername();
    let password = checkPassword();
    let confirm = checkConfirm();
    let email = checkEmail();

    let show = document.createElement('div');
    show.id = "show";

    let success = false;

    if(username[0] && password[0] && confirm[0] && email[0]){
        show.textContent = "Signup successful! redirecting to login...";
        success = true;
        setTimeout(() =>{
            window.location.href = "login.html";
        }, 2000)
    }

    else{
        let usernameFailReason = username[1];
        let passwordFailReason = password[1];
        let confirmFailReason = confirm[1];
        let emailFailReason = email[1];

        if (!username[0]){
            let reason = document.createElement('p');
            reason.textContent = "Invalid username (Reason: " + usernameFailReason + ")";
            show.appendChild(reason);
            
        }

        if (!password[0]){
            let reason = document.createElement('p');
            reason.textContent = "Invalid password (Reason: " + passwordFailReason + ")\n";
            show.appendChild(reason);
            
        }

        if (!confirm[0]){
            let reason = document.createElement('p');
            reason.textContent = confirmFailReason + "\n";
            show.appendChild(reason);
            
        }

        if (!email[0]){
            let reason = document.createElement('p');
            reason.textContent = "Invalid email (Reason: " + emailFailReason + ")";
            show.appendChild(reason);
        }
    }

    if (!triedLogin){
        messageField.appendChild(show);
        triedLogin = true
        console.log(show.textContent)
    }

    else if (triedLogin){
        messageField.removeChild(document.getElementById("show"));
        messageField.appendChild(show);
    }
}

function checkUsername(){
    let username = document.getElementById("username");

    if (username.value.length > 20 || username.value.length < 3){
        return [false, "Username must be between 3 and 20 characters"];
    }
    
    let ascii = username.value[0];
    if (!(ascii >= 'a' && ascii <= 'z') && !(ascii >= 'A' && ascii <= 'Z')){
        return [false, "First character of username must be a letter"];
    }

    for (let i = 0; i < username.value.length; i++){
        ascii = username.value[i];

        if (!(ascii >= 'a' && ascii <= 'z') && !(ascii >= 'A' && ascii <= 'Z')
        && !(ascii >= '0' && ascii <= '9') && !(ascii == '-') && !(ascii == '_')){
            return [false, "Username can only contain alphanumeric characters (letters A-Z, numbers 0-9), hyphens (-) and underscores (_)."]
        }
    }
    return [true, ""];
}

function checkPassword(){
    let validSpecialChars = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

    let password = document.getElementById("password");

    let uppercaseCheck = false;
    let lowercaseCheck = false;
    let numberCheck = false;
    let specialCheck = false;

    if (password.value.length < 8){
        return [false, "Password must be at least 8 characters long"];
    }

    for (let i = 0; i < password.value.length; i++){
        let ascii = password.value[i]

        if (ascii >= 'A' && ascii <= 'Z'){
            uppercaseCheck = true;
        }

        if (ascii >= "a" && ascii <= 'z'){
            lowercaseCheck = true;
        }

        if (ascii >= "0" && ascii <= '9'){
            numberCheck = true;
        }

        if (validSpecialChars.includes(ascii)){
            specialCheck = true;
        }

        if (ascii == " "){
            return [false, "Password cannot contain spaces"];
        }
    }

    if(!(uppercaseCheck && lowercaseCheck && numberCheck && specialCheck)){
        return [false, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."];
    }

    return [true, ""];
}

function checkConfirm(){
    let password = document.getElementById("password");
    let confirm = document.getElementById("confirm");

    if (password.value != confirm.value){
        return [false, "Passwords do not match"];
    }

    return [true, ""];
}

function checkEmail(){ // Assuming we can't use regular expressions since they were never covered in this course.
    let email = document.getElementById("email");

    let pastAt = false;
    let pastDot = false;
    let pastAtCount = 0;
    
    let i = 0

    if (email.value[0] == '@'){
        return [false, "Email needs to have a username portion"];
    }

    for (i; i < email.value.length; i++){
        let ascii = email.value[i];

        if (ascii == " "){
            return [false, "Email cannot contain spaces"];
        }

        if (ascii == '@' && !pastAt){
            pastAt = true
        }

        else if (ascii == '@' && pastAt){
            return [false, "Email cannot contain multiple @ symbols"];
        }

        if (ascii == '.' && pastAt && pastAtCount){
            pastDot = true;
            break;
        }

        if (pastAt && ascii != '@'){
            pastAtCount += 1;
        }
    }

    console.log(pastAtCount);

    if (pastAtCount == 0){
        return [false, "Email domain should have a name (i.e. username@domain.com)"];
    }

    if (!((email.value.substr(i, 4) == ".com" && i + 4 == email.value.length) 
        || (email.value.substr(i, 4) == ".net" && i + 4 == email.value.length) 
        || (email.value.substr(i, 3) == ".io" && i + 3 == email.value.length))){
        return [false, "Email domain should end with .com, .net, or .io"]
    }

    return [true, ""];
}