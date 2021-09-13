const loadProducts = () => {
  const url = `ranga-api.json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    console.log(product)
    // const image = product.images;----previous mistake(previous image not images)
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
      
    <img class="product-image" src=${product.image}></img>
      </div>
      <h3>${product.title}</h3>
      <p class="fs-2">Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <br>
      <h2>Rating-count:  ${product.rating.count}</h2>
     
      <h2>Rating:  ${product.rating.rate}</h2>
      <br>
      
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-danger fs-4">add to cart</button>
      <button id="details-btn" class="btn btn-dark fs-4">Details</button></div>
      `;

    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = (value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = (Math.round(total * 100) / 100).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = (Math.round(value * 100) / 100).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal()
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = (Math.round(grandTotal * 100) / 100).toFixed(2);
};
loadProducts();