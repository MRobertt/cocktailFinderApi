import "./styles.css";

var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

let searchBtn = document.querySelector(".search-btn");
let result = document.querySelector(".result");

let getInfo = () => {
  var userInput = document.querySelector(".user-input").value;
  if (userInput.length === 0) {
    document.querySelector(".result").innerHTML = `Field cannot be empty!`;
  } else {
    fetch(url + userInput)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        userInput = "";

        let name = data.drinks[0].strDrink;
        let instructions = data.drinks[0].strInstructions;
        let ingredients = [];

        for (let i in data.drinks[0]) {
          if (i.startsWith("strIngredient") && data.drinks[0][i]) {
            ingredients.push(data.drinks[0][i]);
          }
        }

        let finalIngredients = ingredients.join();
        result.innerHTML = `
        <h2>${name}</h2> 
        <p>${instructions}</p>
        <p>${finalIngredients}</p>
        `;
      }).catch(error => {
        document.querySelector(".result").innerHTML = `No such name was found`;    
      });
  }
};
window.addEventListener("load", getInfo);
searchBtn.addEventListener("click", getInfo);
