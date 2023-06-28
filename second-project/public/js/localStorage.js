const Pizza = require('./models/Pizza.model.js');

Pizza.find()
.then( response => {
  console.log(response)
   return response.json;
})
.then(data => {
   localStorage.setItem("Pizza", JSON.stringify(data));
   if(!localStorage.getItem("cart")){
      localStorage.setItem("cart", "[]");
   }
});