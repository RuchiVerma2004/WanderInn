let cartBtn = document.getElementById("cart");
console.log(cartBtn);
cartBtn.addEventListener("click", () => {
  console.log(listing._id);
  let items = JSON.parse(localStorage.getItem("cartItems")) || [];
  let found = false;
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === listing._id) {
      found = true;
      items[i].quantity++;
    }
  }
  if (!found) {
    items.push({
      quantity: 1,
      id: listing._id,
      img: listing.image.url,
      title: listing.title,
      price: listing.price,
    });
  }
  localStorage.setItem("cartItems", JSON.stringify(items));
  alert("Item Added Successfully");
  window.location = "http://localhost:8080/cart";
});
