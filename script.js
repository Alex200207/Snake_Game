//funcion inicializadora del juego
const playBoard = document.querySelector(".play-board");


//cordenas de la comida
let foodX = 13, foodY = 10;

//cordenas de la serpiente
let snakeX = 5, snakeY = 10;

//velocidad de la serpiente
let velocityX = 0, velocityY = 0;

  const changeFoodPosition = () => {
    //buscar al asar un numero entre 1 y 30
    foodX = Math.floor(Math.random() * 30) + 1
    foodY = Math.floor(Math.random() * 30) + 1
    console.log(foodX)
  }

//funcion para mover la serpiente
//en la web las cordenadas haciar arriba son negativas y hacia abajo positivas
const changeDirection = (e) => {
   if(e.key === "ArrowUp"){
    //se le pone 0 para que no se mueva en x
    velocityX = 0;
    //se resta 1 para que vaya hacia arriba
    velocityY = -1;
   }
}


const initGame = () => {
  let htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX}"></div>`;
  
  //crear serpiente

  htmlMarkup += `<div class="snake" style="grid-area:${snakeY} / ${snakeX}"></div>`;

  playBoard.innerHTML = htmlMarkup;
};

//lamado a la funcion
changeFoodPosition()
initGame();

//nuevo evento

document.addEventListener('keydown', changeDirection);
