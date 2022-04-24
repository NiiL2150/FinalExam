const apiKey = "6245eb4d67937c128d7c93cc";
const apiUrl = "https://productsdb-7227.restdb.io/rest/products";
const mailUrl = "https://productsdb-7227.restdb.io/mail";
const imgUrl = "https://productsdb-7227.restdb.io/media";
var itemCount;
var pages;
const itemPerPage = 16;

$(document).ready(function () {
    $("header").load("header.html");
    $("footer").load("footer.html");
    initLoad();
});

function idIsInteger(stringid) {
    return /^\d+$/.test(stringid);
}

function encryptMessage(message) {
    if (typeof message !== "string") {
        return;
    }
    let newMessage = "";
    for (let i = 0; i < message.length; i++) {
        newMessage += String.fromCharCode(message.charCodeAt(i) + i);
    }
    return newMessage;
}

function decryptMessage(message) {
    if (typeof message !== "string") {
        return;
    }
    let newMessage = "";
    for (let i = 0; i < message.length; i++) {
        newMessage += String.fromCharCode(message.charCodeAt(i) - i);
    }
    return newMessage;
}

function setCookie(key, value, days = 365) {
    let date = new Date();
    date.setTime(+date + days * 86400000);
    document.cookie =
        key + "=" + value + "; expires=" + date.toGMTString() + "; path=/";
}

//нагло скопированно со стэк оверфлоу
function getCookies(key) {
    return (
        document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)")?.pop() ||
        ""
    );
}

function headerActive(linkName, interval = 500) {
    setTimeout(() => {
        let headerActiveLink = document.getElementById(`header${linkName}`);
        headerActiveLink.classList.add("active");
    }, interval);
}

//send email to user
function sendEmail(receiver, name, get = getData) {
    let mail = {
        to: receiver,
        subject: "Welcome",
        template: "EmailTemplate",
        html: { name: name },
        company: "Molla",
        sendername: "Molla",
    };
    ajaxHandler("POST", mailUrl, get, mail);
}

//gets number of items
function initLoad() {
    ajaxGetCount(initProceed);
}

//calculates writes number of items and pages
function initProceed(data) {
    console.log(data);
    itemCount = data.totals.count;
    pages = Math.ceil(itemCount / itemPerPage);
    console.log(pages);
}

//handle data
function getData(data) {
    console.log(data);
}

//get item by id
function ajaxGetById(id = null, get = getData) {
    ajaxApiHandler("GET", id === null ? "" : `?q={"id":${id}}`, get);
}

//random int
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//get random item
function ajaxGetRandom(get = getData) {
    ajaxGet(undefined, undefined, 1, getRandomInt(itemCount ?? 100), get);
}

//get last items (by date)
function ajaxGetNewArrivals(get = getData) {
    ajaxGet("arrival", false, undefined, undefined, get);
}

//get number of items
function ajaxGetCount(get = undefined) {
    ajaxGetHandler(`?totals=true&count=true`, get);
}

//generate link for get function
function ajaxGet(
    sort = "_id",
    asc = true,
    max = itemPerPage,
    skip = 0,
    get = getData
) {
    ajaxGetHandler(
        `?max=${max}&sort=${sort}&dir=${asc ? 1 : -1}&skip=${skip}&totals=true`,
        get
    );
}

//generate get operation
function ajaxGetHandler(link, get = getData) {
    ajaxApiHandler("GET", link, get);
}

//generate api operation
function ajaxApiHandler(meth, link, next) {
    ajaxHandler(meth, `${apiUrl}${link}`, next);
}

//get image by id
function ajaxGetImage(imgId, next) {
    ajaxHandler("GET", getImageUrl(imgId), next, undefined, "image/jpeg");
}

//get image url
function getImageUrl(imgId) {
    //return `${imgUrl}/${imgId}`;
    return `img/${imgId}e`;
}

//send info to api with later response
function ajaxHandler(
    meth,
    link,
    next,
    sentData = null,
    contentType = "application/json"
) {
    $.ajax({
        async: true,
        crossDomain: true,
        url: link,
        method: meth,
        data: JSON.stringify(sentData),
        headers: {
            "content-type": contentType,
            "x-apikey": apiKey,
            "cache-control": "no-cache",
        },
        beforeSend: () => {
            console.log(`${link}`);
        },
    })
        .done(next)
        .fail(() => {
            console.log("Fail");
        });
}
