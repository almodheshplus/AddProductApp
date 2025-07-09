// # Coded With 🧡 By Youssef Almodhesh ^_^

let showNewProductModal = document.getElementById("showNewProductModal");
let closeModal = document.getElementById("closeModal");
let addProduct = document.getElementById("addProduct");
let overlay = document.querySelector(".overlay");
let productName = document.getElementById("productName");
let productDescription = document.getElementById("productDescription");
let productImg = document.getElementById("productImg");
let products = document.querySelector(".products");
let requiredInputs = document.querySelectorAll(".required-input");
let errorAlert = document.querySelector(".alert");

let requiredError = {
    productName: true,
    productDescription: true,
    productImg: true
};

let delBtns = [];

function openOverlay() {
    overlay.classList.remove("d-none");
}
function closeOverlay() {
    overlay.classList.add("d-none");
}
function delProduct(e) {
    e.parentElement.remove();
    if (products.childElementCount == 0) errorAlert.classList.remove("d-none");
}
function addProductFunc() {
    let Pname = productName.value;
    let e = document.createElement("div");
    e.classList.add("product");
    e.innerHTML = `
    <button type="button" class="delete" onclick="delProduct(this);"><i class="bi bi-trash3"></i></button>
    <div class="product-image">
        <img src="${productImg.value}" alt="${Pname}">
    </div>
    <div class="product-details">
        <h4>${Pname}</h4>
        <p>${productDescription.value}</p>
    </div>
    `;

    products.append(e);

    requiredInputs.forEach(i => {i.value = "";addProduct.setAttribute("disabled", "");});

    if (!errorAlert.classList.contains("d-none")) errorAlert.classList.add("d-none");
    closeOverlay();
}

showNewProductModal.addEventListener("click", openOverlay);
closeModal.addEventListener("click", closeOverlay);

addProduct.addEventListener("click", addProductFunc);

requiredInputs.forEach(e => {
    e.addEventListener("keyup", function (event) {
        if (e.value.trim() == "") {
            e.classList.add("error");
        } else {
            e.classList.remove("error");
        }
        
        requiredInputs.forEach(i => {
            if (i.value.trim() == "") {
                requiredError[i.id] = true;
                addProduct.setAttribute("disabled", "");
            } else {
                requiredError[i.id] = false;
            }
        });

        for (const errorBool of Object.values(requiredError)) {
            if (errorBool) return;
        }

        if (event.key == "Enter" && e.tagName != "TEXTAREA") {
            addProductFunc();
        }

        addProduct.removeAttribute("disabled");
    });
});