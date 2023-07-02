
// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  const sizeSelectors = document.querySelectorAll(".pizza-size");

  // Load cart from localStorage
  const cart = getCartFromLocalStorage();
  if (cart !== null) {
    document.getElementsByClassName("cart-items")[0].innerHTML = cart;
    updateCartTotal();
  }

  sizeSelectors.forEach((selector, pizzaIndex) => {
    const pizzaContainer = selector.closest(".card-container");
    const smallPrice = pizzaContainer.querySelector(".small-price");
    const mediumPrice = pizzaContainer.querySelector(".medium-price");
    const largePrice = pizzaContainer.querySelector(".large-price");

    // Choosing the size and price as Medium by default
    smallPrice.style.display = "none";
    largePrice.style.display = "none";
    mediumPrice.style.display = "block";
    selector.value = "Sun - (Medium)";

    selector.addEventListener("change", () => {
      const selectedSize = selector.value;

      if (selectedSize === "Asteroid - (Small)") {
        smallPrice.style.display = "block";
        mediumPrice.style.display = "none";
        largePrice.style.display = "none";
      } else if (selectedSize === "Sun - (Medium)") {
        smallPrice.style.display = "none";
        mediumPrice.style.display = "block";
        largePrice.style.display = "none";
      } else {
        smallPrice.style.display = "none";
        mediumPrice.style.display = "none";
        largePrice.style.display = "block";
      }

      const sizes = Array.from(pizzaData[pizzaIndex].sizes);
      sizes.forEach((size) => {
        if (size.name === selectedSize) {
          size.selected = true;
        } else {
          size.selected = false;
        }
      });

      updateCartTotal();
      saveCartToLocalStorage();
    });
  });
});

  document.addEventListener('mousemove', function(event) {
    var mouseX = event.clientX;
    var mouseY = event.clientY;
  
    var pizzaCursor = document.getElementById('pizza-cursor');
    pizzaCursor.style.left = (mouseX - 20) + 'px';
    pizzaCursor.style.top = (mouseY - 20) + 'px';
  });


  function showHideParagraphs() {
    let selectElement = document.getElementById("userTypeSelect");
    let selectedValue = selectElement.options[selectElement.selectedIndex].value;
    
    let userDetails = document.getElementById("userDetails");
    let userParagraph = document.getElementById("userParagraph");
    let userPasswordParagraph = document.getElementById("userPasswordParagraph");

    let adminDetails = document.getElementById("adminDetails");
    let adminParagraph = document.getElementById("adminParagraph");
    let adminPasswordParagraph = document.getElementById("adminPasswordParagraph");
    
    if (selectedValue === "user") {

      adminDetails.style.display = "none";
      adminParagraph.style.display = "none";
      adminPasswordParagraph.style.display = "none";

      userDetails.style.display = "block";
      userParagraph.style.display = "block";
      userPasswordParagraph.style.display = "block";

      

    } else if (selectedValue === "admin") {
      adminDetails.style.display = "block";
      adminParagraph.style.display = "block";
      adminPasswordParagraph.style.display = "block";

      userDetails.style.display = "none";
      userParagraph.style.display = "none";
      userPasswordParagraph.style.display = "none";

      
    }
  }

  // Slideshow

  const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(slideIndex) {
  slides.forEach((slide) => slide.classList.remove('active'));
  slides[slideIndex].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 4000);

// Add click event listeners to the images
slides.forEach((slide, index) => {
  slide.addEventListener('click', () => {
    if (index === 0) {
      window.location.href = '/menu';
    } else if (index === 1) {
      window.location.href = '/menu/64a12222ffbfd9844721d122';
    } else if (index === 2) {
      window.location.href = '/auth/sign-up';
    }
  });
});