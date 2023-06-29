
// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  const sizeSelectors = document.querySelectorAll('.pizza-size');

  sizeSelectors.forEach((selector, pizzaIndex) => {
    const pizzaContainer = selector.closest('.card-container');
    const smallPrice = pizzaContainer.querySelector('.small-price');
    const mediumPrice = pizzaContainer.querySelector('.medium-price');
    const largePrice = pizzaContainer.querySelector('.large-price');

    // Choosing the size and price as Medium by default
    smallPrice.style.display = 'none';
    largePrice.style.display = 'none';
    mediumPrice.style.display = 'block';
    selector.value = 'Sun - (Medium)';

    selector.addEventListener('change', () => {
      const selectedSize = selector.value;

      if (selectedSize === 'Asteroid - (Small)') {
        smallPrice.style.display = 'block';
        mediumPrice.style.display = 'none';
        largePrice.style.display = 'none';
      } else if (selectedSize === 'Sun - (Medium)') {
        smallPrice.style.display = 'none';
        mediumPrice.style.display = 'block';
        largePrice.style.display = 'none';
      } else {
        smallPrice.style.display = 'none';
        mediumPrice.style.display = 'none';
        largePrice.style.display = 'block';
      }

      const sizes = Array.from(pizzaData[pizzaIndex].sizes);
      sizes.forEach((size) => {
        if (size.name === selectedSize) {
          size.selected = true;
        } else {
          size.selected = false;
        }
      });
    });
  });
  });

  document.addEventListener('mousemove', function(event) {
    let pizzaCursor = document.querySelector('.pizza-cursor');
    pizzaCursor.style.left = (event.clientX - pizzaCursor.offsetWidth / 2) + 'px';
    pizzaCursor.style.top = (event.clientY - pizzaCursor.offsetHeight / 2) + 'px';
  });
