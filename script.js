//funcion inicializadora del juego
const playBoard = document.querySelector(".play-board");

//cordenas de la comida
let foodX = 13,
  foodY = 10;

//cordenas de la serpiente
let snakeX = 5,
  snakeY = 10;

//velocidad de la serpiente
let velocityX = 0,
  velocityY = 0;

const changeFoodPosition = () => {
  //buscar al asar un numero entre 1 y 30
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
  console.log(foodX);
};

//funcion para mover la serpiente
//en la web las cordenadas haciar arriba son negativas y hacia abajo positivas
const changeDirection = (e) => {
  if (e.key === "ArrowUp") {
    //se le pone 0 para que no se mueva en x
    velocityX = 0;
    //se resta 1 para que vaya hacia arriba
    velocityY = -1;
  } else if (e.key === "ArrowDown") {
    //se le pone 0 para que no se mueva en x
    velocityX = 0;
    //se resta 1 para que vaya hacia arriba
    velocityY = 1;
  } else if (e.key === "ArrowLeft") {
    //se le pone 0 para que no se mueva en y
    velocityY = 0;
    //se resta 1 para que vaya hacia la izquierda
    velocityX = -1;
  } else if (e.key === "ArrowRight") {
    //se le pone 0 para que no se mueva en y
    velocityY = 0;
    //se suma 1 para que vaya hacia la derecha
    velocityX = 1;
  }

};

const initGame = () => {
  let htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX}"></div>`;

  //comer la comida
  if(snakeX === foodX && snakeY === foodY){
    changeFoodPosition()
  }


  // Actualiza la posición de la serpiente sumando la velocidad en cada eje
  snakeY += velocityY; // mueve la serpiente en el eje vertical (arriba/abajo)
  snakeX += velocityX; // mueve la serpiente en el eje horizontal (izquierda/derecha)

  //crear serpiente
  htmlMarkup += `<div class="snake" style="grid-area:${snakeY} / ${snakeX}"></div>`;

  playBoard.innerHTML = htmlMarkup;
};

//lamado a la funcion
changeFoodPosition();
//ejecutar la funcion initGame cada 125ms
setInterval(initGame, 125);

//nuevo evento
document.addEventListener("keydown", changeDirection);
