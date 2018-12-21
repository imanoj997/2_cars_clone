var canvas = document.getElementsByTagName("canvas")[0];
var c = canvas.getContext("2d");

canvas.width = window.innerWidth / 2.5;
canvas.height = window.innerHeight - 2;

var welcomeScreen = document.getElementsByTagName("div")[1];
welcomeScreen.width = window.innerWidth / 2.5;
welcomeScreen.height = window.innerHeight - 2;

var redObstaclesList = new RedObstaclesList();
var blueObstaclesList = new BlueObstaclesList();

var carR = new Cars();
var carB = new Cars();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function Game() {
  var animationFrame;
  var redRandomDelay = getRandomInt(39, 79);
  var blueRandomDelay = getRandomInt(41, 81);

  this.start = function() {
    requestAnimationFrame(init);
  };

  init = function() {
    var isOver = false;
    c.clearRect(0, 0, canvas.width, canvas.height);
    moveBackground();
    lines();

    if (redObstacleDelay % redRandomDelay === 0) {
      //console.log(obstacleDelay,randomDelay);
      redObstacleDelay = 1;
      redRandomDelay = getRandomInt(39, 79);
      var redObstacle = new RedObstacles();
      redObstaclesList.add(redObstacle);
      //console.log(redObstacle + 'created');
    }
    if (blueObstacleDelay % blueRandomDelay === 0) {
      blueObstacleDelay = 1;
      blueRandomDelay = getRandomInt(41, 81);
      var blueObstacle = new BlueObstacles();
      blueObstaclesList.add(blueObstacle);
    }

    carR.drawRed();
    carB.drawBlue();

    redObstaclesList.redObstacleArray.forEach(element => {
      element.draw();
      // console.log(carR.redCarLeft, carR.redCarLane);
      // console.log(element.lane, element.x, element.obstacleType);

      window.onkeydown = function(e) {
        var code = e.keyCode ? e.keyCode : e.which;
        if (code === 90) {
          //left arrow key
          carR.redCarLeft = redCarLane2;
          carR.changeRedCarLane();
        }
        if (code === 77) {
          //left arrow key
          carB.blueCarLeft = blueCarLane2;
          carB.chnageBlueCarLane();
        }
      };
      collisonDetection(carB, carR, element);
      if (redCollide === false) {
        element.update();
        if (element.y > canvas.height) {
          redObstaclesList.remove(redObstacle);
          //console.log(element + 'destroyed');
        }
      } else if (redCollide === true) {
        console.log("red" + redCollide);
        isOver = true;
      }
    });

    blueObstaclesList.blueObstacleArray.forEach(element => {
      element.draw();
      collisonDetection(carB, carR, element);
      if (blueCollide === false) {
        element.update();
        if (element.y > canvas.height) {
          blueObstaclesList.remove(blueObstacle);
        }
      } else if (blueCollide === true) {
        isOver = true;
        console.log("blue" + blueCollide);
      }
    });
    redObstacleDelay++;
    blueObstacleDelay++;

    if (!isOver) requestAnimationFrame(init);
  };
}

function loadWelcomeScreen() {
  moveBackground();
  lines();
  var carR = new Cars();
  var carB = new Cars();
  // new Cars().drawBlue();
  // new Cars().drawRed();
  canvas.style.opacity = 0.8;
}

var newGame = new Game();
window.onkeydown = function(e) {
  var code = e.keyCode ? e.keyCode : e.which;
  if (code === 32) {
    //space key
    welcomeScreen.style.display = "none";
    canvas.style.opacity = 1;
    newGame.start();
  } else {
    //z key
    alert(event.keyCode);
  }
};

loadWelcomeScreen();
