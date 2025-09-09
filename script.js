// funcion inicializadora del juego
const playBoard = document.querySelector(".play-board");

//obetner elementos de puntuación
const scoreElement = document.querySelector(".score");
// obtener elemento de puntuación más alta
const highScoreElement = document.querySelector(".high-score");

// coordenadas de la comida
let foodX = 13,
  foodY = 10;

// coordenadas de la serpiente (posición inicial de la cabeza)
let snakeX = 5,
  snakeY = 10;

// cuerpo de la serpiente (arreglo de posiciones [x,y])
let snakeBody = [];

// velocidad actual de la serpiente
let velocityX = 0,
  velocityY = 0;

// dirección siguiente (para evitar giros de 180° instantáneos)
let nextX = 0,
  nextY = 0;

//puntuación
let score = 0;

// puntuación más alta (high score)
let highScore = localStorage.getItem("high-score") || 0;

// función para cambiar la posición de la comida aleatoriamente
const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

// funcion game over
const handleGameOver = () => {
  alert("Game Over! Presiona OK para reiniciar.");
};

// función para cambiar la dirección (solo actualiza la "siguiente")
const changeDirection = (e) => {
  if (e.key === "ArrowUp" && velocityY !== 1) {
    nextX = 0;
    nextY = -1; // hacia arriba
  } else if (e.key === "ArrowDown" && velocityY !== -1) {
    nextX = 0;
    nextY = 1; // hacia abajo
  } else if (e.key === "ArrowLeft" && velocityX !== 1) {
    nextX = -1;
    nextY = 0; // hacia la izquierda
  } else if (e.key === "ArrowRight" && velocityX !== -1) {
    nextX = 1;
    nextY = 0; // hacia la derecha
  }
};

// función principal del juego
const initGame = () => {
  // aplicar la dirección siguiente SOLO al inicio de cada frame
  velocityX = nextX;
  velocityY = nextY;

  // dibujar la comida en la cuadrícula
  let htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX}"></div>`;

  // comprobar si la serpiente come la comida
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]); // crecer
    score++; // aumentar puntuación

    //aqui actualizamos la puntuación en el HTML
    scoreElement.innerText = `Score: ${score}`;

    // actualizar la puntuación más alta (high score)
    highScore = score >= highScore ? score : highScore;

    //alamcenar la puntuación más alta en el HTML
    localStorage.setItem("high-score", highScore);

    //guardar en el almacenamiento local
    localStorage.setItem("high-score", highScore);

    // actualizar el elemento de puntuación más alta en el HTML
    highScoreElement.innerText = `High Score: ${highScore}`;
  }

  // mover el cuerpo de la serpiente
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  // mover la cabeza
  snakeX += velocityX;
  snakeY += velocityY;
  snakeBody[0] = [snakeX, snakeY];

  // comprobar colisión con paredes
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    snakeX = 5;
    snakeY = 10;
    snakeBody = [];
    velocityX = 0;
    velocityY = 0;
    nextX = 0;
    nextY = 0;
    changeFoodPosition();
    handleGameOver();
  }

  // dibujar la serpiente
  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class="snake" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    // comprobar colisión con el cuerpo
    // Verifica si la cabeza de la serpiente colisiona con alguna parte de su cuerpo.
    // i !== 0: asegura que no se compare la cabeza consigo misma.
    // Compara la posición completa (X, Y) de la cabeza con la de cada segmento del cuerpo.
    // Si la condición se cumple, se establece gameOver en true.
    if (
      i !== 0 &&
      snakeBody[0][0] === snakeBody[i][0] &&
      snakeBody[0][1] === snakeBody[i][1]
    ) {
      handleGameOver();
      // Reiniciar el juego
      snakeX = 5;
      snakeY = 10;
      snakeBody = [];
      velocityX = 0;
      velocityY = 0;
      nextX = 0;
      nextY = 0;
      changeFoodPosition();
      break;
    }
  }

  playBoard.innerHTML = htmlMarkup;
};

// llamada inicial
changeFoodPosition();
setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);
