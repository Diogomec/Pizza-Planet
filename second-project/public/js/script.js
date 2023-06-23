// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("second-project JS imported successfully!");
});

// Changing the cursor of the application
document.addEventListener('mousemove', function(event) {
  // Get the mouse coordinates
  var mouseX = event.clientX;
  var mouseY = event.clientY;

  // Update the position of the pizza cursor
  var pizzaCursor = document.getElementById('pizza-cursor');
  pizzaCursor.style.left = (mouseX - 25) + 'px';
  pizzaCursor.style.top = (mouseY - 25) + 'px';
});