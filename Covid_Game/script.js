function loadAssets() {
  enemyImg = new Image();
  enemyImg.src = "Assets/virus.png";

  playerImg = new Image();
  playerImg.src = "Assets/doctor.png";

  vaccineImg = new Image();
  vaccineImg.src = "Assets/vaccine.png";
}

function init() {
  canvas = document.getElementById("myCanvas");
  W = 700;
  H = 400;

  canvas.width = W;
  canvas.height = H;

  pen = canvas.getContext("2d");
  gameOver = false;
  e1 = {
    x: 150,
    y: 50,
    w: 60,
    h: 60,
    speed: 20,
  };

  e2 = {
    x: 300,
    y: 150,
    w: 60,
    h: 60,
    speed: 30,
  };

  e3 = {
    x: 450,
    y: 20,
    w: 60,
    h: 60,
    speed: 40,
  };

  enemy = [e1, e2, e3];

  player = {
    x: 20,
    y: H / 2,
    w: 60,
    h: 60,
    speed: 15,
    moving: false,
    health: 100,
    score: 0,
  };

  vaccine = {
    x: W - 100,
    y: H / 2,
    w: 60,
    h: 60,
  };

  // Listener
  canvas.addEventListener("mousedown", () => {
    player.moving = true;
  });

  canvas.addEventListener("mouseup", () => {
    player.moving = false;
  });

  //TouchScreen
  canvas.addEventListener("touchstart", () => {
    player.moving = true;
  });
  canvas.addEventListener("touchend", () => {
    player.moving = false;
  });

  gotVaccine = false;
}

//From MDN Site
function isOverlap(rect1, rect2) {
  console.log("Working...");
  if (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.h + rect1.y > rect2.y
  ) {
    return true;
  } else {
    return false;
  }
}

function draw() {
  pen.clearRect(0, 0, W, H);

  pen.drawImage(playerImg, player.x, player.y, player.w, player.h);
  if (!gotVaccine) {
    pen.drawImage(vaccineImg, vaccine.x, vaccine.y, vaccine.w, vaccine.h);
  }
  for (let i = 0; i < enemy.length; i++) {
    pen.drawImage(enemyImg, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
  }

  pen.fillStyle = "white";
  pen.font = "20px Arial";

  if (player.health <= 25) {
    pen.fillStyle = "red";
  } else {
    pen.fillStyle = "white";
  }

  pen.fillText("Health: " + player.health, 10, H - 10);
}

function update() {
  if (player.moving) {
    player.x += player.speed;
    player.health += 2;
    if (player.health > 100) {
      player.health = 100;
    }
  }
  if (player.x >= W - player.w) {
    player.x = W - player.w;
  }

  for (let i = 0; i < enemy.length; i++) {
    if (isOverlap(player, enemy[i])) {
      player.health -= 5;
      if (player.health <= 0) {
        gameOver = true;
      }
    }
  }

  if (isOverlap(player, vaccine)) {
    if (player.x >= vaccine.x) {
      gotVaccine = true;
      draw();
      gameOver = true;
      player.x = 20;
    }
  }

  for (let i = 0; i < enemy.length; i++) {
    enemy[i].y += enemy[i].speed;
    if (enemy[i].y >= H - enemy[i].h || enemy[i].y <= 0) {
      enemy[i].speed *= -1;
    }
  }
}

function gameLoop() {
  if (gameOver) {
    alert("Game Over");
    clearInterval(game);
  }
  draw();
  update();
}

loadAssets();
init();
let game = setInterval(gameLoop, 100);
