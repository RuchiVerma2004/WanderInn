let cartTable = document.getElementById("cartPage");
let totalamt = document.getElementById("totalamt");
let placeOrder = document.getElementById("placeOrder");
let items = JSON.parse(localStorage.getItem("cartItems")) || [];
// const Listing = require("../models/listing");
let total = 0;

if (items.length > 0) {
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
    cartTable.innerHTML += `<div class="tableRow">
    <img
      src=${items[i].img}
      alt="listing_image"
    />
    <p>${items[i].title}</p>
    <div class="quantity"><button class="add" onclick="add(${i})">+</button><p class = "quantity">${
      items[i].quantity
    }</p><button class="sub" onclick="sub(${i})">-</button></div>
    <p>${items[i].price * items[i].quantity}</p>
  </div>`;
  }
  totalamt.innerText = "Total : " + total;
} else {
  cartTable.innerHTML += `<p>No Items Added Yet</p>`;
}

let add = (i) => {
  items[i].quantity++;
  update();
};

let sub = (i) => {
  if (items[i].quantity > 1) {
    items[i].quantity--;
    update();
  }
};

let update = () => {
  localStorage.setItem("cartItems", JSON.stringify(items));
  cartTable.innerHTML = `<div class="tableRow head">
  <img src="" />
  <p>Hotel</p>
  <div>Quantity</div>
  <p>Amount</p>
</div>`;
  if (items.length > 0) {
    total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].price * items[i].quantity;
      cartTable.innerHTML += `<div class="tableRow">
        <img
          src=${items[i].img}
          alt="listing_image"
        />
        <p>${items[i].title}</p>
        <div class="quantity"><button class="add" onclick="add(${i})">+</button><p class = "quantity">${
        items[i].quantity
      }</p><button class="sub" onclick="sub(${i})">-</button></div>
        <p>${items[i].price * items[i].quantity}</p>
      </div>`;
    }
    totalamt.innerText = "Total : " + total;
  } else {
    cartTable.innerHTML += `<p>No Items Added Yet</p>`;
  }
};

placeOrder.addEventListener("click", () => {
  alert("Placed Order Successfully");
  localStorage.setItem("cartItems", JSON.stringify([]));
  items = [];
  window.location =  "/listings";
  // res.redirect("/listings/new.ejs");
});
