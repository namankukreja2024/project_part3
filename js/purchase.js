// purchase.js
document.addEventListener("DOMContentLoaded", () => {
  // Parse URL query parameters to get product information
  const params = new URLSearchParams(window.location.search);
  const productName = params.get("product");
  const productPrice = params.get("price");
  const productImage = params.get("image"); // Get the image file name

  // Populate product details if available
  if (productName && productPrice && productImage) {
      document.getElementById("product-name").textContent = productName.replace(/-/g, ' ');
      document.getElementById("product-price").textContent = `$${parseFloat(productPrice).toFixed(2)}`;
      document.getElementById("product-image").src = `images/${productImage}`; // Set the image source
  } else {
      console.error("Product details not found in URL query parameters.");
  }

  // Select elements for quantity and total price updates
  const quantityInput = document.getElementById("quantity");
  const decreaseBtn = document.getElementById("decrease-btn");
  const increaseBtn = document.getElementById("increase-btn");
  const totalPrice = document.getElementById("total-price");

  // Get product price as a number
  const pricePerUnit = parseFloat(productPrice);

  // Function to update total price based on quantity
  const updateTotalPrice = () => {
      const quantity = Math.max(1, parseInt(quantityInput.value) || 1); // Ensure valid quantity
      const total = (quantity * pricePerUnit).toFixed(2);
      totalPrice.textContent = `$${total}`;
  };

  // Decrease quantity when the "-" button is clicked
  decreaseBtn.addEventListener("click", () => {
      let quantity = parseInt(quantityInput.value);
      if (quantity > 1) {
          quantityInput.value = --quantity;
          updateTotalPrice();
      }
  });

  // Increase quantity when the "+" button is clicked
  increaseBtn.addEventListener("click", () => {
      let quantity = parseInt(quantityInput.value);
      quantityInput.value = ++quantity;
      updateTotalPrice();
  });

  // Update total price dynamically when quantity input changes
  quantityInput.addEventListener("input", () => {
      const quantity = Math.max(1, parseInt(quantityInput.value) || 1); // Ensure no invalid input
      quantityInput.value = quantity;
      updateTotalPrice();
  });

  // Confirm purchase when the "Buy Now" button is clicked
  document.getElementById("buy-now-btn").addEventListener("click", () => {
      const quantity = parseInt(quantityInput.value);
      alert(`Thank you for purchasing ${quantity} ${productName.replace(/-/g, ' ')}(s)!`);
      // Add further actions for the purchase confirmation here
  });
});
