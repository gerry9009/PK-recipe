// container megjeleníteni az elemeket
const $CONTAINER = document.querySelector(".js-container");

const $INPUT = document.querySelector(".js-input");
const $FORM = document.querySelector(".js-form");

const API_URL = "https://dummyjson.com/recipes?limit=100";

// ES13
const RECIPES = await fetchData(API_URL);

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.recipes;
}

function createStars(recipeRating) {
  let rating = Math.floor(recipeRating);
  let rest = Math.round((recipeRating - rating) * 10);

  let starsHTML = ``;
  for (let i = 0; i < 5; i++) {
    if (rating > 0) {
      starsHTML += '<i class="fa-solid fa-star"></i>';
      rating--;
    } else if (rest > 0) {
      if (rest < 3) {
        starsHTML += '<i class="fa-regular fa-star"></i>';
      } else if (rest < 7) {
        starsHTML += '<i class="fa-regular fa-star-half-stroke"></i>';
      } else {
        starsHTML += '<i class="fa-solid fa-star"></i>';
      }
      rest = 0;
    } else {
      starsHTML += '<i class="fa-regular fa-star"></i>';
    }
  }

  return starsHTML;
}

function createParagraphList(list) {
  return list.map((item) => `<p>${item}</p>`).join("");
}

function createRecipeTemplate(recipe) {
  const starsHTML = createStars(recipe.rating);

  const ingredients = createParagraphList(recipe.ingredients);
  const instructions = createParagraphList(recipe.instructions);

  return `<div class="recipe">
          <div class="recipe-top">
            <img
              src=${recipe.image}
              alt=${recipe.name}
            />
          </div>
          <div class="recipe-bottom">
            <h2>${recipe.name}</h2>
            <div class="recipe-rating flex-around-center">
              <div>
                ${starsHTML}
              </div>
              <p>${recipe.rating}</p>
            </div>
            <div class="recipe-data flex-around-center">
              <i class="fa-regular fa-clock"></i>
              <p>Prep: <span>${recipe.prepTimeMinutes} min</span></p>
              <p>Cooking: <span>${recipe.cookTimeMinutes} min</span></p>
            </div>
            <div class="recipe-text">
              <h3>Ingredients:</h3>
              <div class="recipe-grid">
                ${ingredients}
              </div>
            </div>
            <div class="recipe-text">
              <h3>Instructions:</h3>
              ${instructions}
            </div>
          </div>
        </div>`;
}

function render(data) {
  const recipes = data.map((recipe) => createRecipeTemplate(recipe)).join("");

  // $CONTAINER-be bele kell tenni az összes template-et
  $CONTAINER.innerHTML = recipes;
}

function inputEventHandler(e) {
  const filterValue = e.target.value.toLowerCase();
  // filterelni kell az elemek között
  const filteredData = RECIPES.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(filterValue) ||
      recipe.ingredients.join(" ").toLowerCase().includes(filterValue)
    );
  });
  // ki kell renderelni az új tömböt
  render(filteredData);
}

$INPUT.addEventListener("input", inputEventHandler);
$FORM.addEventListener("submit", (e) => e.preventDefault());

render(RECIPES);
