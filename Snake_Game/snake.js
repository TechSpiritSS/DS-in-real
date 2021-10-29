function init() {
  canvas = document.getElementById("mycanvas");
  W = canvas.width = 900;
  H = canvas.height = 900;
  pen = canvas.getContext("2d");
  gameover = false;
  cellSize = 66;
  score = 0;

  food_img = new Image();
  food_img.src = "apple.png";

  trophy = new Image();
  trophy.src = "trophy.png";

  snake = {
    init_length: 5,
    color: "red",
    cells: [],
    direction: "right",

    createSnake: function () {
      for (let i = this.init_length; i > 0; --i) {
        this.cells.push({ x: i, y: 0 });
      }
    },

    drawSnake: function () {
      for (let i = 0; i < this.cells.length; ++i) {
        pen.fillStyle = this.color;
        pen.fillRect(
          this.cells[i].x * cellSize,
          this.cells[i].y * cellSize,
          cellSize - 2,
          cellSize - 2
        );
      }
    },

    updateSnake: function () {
      let headX = this.cells[0].x;
      let headY = this.cells[0].y;

      if (headX == food.x && headY == food.y) {
        food = getRandomFood(snake);
        score++;
      } else {
        this.cells.pop();
      }

      let X, Y;
      if (this.direction == "right") {
        X = headX + 1;
        Y = headY;
      }

      if (this.direction == "left") {
        X = headX - 1;
        Y = headY;
      }

      if (this.direction == "up") {
        X = headX;
        Y = headY - 1;
      }

      if (this.direction == "down") {
        X = headX;
        Y = headY + 1;
      }

      this.cells.unshift({ x: X, y: Y });

      if (this.cells[0].x > W / cellSize || this.cells[0].x < 0) {
        gameover = true;
      }
      if (this.cells[0].y > H / cellSize || this.cells[0].y < 0) {
        gameover = true;
      }

      for (let i = 1; i < this.cells.length; ++i) {
        if (
          this.cells[0].x == this.cells[i].x &&
          this.cells[0].y == this.cells[i].y
        ) {
          gameover = true;
        }
      }
    },
  };

  snake.createSnake();
  food = getRandomFood(snake);

  document.addEventListener("keydown", (e) => {
    let key = e.key;
    if (key == "ArrowRight" && snake.direction != "left") {
      snake.direction = "right";
    } else if (key == "ArrowLeft" && snake.direction != "right") {
      snake.direction = "left";
    } else if (key == "ArrowUp" && snake.direction != "down") {
      snake.direction = "up";
    } else if (key == "ArrowDown" && snake.direction != "up") {
      snake.direction = "down";
    }
  });
}

function draw() {
  pen.clearRect(0, 0, W, H);
  snake.drawSnake();
  pen.drawImage(
    food_img,
    food.x * cellSize,
    food.y * cellSize,
    cellSize,
    cellSize
  );

  pen.drawImage(trophy, 0, 0, cellSize, cellSize);
  pen.fillStyle = "blue";
  pen.font = "20px Arial";
  pen.fillText(score, 25, 30);
}

function update() {
  snake.updateSnake();
}

function getRandomFood(snake) {
  let foodX = Math.round((Math.random() * (W - cellSize)) / cellSize);
  let foodY = Math.round((Math.random() * (H - cellSize)) / cellSize);

  var food = {
    x: foodX,
    y: foodY,
    color: "green",
  };

  for (let i = 0; i < snake.cells.length; ++i) {
    if (food.x == snake.cells[i].x && food.y == snake.cells[i].y) {
      food = getRandomFood();
    }
  }

  return food;
}

function gameloop() {
  if (gameover) {
    alert("Game Over");
    clearInterval(f);
    return;
  }
  draw();
  update();
}

init();
f = setInterval(gameloop, 125);
