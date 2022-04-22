headerActive("Home");

subscribeMain.onclick = function () {
    sendEmail(emailMain.value, nameMain.value);
    emailMain.value = "";
    nameMain.value = "";
};

subscribePopUp.onclick = function () {
    sendEmail(emailPopUp.value, namePopUp.value);
    emailPopUp.value = "";
    namePopUp.value = "";
};

blackout.onclick = function () {
    popup.classList.remove("show");
    setCookie("showPopUp", showPopup.checked);
    setTimeout(() => {
        popup.classList.add("hidden");
        blackout.classList.add("hidden");
    }, 200);
};

if (getCookies("showPopUp") != "false") {
    console.log(getCookies("showPopUp"));
    setTimeout(() => {
        popup.classList.remove("hidden");
        blackout.classList.remove("hidden");
        setTimeout(() => {
            popup.classList.add("show");
        }, 20);
    }, 5000);
}

let brandCarouselItems = document.querySelectorAll(
    "#brandsCarousel.carousel .carousel-item"
);
brandCarouselItems.forEach((el) => {
    // number of slides per carousel-item
    const minPerSlide = 7;
    let next = el.nextElementSibling;
    for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
            next = brandCarouselItems[0];
        }
        let cloneChild = next.cloneNode(true);
        el.appendChild(cloneChild.children[0]);
        next = next.nextElementSibling;
    }
});

setInterval(() => {
    ajaxGetRandom((x) => {
        /*
        ajaxGetImage(x.data[0].images[0], (imgx) => {
            console.log(imgx);
            bottomPopupImage.src = imgx;
        });
        */
        console.log(x);
        bottomPopupImage.src = `img/glasses/glasses${getRandomInt(7)}.png`;
        bottomPopupText.innerText = x.data[0].title;
        bottomPopupText.href = `product.html?id=${x.data[0].id}`;
        bottomPopup.classList.add("show");
        setTimeout(() => {
            bottomPopup.classList.remove("show");
        }, 5000);
    });
}, 10000);
