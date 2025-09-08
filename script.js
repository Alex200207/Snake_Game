// funcion inicializadora del juego
const playBoard = document.querySelector(".play-board");

// coordenadas de la comida
let foodX = 13,
  foodY = 10;

// coordenadas de la serpiente (posición inicial de la cabeza)
let snakeX = 5,
  snakeY = 10;

// cuerpo de la serpiente (arreglo de posiciones [x,y])
let snakeBody = [];

// velocidad de la serpiente
let velocityX = 0,
  velocityY = 0;

// función para cambiar la posición de la comida aleatoriamente
const changeFoodPosition = () => {
  // genera un número al azar entre 1 y 30
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

// función para mover la serpiente según la tecla presionada
// en la web, en el eje Y: hacia arriba es negativo y hacia abajo positivo
const changeDirection = (e) => {
  if (e.key === "ArrowUp") {
    velocityX = 0;
    velocityY = -1; // hacia arriba (Y negativo)
  } else if (e.key === "ArrowDown") {
    velocityX = 0;
    velocityY = 1; // hacia abajo (Y positivo)
  } else if (e.key === "ArrowLeft") {
    velocityY = 0;
    velocityX = -1; // hacia la izquierda (X negativo)
  } else if (e.key === "ArrowRight") {
    velocityY = 0;
    velocityX = 1; // hacia la derecha (X positivo)
  }
};

// función principal del juego
const initGame = () => {
  // dibujar la comida en la cuadrícula
  let htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX}"></div>`;

  // comprobar si la serpiente come la comida
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    // agregar un nuevo segmento al cuerpo de la serpiente
    snakeBody.push([foodX, foodY]);
  }

  // mover el cuerpo de la serpiente (cada segmento toma la posición del anterior)
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  // actualizar la posición de la cabeza sumando la velocidad
  snakeY += velocityY; // mueve la serpiente en el eje vertical
  snakeX += velocityX; // mueve la serpiente en el eje horizontal

  // actualizar la cabeza en el cuerpo
  snakeBody[0] = [snakeX, snakeY];

  // dibujar la serpiente
  for (let i = 0; i < snakeBody.length; i++) {
    // grid-area: fila(Y) / columna(X)
    htmlMarkup += `<div class="snake" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
  }

  // mostrar en el tablero
  playBoard.innerHTML = htmlMarkup;
};

// llamada inicial para colocar la comida
changeFoodPosition();

// ejecutar la función initGame cada 125ms (bucle del juego)
setInterval(initGame, 125);

// escuchar las teclas del teclado para cambiar dirección
document.addEventListener("keydown", changeDirection);
