var currentScore = 0;
var highScore;

var isCollison = false;
var isCircle = false;
var blueCollide = false;
var redCollide = false;

function collisonDetection(bluecar, redcar, obstacle) {
  this.bluecar = bluecar;
  this.redcar = redcar;
  this.obstacle = obstacle;

  if (this.obstacle.obstacleType === "circle") {
    if (obstacle.color === "red") {
      if (
        this.redcar.redCarLane === this.obstacle.lane &&
        this.obstacle.y + 40 >= this.redcar.redCarTop &&
        this.obstacle.y <= this.redcar.redCarTop + 75
      ) {
        isCollision = true;
        isCircle = true;
        redObstaclesList.remove(this.obstacle);
        currentScore++;
      }
      //  else {
      //   isCollision = false;
      //   isCircle = false;
      // }
    }
    if (obstacle.color === "blue") {
      if (
        this.bluecar.blueCarLane === this.obstacle.lane &&
        this.obstacle.y + 40 >= this.bluecar.blueCarTop &&
        this.obstacle.y <= this.bluecar.blueCarTop + 75
      ) {
        isCollision = true;
        isCircle = true;
        blueObstaclesList.remove(this.obstacle);
        currentScore++;
      }
      // else {
      //   isCollision = false;
      //   isCircle = false;
      // }
    }
  } else if (this.obstacle.obstacleType === "rect") {
    if (obstacle.color === "red") {
      if (
        this.redcar.redCarLane === this.obstacle.lane &&
        this.obstacle.y + 40 >= this.redcar.redCarTop &&
        this.obstacle.y <= this.redcar.redCarTop + 75
      ) {
        redCollide = true;
      } else redCollide = false;
    }
    if (obstacle.color === "blue") {
      if (
        this.bluecar.blueCarLane === this.obstacle.lane &&
        this.obstacle.y + 40 >= this.bluecar.blueCarTop &&
        this.obstacle.y <= this.bluecar.blueCarTop + 75
      ) {
        blueCollide = true;
      } else blueCollide = false;
    }
  }
}

function updateScore() {
  if (isCollison === true && isCircle === true) {
    currentScore++;
  }
  if (currentScore > highScore) {
    highScore = currentScore;
    localStorage.setItem("highScore".highScore);
  }
  c.fillRect(50, 100, 0, 0);
  c.fillText(currentScore, 30, 50);
  c.fillStyle = "white";
  c.font = "bold 40pt Quicksand, sans-serif";
}
