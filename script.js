let product = document.querySelector("#product");
let btn = document.querySelector("#btn");
let cartAmount = document.querySelector(".cartAmount");
const sortOrderSelect = document.getElementById("sortOrder");



let basket = JSON.parse(localStorage.getItem("data")) || [];

let shop = () => {
  return (product.innerHTML = watchData
    .map((x) => {
      return `<div class="item">
    <img width="250px" src=${x.img} />
    <div class="details">
      <h5>${x.brand}</h5>
      <h3>${x.model}</h3>
      <p>₹ ${x.price.toLocaleString()}(incl. of all taxes)</p>
      <div class="but">
      <button onclick="update(${
        x.id
      })" id="btn" class="btn">Add To Cart</button>
      </div>
    </div>
  </div>`;
    })
    .join(""));
};

shop();

const update = (id) => {
  let selectItem = id;
  let search = basket.find((p) => p.id === selectItem);

  if (search === undefined) {
    basket.push({
      id: selectItem,
      item: 1,
    });
  } else {
    // return;
    alert("Item already selected");
  }
  localStorage.setItem("data", JSON.stringify(basket));
  calculation();
};

let calculation = () => {
  cartAmount.innerHTML = basket.map((i) => i.item).reduce((x, y) => x + y, 0);
};

calculation();

function filterProducts() {
  let filteredProducts = watchData;
  filteredProducts = sortProducts(filteredProducts);
  shop(filteredProducts);
}

function sortProducts(watchData) {
  const sortOrder = sortOrderSelect.value;
  if (sortOrder === "lowest") {
    return watchData.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highest") {
    return watchData.sort((a, b) => b.price - a.price);
  }
  return watchData;
}

sortOrderSelect.addEventListener("change", () => {
  filterProducts(
    document.querySelector(".filters button.active")?.dataset.category || "all"
  );
});

shop(product);