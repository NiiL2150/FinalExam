headerActive("Home");

subscribeMain.onclick = function () {
    sendEmail(emailMain.value, nameMain.value);
    emailMain.value = "";
    nameMain.value = "";
};
