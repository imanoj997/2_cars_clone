var redObstacleCircleImg = document.getElementsByTagName('img')[1];
var redObstacleRectImg = document.getElementsByTagName('img')[2];
var blueObstacleCircleImg = document.getElementsByTagName('img')[3];
var blueObstacleRectImg = document.getElementsByTagName('img')[4];

var obstacleVelocity = 300;
var obstacleFrameGapTime = 17;
var redObstacleArray = [];
var blueObstacleArray = [];

var redObstacleXArray = [45.25, 181.25];
var blueObstacleXArray = [324.25, 460.75];
var circleY = 0;

var obstacleTypeArray = ['circle', 'rect']
var obstacleDelayArray = [45, 50, 65, 80, 85];


var redObstacleDelay = 0;
var blueObstacleDelay = 0;


function RedObstacles() {
  this.x = redObstacleXArray[Math.floor((Math.random() * 2))];
  this.y = circleY;
  this.radius = 20;
  this.obstacleType = obstacleTypeArray[Math.floor((Math.random() * 2))];
  //this.obstacleDelay = getRandomInt(30,100);

  this.draw = function () {
    if (this.obstacleType == 'circle') {
      c.drawImage(redObstacleCircleImg, this.x, this.y);
    } else {
      c.drawImage(redObstacleRectImg, this.x, this.y);
    }

  }

  this.update = function () {
    this.y += obstacleVelocity * (obstacleFrameGapTime / 1000);
  }

  // this.getElement = function () {
  //     return redObstacle;
  // }
}

function BlueObstacles() {
  this.x = blueObstacleXArray[Math.floor((Math.random() * 2))];
  this.y = circleY;
  this.radius = 20;
  this.obstacleType = obstacleTypeArray[Math.floor((Math.random() * 2))];

  this.draw = function () {
    if (this.obstacleType == 'circle') {
      c.drawImage(blueObstacleCircleImg, this.x, this.y);
    } else {
      c.drawImage(blueObstacleRectImg, this.x, this.y);
    }

  }

  this.update = function () {
    this.y += obstacleVelocity * (obstacleFrameGapTime / 1000);
  }

}