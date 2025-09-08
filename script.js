//funcion inicializadora del juego
const playBoard = document.querySelector(".play-board");


//cordenas de la comida
let foodX = 13, foodY = 10;

  const changeFoodPosition = () => {
    //buscar al asar un numero entre 1 y 30
    foodX = Math.floor(Math.random() * 30) + 1
    foodY = Math.floor(Math.random() * 30) + 1
    console.log(foodX)
  }
const initGame = () => {
  let htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX}"></div>`;
  playBoard.innerHTML = htmlMarkup;
};

//lamado a la funcion
changeFoodPosition()
initGame();
