var blueCollide = false;
var redCollide = false;

function collisonDetection(bluecar, redcar, obstacle) {
  this.bluecar = bluecar;
  this.redcar = redcar;
  this.obstacle = obstacle;
  if (this.obstacle.obstacleType === "circle") {
    //call score updater
    //redObstaclesList.remove(this.obstacle);
  } else if (this.obstacle.obstacleType === "rect") {
    if (
      this.redcar.redCarLane === this.obstacle.lane &&
      this.obstacle.y + 40 >= this.redcar.redCarTop &&
      this.obstacle.y <= this.redcar.redCarTop + 75
    ) {
      redCollide = true;
      // return redCollide;
    } else redCollide = false;

    if (
      this.bluecar.blueCarLane === this.obstacle.lane &&
      this.obstacle.y + 40 >= this.bluecar.blueCarTop &&
      this.obstacle.y <= this.bluecar.blueCarTop + 75
    ) {
      blueCollide = true;
      // return redCollide;
    } else blueCollide = false;
  }
}
