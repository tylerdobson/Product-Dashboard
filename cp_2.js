// Coding Project 02 - Product Dashboard
// Tyler Dobson

// The API we are pulling product data from
const API_URL = "https://www.course-api.com/javascript-store-products";

// ---------------------------------------------------------------
// Step 3: Promise-based fetch using .then() and .catch()
// ---------------------------------------------------------------
function fetchProductsThen() {
  fetch(API_URL)
    .then((response) => response.json()) // turn the response into usable JSON
    .then((products) => {
      // Log every product's name to the console
      products.forEach((product) => {
        console.log(product.fields.name);
      });
    })
    .catch((error) => {
      // If the fetch fails, log the error
      console.log("An error occurred: " + error.message);
    });
}

// ---------------------------------------------------------------
// Step 4: Async/await fetch using try/catch
// ---------------------------------------------------------------
async function fetchProductsAsync() {
  try {
    const response = await fetch(API_URL);
    const products = await response.json();
    // Send the products off to be shown on the page
    displayProducts(products);
  } catch (error) {
    // Pass any error to our reusable error handler
    handleError(error);
  }
}

// ---------------------------------------------------------------
// Step 5: Display the first 5 products on the page
// ---------------------------------------------------------------
function displayProducts(products) {
  // Grab the container from the HTML
  const container = document.getElementById("product-container");

  // Loop through only the first 5 products
  products.slice(0, 5).forEach((product) => {
    // The API stores the details inside a "fields" object
    const name = product.fields.name;
    const price = product.fields.price / 100; // price comes in cents
    const image = product.fields.image[0].url;

    // Build a product card
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${image}" alt="${name}" />
      <h2>${name}</h2>
      <p>$${price.toFixed(2)}</p>
    `;

    // Add the card to the container
    container.appendChild(card);
  });
}

// ---------------------------------------------------------------
// Step 6: Reusable error handler
// ---------------------------------------------------------------
function handleError(error) {
  console.log("An error occurred: " + error.message);
}

// ---------------------------------------------------------------
// Step 7: Call both functions
// ---------------------------------------------------------------
fetchProductsThen();
fetchProductsAsync();
