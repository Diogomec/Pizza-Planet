const Pizza = require("../models/Pizza.model");

const allPizzas = [
  {
    name: "Margherita",
    sauce: "Tomato sauce",
    ingredients: ["Mozzarella cheese", "Fresh basil"],
    size: "Medium",
    price: 10.99
  },
  {
    name: "Pepperoni",
    sauce: "Tomato sauce",
    ingredients: ["Mozzarella cheese", "Pepperoni slices"],
    size: "Large",
    price: 10.99
  },
  {
    name: "Hawaiian",
    sauce: "Tomato sauce",
    ingredients: ["Mozzarella cheese", "Ham", "Pineapple"],
    size: "Medium",
    price: 11.99
  },
  {
    name: "Mozzarella",
    sauce: "Tomato sauce",
    ingredients: ["Mozzarella cheese"],
    size: "Large",
    price: 9.99
  },
  {
    name: "Napolitan",
    sauce: "Tomato sauce",
    ingredients: ["Mozzarella cheese", "Pepperoni", "Sausage", "Bell peppers", "Onions", "Olives"],
    size: "Large",
    price: 12.99
  },
  {
    name: "Moon Cheese",
    sauce: "Tomato sauce",
    ingredients: ["Mozzarella cheese", "Cheddar cheese", "Parmesan cheese", "Gorgonzola cheese"],
    size: "Medium",
    price: 11.99
  },
  {
    name: "Romeo and Juliette",
    sauce: "Nutella",
    ingredients: ["Sliced strawberries", "Bananas", "Whipped cream"],
    size: "Small",
    price: 6.99
  },
  {
    name: "Veggie Supreme",
    sauce: "Tomato sauce",
    ingredients: ["Vegan cheese", "Bell peppers", "Onions", "Mushrooms", "Olives"],
    size: "Medium",
    price: 10.99
  },
  {
    name: "Cheesy Bites",
    sauce: "Tomato sauce",
    ingredients: ["Mozzarella cheese", "Mini sausages", "Smiley face-shaped pepperoni"],
    size: "Small",
    price: 4.99
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