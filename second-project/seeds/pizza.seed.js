const Pizza = require("../models/Pizza.model");

const allPizzas = [
  {
    name: "Margherita Mars",
    sauce: "Tomato sauce",
    ingredients: [" Mozzarella cheese", " Fresh basil"],
    size: "Sun - (Medium)",
    price: 10.99,
    imageUrl: "images/pizzas/margheritta.jpg"
  },
  {
    name: "Pepperoni Saturn",
    sauce: "Tomato sauce",
    ingredients: [" Mozzarella cheese", " Pepperoni slices"],
    size: "Sun - (Medium)",
    price: 10.99,
    imageUrl: "images/pizzas/pepperonni.jpg"
  },
  {
    name: "Hawaiian Earth",
    sauce: "Tomato sauce",
    ingredients: [" Mozzarella cheese", " Ham", " Pineapple"],
    size: "Sun - (Medium)",
    price: 11.99,
    imageUrl: "images/pizzas/hawaiian.jpg"
  },
  {
    name: "Mozzarella Uranus",
    sauce: "Tomato sauce",
    ingredients: [" Mozzarella-cheese"],
    size: "Sun - (Medium)",
    price: 9.99,
    imageUrl: "images/pizzas/mozzarella.jpg"
  },
  {
    name: "Napolitan Neptune",
    sauce: "Tomato sauce",
    ingredients: [" Mozzarella cheese", " Pepperoni", " Sausage", " Bell peppers", " Onions", " Olives"],
    size: "Sun - (Medium)",
    price: 12.99,
    imageUrl: "images/pizzas/napolitan.jpg"
  },
  {
    name: "Moon Cheese",
    sauce: "Tomato sauce",
    ingredients: [" Mozzarella cheese", " Cheddar cheese", " Parmesan cheese", " Gorgonzola cheese"],
    size: "Sun - (Medium)",
    price: 11.99,
    imageUrl: "images/pizzas/4-cheese.jpg"
  },
  {
    name: "Romeo and Jupiter",
    sauce: "Nutella",
    ingredients: [" Sliced strawberries", " Bananas", " Whipped cream"],
    size: "Sun - (Medium)",
    price: 6.99,
    imageUrl: "images/pizzas/romeo-juliette.jpg"
  },
  {
    name: "Veggie Venus",
    sauce: "Tomato sauce",
    ingredients: [" Vegan cheese", " Bell peppers", " Onions", " Mushrooms", " Olives"],
    size: "Sun - (Medium)",
    price: 10.99,
    imageUrl: "images/pizzas/veggie.jpg"
  },
  {
    name: "Mercury Bites",
    sauce: "Tomato sauce",
    ingredients: [" Mozzarella cheese", " Mini sausages", " Smiley face-shaped pepperoni"],
    size: "Sun - (Medium)",
    price: 4.99,
    imageUrl: "images/pizzas/cheesy-bites.jpg"
  }
];

// Function to seed example pizzas
const seedAllPizzas = async () => {
  try {
    await Pizza.deleteMany(); // Clear existing pizzas
    await Pizza.insertMany(allPizzas); // Insert example pizzas
    console.log("Example pizzas seeded successfully.");
  } catch (error) {
    console.error("Error seeding example pizzas:", error);
  }
};

module.exports = seedAllPizzas;