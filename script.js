console.log("hello")

const searchBtn = document.querySelector(".search-btn")
const detail = document.querySelector(".meal-contents")
const closeBtn = document.querySelector("#recipe-close-btn")
const mealCard = document.querySelector(".meal-container")
const input = document.querySelector('#search-input')

searchBtn.addEventListener('click', food);
mealCard.addEventListener('click', getRecipe)
closeBtn.addEventListener('click', () =>{
  detail.parentElement.classList.remove('showRecipe')
})
input.addEventListener('keyup',function (e){
  if(e.key == 'Enter'){
    food()
  }
})

function food() {
  let search = document.getElementById("search-input").value.trim();

  // console.log(value)
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search} `)
    .then(response => response.json())
    // .then(json => console.log(json))
    .then(data => {
      let html = "";
      if (data.meals) {
        data.meals.forEach(meal => {
          html += `
     <div class="meal-card" data-id = "${meal.idMeal}">
     
       <img src= "${meal.strMealThumb}"alt="">
      
     <div class="dish-name">
     <h3>${meal.strMeal}</h3>
     <a href="#" class="recipe-btn">Get Recipe</a>
     </div>
     </div>   
    `
        })
      }
      mealCard.innerHTML = html
    }).catch(()=>{
      alert('No result found')
    })

}
function getRecipe(e) {
  // e.preventDefault()
  if (e.target.classList.contains('recipe-btn')) {
    let recipe = e.target.parentElement.parentElement;
    // console.log(recipe)
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.dataset.id}`)
      .then(response => response.json())
      .then(data => showRecipe(data.meals) )
     
  }
}
const showRecipe  = (meal) => {
  // console.log(meal)
  meal = meal[0]
  let html = ` <h2 class="meal-name">${meal.strMeal}</h2>
  <span class="category-name">${meal.strCategory}</span>
  <div class="meal-instruction">
      <h3>instructions:</h3>
      <p>${meal.strInstructions}</P>
  </div>
  <div class="meal-img">
      <img src="${meal.strMealThumb}" alt="">
  </div>

`
detail.innerHTML = html;
detail.parentElement.classList.add('showRecipe')
// console.log(meal)
}
