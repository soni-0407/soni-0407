/*<!--

         Name: Jay Soni

         File: main-finished.js

         Date: 05 April 2024

         Here the Javascript is edited and Evilcircle is added*/

-->





// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
  
        }
      

const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "a":
      this.x -= this.velX;
      break;
    case "d":
      this.x += this.velX;
      break;
    case "w":
      this.y -= this.velY;
      break;
    case "s":
      this.y += this.velY;
      break;
  }
});

//Evilcircle constructor
function Evilcircle(x, y, velX, velY, size, color, exist) {
  Ball.call(this, x, y, velX, velY, exist);
  this.size = size;
  this.color = color;
}
Evilcircle.prototype.draw = function () {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
};
Evilcircle.prototype.checkBound = function () {
  if (this.x + this.size >= width) {
    this.x -= this.size;
  }
  if (this.x - this.size <= 0) {
    this.x += this.size;
  }
  if (this.y + this.size >= height) {
    this.y -= this.size;
  }
  if (this.y - this.size <= 0) {
    this.y += this.size;
  }
};
Evilcircle.prototype.collision = function () {
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exist) {
      const dx = this.x - balls[i].x;
      const dy = this.y - balls[i].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[i].size && balls[i].exist) {
        balls[i].exist = false;
        
      }
    }
  }
};

Evilcircle.prototype.control = function () {
  let _this = this;
  window.addEventListener("keydown", keyDownHandler);
  window.addEventListener("keyup", keyUpHandler, false);

  if (rightPressed) {
    _this.x += _this.velX;
  } else if (leftPressed) {
    _this.x -= _this.velX;
  }
  if (downPressed) {
    _this.y += _this.velY;
  } else if (upPressed) {
    _this.y -= _this.velY;
  }
};function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
