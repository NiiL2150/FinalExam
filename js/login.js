headerActive("Login");

loginbutton.onclick = function () {
    if (issignin.checked) {
        let cookieMail = getCookies("UserEMail");
        let cookiePass = decryptMessage(getCookies("UserPassword"));
        if (
            emailLogIn.value === cookieMail &&
            passwordLogIn.value === cookiePass
        ) {
            alert("Welcome back!");
        } else {
            alert("Wrong initials");
        }
    } else {
        setCookie("UserEMail", emailLogIn.value);
        setCookie("UserPassword", encryptMessage(passwordLogIn.value));
    }
    emailLogIn.value = "";
    passwordLogIn.value = "";
};
