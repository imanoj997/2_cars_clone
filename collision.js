var currentScore = 0;
var highScore;

var isCollison = false;
var isCircle = false;
var blueCollide = false;
var redCollide = false;
var isCircleMissed;

function collisonDetection(bluecar, redcar, obstacle) {
  this.bluecar = bluecar;
  this.redcar = redcar;
  this.obstacle = obstacle;

  if (this.obstacle.obstacleType === "circle") {
    if (obstacle.color === "red") {
      if (
        this.redcar.redCarLane === this.obstacle.lane &&
        this.obstacle.y + 40 >= this.redcar.redCarTop &&
        this.obstacle.y <= this.redcar.redCarTop + 75 &&
        isRedCarMoving === false
      ) {
        isCollision = true;
        isCircle = true;
        redObstaclesList.remove(this.obstacle);
        currentScore++;
      }
    }
    if (obstacle.color === "blue") {
      if (
        this.bluecar.blueCarLane === this.obstacle.lane &&
        this.obstacle.y + 40 >= this.bluecar.blueCarTop &&
        this.obstacle.y <= this.bluecar.blueCarTop + 75 &&
        isRedCarMoving === false
      ) {
        isCollision = true;
        isCircle = true;
        blueObstaclesList.remove(this.obstacle);
        currentScore++;
      }
    }
  } else if (this.obstacle.obstacleType === "rect") {
    if (obstacle.color === "red") {
      if (
        this.redcar.redCarLane === this.obstacle.lane &&
        this.obstacle.y + 40 >= this.redcar.redCarTop &&
        this.obstacle.y <= this.redcar.redCarTop + 75 &&
        isRedCarMoving === false
      ) {
        redCollide = true;
      } else redCollide = false;
    }
    if (obstacle.color === "blue") {
      if (
        this.bluecar.blueCarLane === this.obstacle.lane &&
        this.obstacle.y + 40 >= this.bluecar.blueCarTop &&
        this.obstacle.y <= this.bluecar.blueCarTop + 75 &&
        isBlueCarMoving === false
      ) {
        blueCollide = true;
      } else blueCollide = false;
    }
  }
}

function circleMissed(bluecar, redcar, obstacle) {
  this.bluecar = bluecar;
  this.redcar = redcar;
  this.obstacle = obstacle;
  if (
    this.obstacle.obstacleType === "circle" &&
    obstacle.color === "red" &&
    this.obstacle.y > this.redcar.redCarTop + 75
  ) {
    isCircleMissed = true;
    // console.log("red missed");
  } else if (
    this.obstacle.obstacleType === "circle" &&
    obstacle.color === "blue" &&
    this.obstacle.y > this.bluecar.blueCarTop + 75
  ) {
    isCircleMissed = true;
    // console.log("blue missed");
  } else isCircleMissed = false;
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
