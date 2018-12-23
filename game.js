var canvas = document.getElementsByTagName("canvas")[0];
var c = canvas.getContext("2d");

canvas.width = window.innerWidth / 2.5;
canvas.height = window.innerHeight;

var welcomeScreen = document.getElementsByTagName("div")[1];
welcomeScreen.width = window.innerWidth / 2.5;
welcomeScreen.height = window.innerHeight - 2;

var gameOverScreen = document.getElementsByTagName("div")[2];
gameOverScreen.width = window.innerWidth / 2.5;
gameOverScreen.height = window.innerHeight;

var redObstaclesList = new RedObstaclesList();
var blueObstaclesList = new BlueObstaclesList();

var redKeyPressed = false;
var blueKeyPressed = false;

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
      redObstacleDelay = 1;
      redRandomDelay = getRandomInt(39, 79);
      var redObstacle = new RedObstacles();
      redObstaclesList.add(redObstacle);
    }
    if (blueObstacleDelay % blueRandomDelay === 0) {
      blueObstacleDelay = 1;
      blueRandomDelay = getRandomInt(41, 81);
      var blueObstacle = new BlueObstacles();
      blueObstaclesList.add(blueObstacle);
    }

    carR.drawRed();
    carB.drawBlue();

    window.onkeydown = function(e) {
      var code = e.keyCode ? e.keyCode : e.which;
      if (code === 90) {
        //z key
        carR.changeRedCarLane();
      }
      if (code === 77) {
        //m key
        carB.changeBlueCarLane();
      }
    };

    redObstaclesList.redObstacleArray.forEach(element => {
      element.draw();

      collisonDetection(carB, carR, element);
      circleMissed(carB, carR, element);
      if (redCollide === false && isCircleMissed === false) {
        element.update();
        if (element.y > canvas.height) {
          redObstaclesList.remove(redObstacle);
        }
      } else if (redCollide === true) {
        isOver = true;
        loadGameOverScreen();
      } else if (isCircleMissed === true) {
        isOver = true;
        loadGameOverScreen();
      }
      updateScore();
    });

    blueObstaclesList.blueObstacleArray.forEach(element => {
      element.draw();
      collisonDetection(carB, carR, element);
      circleMissed(carB, carR, element);

      if (blueCollide === false && isCircleMissed === false) {
        element.update();
        if (element.y > canvas.height) {
          blueObstaclesList.remove(blueObstacle);
        }
      } else if (blueCollide === true) {
        isOver = true;
        loadGameOverScreen();
      } else if (isCircleMissed === true) {
        isOver = true;
        loadGameOverScreen();
      }
      updateScore();
    });
    redObstacleDelay++;
    blueObstacleDelay++;

    if (!isOver) requestAnimationFrame(init);
  };
}

function loadWelcomeScreen() {
  var newGame = new Game();
  gameOverScreen.style.display = "none";
  moveBackground();
  lines();
  canvas.style.opacity = 0.8;
  var playBtn = document.getElementById("playBtn");
  playBtn.addEventListener("click", function() {
    startGame(newGame);
  });
}

function loadGameOverScreen() {
  gameOverScreen.style.display = "block";
  canvas.style.opacity = 0.8;
}

var replayBtn = document.getElementById("rePlayBtn");
replayBtn.addEventListener("click", function() {
  gameOverScreen.style.display = "none";
  location.reload = loadReGame();
});

function loadReGame() {
  redObstaclesList = new RedObstaclesList();
  blueObstaclesList = new BlueObstaclesList();

  redKeyPressed = false;
  blueKeyPressed = false;

  currentScore = 0;

  isCollison = false;
  isCircle = false;
  blueCollide = false;
  isCircleMissed = false;

  reGame = new Game();
  moveBackground();
  lines();
  canvas.style.opacity = 0.8;
  startGame(reGame);
}

function startGame(game) {
  welcomeScreen.style.display = "none";
  canvas.style.opacity = 1;
  game.start();
}

loadWelcomeScreen();

window.onkeydown = function(e) {
  var code = e.keyCode ? e.keyCode : e.which;

  if (code === 32) {
    //space key
    welcomeScreen.style.display = "none";
    canvas.style.opacity = 1;
    newGame.start();
  } else {
    //z key
    alert("Please click play button or press space key");
  }
};
