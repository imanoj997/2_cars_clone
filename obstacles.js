var redObstacleCircleImg = document.getElementsByTagName('img')[1];
var redObstacleRectImg = document.getElementsByTagName('img')[2];
var blueObstacleCircleImg = document.getElementsByTagName('img')[3];
var blueObstacleRectImg = document.getElementsByTagName('img')[4];

var levelSelector = 1;
var velocity;
var obstacleFrameGapTime = 17;

var redObstacleXArray = [45.25, 181.75];
var blueObstacleXArray = [324.25, 460.75];
var circleY = 0;

var obstacleTypeArray = ['circle', 'rect'];
var obstacleDelayArray = [45, 50, 65, 80, 85];

var redObstacleDelay = 0;
var blueObstacleDelay = 0;

//class of red obastacles
function RedObstacles(velocity) {
  this.obstacleVelocity = velocity;
  this.x = redObstacleXArray[Math.floor(Math.random() * 2)];
  this.y = circleY;
  this.radius = 20;
  this.obstacleType = obstacleTypeArray[Math.floor(Math.random() * 2)];
  this.color = 'red';
  if (this.x === 45.25) {
    this.lane = 'left';
  } else if (this.x == 181.75) {
    this.lane = 'right';
  }

  this.draw = function() {
    if (this.obstacleType == 'circle') {
      c.drawImage(redObstacleCircleImg, this.x, this.y);
    } else {
      c.drawImage(redObstacleRectImg, this.x, this.y);
    }
  };

  this.update = function() {
    this.y += this.obstacleVelocity * (obstacleFrameGapTime / 1000);
  };
}

//adds and removes red obstacles into an array
function RedObstaclesList() {
  this.redObstacleArray = [];

  this.add = function(obastacle) {
    this.redObstacleArray.push(obastacle);
  };

  this.remove = function() {
    this.redObstacleArray.splice(0, 1);
  };
}

//class of red obastacles
function BlueObstacles(velocity) {
  this.obstacleVelocity = velocity;
  this.x = blueObstacleXArray[Math.floor(Math.random() * 2)];
  this.y = circleY;
  this.radius = 20;
  this.obstacleType = obstacleTypeArray[Math.floor(Math.random() * 2)];
  this.color = 'blue';
  if (this.x === 324.25) {
    this.lane = 'left';
  } else if (this.x == 460.75) {
    this.lane = 'right';
  }

  this.draw = function() {
    if (this.obstacleType == 'circle') {
      c.drawImage(blueObstacleCircleImg, this.x, this.y);
    } else {
      c.drawImage(blueObstacleRectImg, this.x, this.y);
    }
  };

  this.update = function() {
    this.y += this.obstacleVelocity * (obstacleFrameGapTime / 1000);
  };

  this.hide = function() {
    c.hide;
  };
}

//adds and removes blue obstacles into an array
function BlueObstaclesList() {
  this.blueObstacleArray = [];

  this.add = function(obastacle) {
    this.blueObstacleArray.push(obastacle);
  };

  this.remove = function() {
    this.blueObstacleArray.splice(0, 1);
  };
}
