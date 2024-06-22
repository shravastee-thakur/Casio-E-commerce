let cartAmount = document.querySelector(".cartAmount");
let label = document.querySelector("#label");
let shoppingCart = document.querySelector("#shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  cartAmount.innerHTML = basket.map((i) => i.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCart = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id } = x;
        let search = watchData.find((y) => y.id === id) || [];
        return `<div class="cart-item">
                <img width="100px" src=${search.img} />
                <div class="details">

                  <div class="title-x">
                    <h4>
                     ${search.model}
                    </h4>
                    <i onclick="removeItems(${id})" class="bi bi-trash"></i>
                  </div>

                 <p>₹ ${search.price.toLocaleString()}(incl. of all taxes)</p>
                </div>
            </div>`;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
       <h2>Cart is empty</h2>
       <a href="index.html">
        <button class="homeBtn">Click to buy</button>
       </a>
       `;
  }
};

generateCart();

let removeItems = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem);
  generateCart();
  calculation();
  totalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};


let clearCart = () => {
  basket = [];
  generateCart();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
}

let totalAmount = () => {
  if (basket.length != 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let search = watchData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);

    label.innerHTML = `
      <h4>Total Amount : ₹ ${amount.toLocaleString()} (incl. of all taxes)</h4>
      <button class="checkout">Logout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
  } else return;
};

totalAmount();
