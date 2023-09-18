const Pizza = require("../models/Pizza.model");

const allPizzas = [
  {
    name: "Margherita Mars",
    sauce: "Tomato sauce",
    ingredients: [" Mozzarella cheese", " Fresh basil"],
    sizes: [
      { name: "Asteroid - (Small)", price: 8.99 },
      { name: "Sun - (Medium)", price: 10.99 },
      { name: "Galaxy - (Large)", price: 12.99 }
    ],
    description: "Features a classic combination of tomato sauce topped with melted mozzarella cheese and fresh basil. It offers a simple yet flavorful experience.",
    imageUrl: "images/pizzas/margheritta.jpg"
  },
  {
    name: "Pepperoni Saturn",
    sauce: "Tomato sauce",
    ingredients: [" Mozzarella cheese", " Pepperoni slices"],
    sizes: [
      { name: "Asteroid - (Small)", price: 8.99 },
      { name: "Sun - (Medium)", price: 10.99 },
      { name: "Galaxy - (Large)", price: 12.99 }
    ],
    description: "Pepperoni Saturn is a delicious pizza with tangy tomato sauce, a generous layer of gooey mozzarella cheese, and savory pepperoni slices. It's a crowd favorite for pepperoni lovers.",
    imageUrl: "images/pizzas/pepperonni.jpg"
  },
  {
    name: "Hawaiian Earth",
    sauce: "Tomato sauce",
    ingredients: [" Mozzarella cheese", " Ham", " Pineapple"],
    sizes: [
      { name: "Asteroid - (Small)", price: 9.99 },
      { name: "Sun - (Medium)", price: 11.99 },
      { name: "Galaxy - (Large)", price: 13.99 }
    ],
    description: "Hawaiian Earth combines the sweetness of pineapple with savory ham on a bed of tomato sauce and melted mozzarella cheese. It's a tropical twist on a classic pizza.",
    imageUrl: "images/pizzas/hawaiian.jpg"
  },
  {
    name: "Mozzarella Uranus",
    sauce: "Tomato sauce",
    ingredients: [" Mozzarella-cheese"],
    sizes: [
      { name: "Asteroid - (Small)", price: 7.99 },
      { name: "Sun - (Medium)", price: 9.99 },
      { name: "Galaxy - (Large)", price: 11.99 }
    ],
    description: "Mozzarella Uranus showcases the star ingredient itself: melted mozzarella cheese. With a flavorful tomato sauce base, it's a cheese lover's dream come true.",
    imageUrl: "images/pizzas/mozzarella.jpg"
  },
  {
    name: "Napolitan Neptune",
    sauce: "Tomato sauce",
    ingredients: [" Mozzarella cheese", " Pepperoni", " Sausage", " Bell peppers", " Onions", " Olives"],
    sizes: [
      { name: "Asteroid - (Small)", price: 10.99 },
      { name: "Sun - (Medium)", price: 12.99 },
      { name: "Galaxy - (Large)", price: 14.99 }
    ],
    description: "Napolitan Neptune offers a medley of flavors with tomato sauce, melted mozzarella cheese, zesty pepperoni, savory sausage, colorful bell peppers, onions, and olives. It's a hearty and satisfying choice.",
    imageUrl: "images/pizzas/napolitan.jpg"
  },
  {
    name: "Moon Cheese",
    sauce: "Tomato sauce",
    ingredients: [" Mozzarella cheese", " Cheddar cheese", " Parmesan cheese", " Gorgonzola cheese"],
    sizes: [
      { name: "Asteroid - (Small)", price: 9.99 },
      { name: "Sun - (Medium)", price: 11.99 },
      { name: "Galaxy - (Large)", price: 13.99 }
    ],
    description: "Moon Cheese is a cheesy delight featuring a blend of mozzarella, cheddar, Parmesan, and Gorgonzola cheeses. The tomato sauce base enhances the richness and complexity of flavors.",
    imageUrl: "images/pizzas/4-cheese.jpg"
  },
  {
    name: "Romeo and Jupiter",
    sauce: "Nutella",
    ingredients: [" Sliced strawberries", " Bananas", " Whipped cream"],
    sizes: [
      { name: "Asteroid - (Small)", price: 4.99 },
      { name: "Sun - (Medium)", price: 6.99 },
      { name: "Galaxy - (Large)", price: 8.99 }
    ],
    description: "Romeo and Jupiter is a sweet treat with a twist. It swaps the traditional tomato sauce for Nutella, and it's topped with sliced strawberries, bananas, and luscious whipped cream. Perfect for dessert lovers!",
    imageUrl: "images/pizzas/romeo-juliette.jpg"
  },
  {
    name: "Veggie Venus",
    sauce: "Tomato sauce",
    ingredients: [" Vegan cheese", " Bell peppers", " Onions", " Mushrooms", " Olives"],
    sizes: [
      { name: "Asteroid - (Small)", price: 8.99 },
      { name: "Sun - (Medium)", price: 10.99 },
      { name: "Galaxy - (Large)", price: 12.99 }
    ],
    description: "Veggie Venus is a vegetarian delight featuring tomato sauce, vegan cheese, colorful bell peppers, onions, earthy mushrooms, and tangy olives. It's a flavorful and satisfying choice for veggie enthusiasts.",
    imageUrl: "images/pizzas/veggie.jpg"
  },
  {
    name: "Mercury Bites",
    sauce: "Tomato sauce",
    ingredients: [" Mozzarella cheese", " Mini sausages", " Smiley face-shaped pepperoni"],
    sizes: [
      { name: "Asteroid - (Small)", price: 2.99 },
      { name: "Sun - (Medium)", price: 4.99 },
      { name: "Galaxy - (Large)", price: 6.99 }
    ],
    description: "Mercury Bites is a playful pizza with tomato sauce, melted mozzarella cheese, mini sausages, and smiley face-shaped pepperoni. It's a fun and delicious option for kids and the young at heart.",
    imageUrl: "images/pizzas/cheesy-bites.jpg"
  }
];

// Function to seed example pizzas
const seedAllPizzas = async () => {
  try {
    await Pizza.deleteMany(); 
    await Pizza.insertMany(allPizzas);
  } catch (error) {
    console.error("Error seeding example pizzas:", error);
  }
};

module.exports = seedAllPizzas;