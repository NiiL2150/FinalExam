const apiKey = "6245eb4d67937c128d7c93cc";
const apiUrl = "https://productsdb-7227.restdb.io/rest/products";
const mailUrl = "https://productsdb-7227.restdb.io/mail";
var itemCount;
var pages;
const itemPerPage = 16;

$(document).ready(function () {
    $("header").load("header.html");
    $("footer").load("footer.html");
    $("#firstSlider").owlCarousel({
        items: 1,
        nav: true,
    });
});

function headerActive(linkName, interval = 200) {
    setTimeout(() => {
        let headerActiveLink = document.getElementById(`header${linkName}`);
        headerActiveLink.classList.add("active");
    }, interval);
}

//send email to user
function sendEmail(receiver, name) {
    let mail = {
        to: receiver,
        subject: "Welcome",
        template: "EmailTemplate",
        html: { name: name },
        company: "Molla",
        sendername: "Molla",
    };
    ajaxHandler("POST", mailUrl, getData, mail);
}

//gets number of items
function initLoad() {
    ajaxGetCount(initProceed);
}

//calculates writes number of items and pages
function initProceed(data) {
    itemCount = data.totals.count;
    pages = Math.ceil(itemCount / itemPerPage);
}

//handle data
function getData(data) {
    console.log(data);
}

//get item by id
function ajaxGetById(id = null) {
    ajaxApiHandler("GET", id === null ? "" : `?q={"id":${id}}`, getData);
}

//random int
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//get random item
function ajaxGetRandom() {
    ajaxGet(undefined, undefined, 1, getRandomInt(itemCount));
}

//get last items (by date)
function ajaxGetNewArrivals() {
    ajaxGet("arrival", false);
}

//get number of items
function ajaxGetCount(get = undefined) {
    ajaxGetHandler(`?totals=true&count=true`, get);
}

//generate link for get function
function ajaxGet(sort = "_id", asc = true, max = itemPerPage, skip = 0) {
    ajaxGetHandler(
        `?max=${max}&sort=${sort}&dir=${asc ? 1 : -1}&skip=${skip}&totals=true`
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

//send info to api with later response
function ajaxHandler(meth, link, next, sentData = null) {
    $.ajax({
        async: true,
        crossDomain: true,
        url: link,
        method: meth,
        data: JSON.stringify(sentData),
        headers: {
            "content-type": "application/json",
            "x-apikey": apiKey,
            "cache-control": "no-cache",
        },
        beforeSend: () => {
            console.log(`${apiUrl}${link}`);
        },
    })
        .done(next)
        .fail(() => {
            console.log("Fail");
        });
}
