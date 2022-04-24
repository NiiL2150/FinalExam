headerActive("Shop");

$(document).ready(function () {
    getProdId();
});

var prodid;
var seconds = 10000;
var date = new Date(0);
date.setSeconds(seconds);

function getProdId() {
    let urlstr = window.location.href;
    let thisurl = new URL(urlstr);
    let prodidstr = thisurl.searchParams.get("id");
    if (!idIsInteger(prodidstr)) {
        window.location.replace("/products.html");
    }
    prodid = Number.parseInt(prodidstr);
    loadContent();
}

function loadContent() {
    ajaxGetById(prodid, (indata) => {
        let item = indata[0];
        console.log(item);
        headProductTitle.innerText = item.title;
        productTitle.innerText = item.title;
        productPrice.innerText = `$${Math.round(item.price * 100) / 100}`;
        productDescription.innerText = item.description;
        productImage.src = `img/glasses/glasses${item.id % 8}.png`;
        setInterval(() => {
            date.setMilliseconds(-1);
            console.log(date.toISOString());
            productTimerString.innerText = `Offer ends in ${date
                .toISOString()
                .substring(11, 19)}`;
        }, 1000);
    });
}
