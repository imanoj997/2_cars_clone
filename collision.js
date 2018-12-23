var currentScore = 0;
var highScore;

var isCollison = false;
var isCircle = false;
var blueCollide = false;
var redCollide = false;
var isCircleMissed;

// checks collision between cars and obstacles
function collisonDetection(bluecar, redcar, obstacle) {
  this.bluecar = bluecar;
  this.redcar = redcar;
  this.obstacle = obstacle;

  //increase score in case of collison of car and circle obtacle
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
    }
    //game over in case of collison of car and rect obtacle
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

//checks if any circle is missed by car, gameover if missed
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
  } else if (
    this.obstacle.obstacleType === "circle" &&
    obstacle.color === "blue" &&
    this.obstacle.y > this.bluecar.blueCarTop + 75
  ) {
    isCircleMissed = true;
  } else isCircleMissed = false;
}
