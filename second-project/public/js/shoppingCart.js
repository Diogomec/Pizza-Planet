if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

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

  let cartItems = document.getElementsByClassName('cart-items')[0]
  const cart = getCartFromLocalStorage();
  if (cart !== null) {
    cartItems.innerHTML = cart;
  }
  

  let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

let addToCartButtons = document.getElementsByClassName("order-button")
for (let i = 0; i < addToCartButtons.length; i++) {
  let button = addToCartButtons[i]
  button.addEventListener("click", addToCartClicked)
}
document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

}

function purchaseClicked() {
  localStorage.removeItem("Pizza")
  alert('Thank you for your purchase')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()

  saveCartToLocalStorage()
}

function removeCartItem(event) {
  let buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()

  saveCartToLocalStorage()
}

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
  }
  updateCartTotal()

  saveCartToLocalStorage()
}

function addToCartClicked (event){
  let button = event.target
  let shopItem = button.parentElement.parentElement
  let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText
  let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText
  let imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src
  // console.log(title, price, imageSrc)
  addItemToCart(title, price, imageSrc)
  updateCartTotal()

  saveCartToLocalStorage()

}

function addItemToCart(title, price, imageSrc){

  let cartItems = document.getElementsByClassName('cart-items')[0]
  let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    cartRow.innerHTML = `
      <span class="cart-item-title">${title}</span>
      <span class="cart-price">${price}</span>
      <div class="cart-quantity">
        <input type="number" value="1" class="cart-input cart-quantity-input">
        <button class="btn btn-danger" type="button">REMOVE</button>
      </div>
    `;
  
    cartItems.appendChild(cartRow);
  
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
  
    updateCartTotal();
  }

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName('cart-items')[0]
  let cartRows = cartItemContainer.getElementsByClassName('cart-row')
  let total = 0
  for (let i = 0; i < cartRows.length; i++) {
      let cartRow = cartRows[i]
      let priceElement = cartRow.getElementsByClassName('cart-price')[0]
      let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
      let price = parseFloat(priceElement.innerText.replace('$', ''))
      let quantity = quantityElement.value
      total = total + (price * quantity)
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

function getCartFromLocalStorage() {
  return JSON.parse(localStorage.getItem("Pizza")) || "";
}

function saveCartToLocalStorage() {
  const cartItems = document.getElementsByClassName("cart-items")[0];
  const cartContent = cartItems.innerHTML;
  localStorage.setItem("Pizza", JSON.stringify(cartContent));
}
