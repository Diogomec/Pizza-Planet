// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("second-project JS imported successfully!");
});

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

// Changing the cursor of the application
document.addEventListener('mousemove', function(event) {
  // Get the mouse coordinates
  let mouseX = event.clientX;
  let mouseY = event.clientY;

  // Update the position of the pizza cursor
  let pizzaCursor = document.getElementById('pizza-cursor');
  pizzaCursor.style.left = (mouseX - 25) + 'px';
  pizzaCursor.style.top = (mouseY - 25) + 'px';
});



let button = document.getElementById('buttonCart');
 
button.onclick = function() {
  let sidebar = document.getElementById('shopping-cart-sidebar');
  if (sidebar.style.display === "none") {
    sidebar.style.display = "block";
  } else {
    sidebar.style.display = "none";
  }
};


function ready() {
let addToCartButtons = document.getElementsByClassName("order-button")
for (let i = 0; i < addToCartButtons.length; i++) {
  let button = addToCartButtons[i]
  button.addEventListener("click", addToCartClicked)
}

}

function addToCartClicked (event){
  let button = event.target
  let shopItem = button.parentElement.parentElement
  let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText
  let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText
  let imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src
  // console.log(title, price, imageSrc)
  addItemToCart(title, price, imageSrc)

}

function addItemToCart(title, price, imageSrc){
  let cartRow = document.createElement("div")
  cartRow.classList.add('cart-row')
  let cartItems = document.getElementsByClassName('cart-items')[0]
  let cartRowContents = `

            <span>${title}</span>
      
        <span>${price}</span>
    
            <input  type="number" value="1" class="cart-input">
            <button class="btn btn-danger" type="button">REMOVE</button>
     `

  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
}




