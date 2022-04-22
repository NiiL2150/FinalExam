headerActive("Shop");

var currentPage = 0;

$(document).ready(function () {
    setTimeout(() => {
        loadContent();
    }, 2000);
});

function loadContent() {
    resultString.innerText = `Showing ${Math.min(
        itemPerPage * (currentPage + 1),
        itemCount
    )} of ${itemCount} results`;
    ajaxGet(
        undefined,
        undefined,
        undefined,
        currentPage * itemPerPage,
        (indata) => {
            for (const item of indata.data) {
                let newDiv = document.createElement("div");
                newDiv.classList.add("col");
                newDiv.innerHTML = `<img src="img/glasses/glasses${getRandomInt(
                    7
                )}.png" />
                    <p>${item.title}</p>
                    <p>${Math.round(item.price * 100) / 100}</p>
                    <a href="product.html?id=${
                        item.id
                    }" class="addButton">View more</a>`;
                prodlist.appendChild(newDiv);
            }
        }
    );
    currentPage++;
}

loadmore.onclick = loadContent;
