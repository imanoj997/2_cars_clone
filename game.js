var canvas = document.getElementsByTagName('canvas')[0];
var c = canvas.getContext('2d');

canvas.width = window.innerWidth / 2.5;
canvas.height = window.innerHeight;

var welcomeScreen = document.getElementsByTagName('div')[1];
welcomeScreen.width = window.innerWidth / 2.5;
welcomeScreen.height = window.innerHeight - 2;

var gameOverScreen = document.getElementsByTagName('div')[2];
gameOverScreen.width = window.innerWidth / 2.5;
gameOverScreen.height = window.innerHeight;

var redObstaclesList = new RedObstaclesList();
var blueObstaclesList = new BlueObstaclesList();

var redKeyPressed = false;
var blueKeyPressed = false;

var highScore = 0;
var carR = new Cars();
var carB = new Cars();

var newGame;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function Game(levelSelector, velocity) {
  velocity = 250 + levelSelector * 100;
  if (levelSelector === 1) {
    carXChange = 1;
  } else carXChange = levelSelector - 0.5;
  var animationFrame;
  //random numbers generated to create obstacles regularly in random time; when redObstacleDelay % redRandomDelay === 0
  var redRandomDelay = getRandomInt(39, 79);
  var blueRandomDelay = getRandomInt(41, 81);

  this.start = function() {
    requestAnimationFrame(init);
  };

  //contains main game logic, is refreshed every frame
  init = function() {
    var isOver = false;
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    lines();

    if (redObstacleDelay % redRandomDelay === 0) {
      redObstacleDelay = 1;
      redRandomDelay = getRandomInt(39, 79);
      var redObstacle = new RedObstacles(velocity);
      redObstaclesList.add(redObstacle);
    }
    if (blueObstacleDelay % blueRandomDelay === 0) {
      blueObstacleDelay = 1;
      blueRandomDelay = getRandomInt(41, 81);
      var blueObstacle = new BlueObstacles(velocity);
      blueObstaclesList.add(blueObstacle);
    }

    carR.drawRed();
    carB.drawBlue();

    //handlers for two keys to control cars
    window.onkeydown = function(e) {
      var code = e.keyCode ? e.keyCode : e.which;
      if (code === 90) {
        //z key
        carR.changeRedCarLane(carXChange);
      }
      if (code === 77) {
        //m key
        carB.changeBlueCarLane(carXChange);
      }
    };

    //araay of obstacles of red color; both circles and rectangles
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

    //similarly for blue obstacles
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

// Loads game intro screen and provides button listners to start game, see user manual, select level
function loadWelcomeScreen() {
  velocity = 250 + levelSelector * 100;
  gameOverScreen.style.display = 'none';
  drawBackground();
  lines();
  canvas.style.opacity = 0.8;
  newGame = new Game(levelSelector, velocity);
  var playBtn = document.getElementById('playBtn');
  playBtn.addEventListener('click', function() {
    startGame(newGame);
  });

  // Handlers for various button on welcome screen
  var userManualBtn = document.getElementById('userManualBtn');
  userManualBtn.addEventListener('click', function() {
    var instructions = document.getElementsByTagName('h2');
    for (let i = 0; i < instructions.length; i++) {
      instructions[i].style.display = 'block';
    }
    var btnRow = document.getElementsByClassName('btnRow');
    for (let i = 0; i < btnRow.length; i++) {
      btnRow[i].style.display = 'none';
    }
    setTimeout(function() {
      for (let i = 0; i < instructions.length; i++) {
        instructions[i].style.display = 'none';
      }
      for (let i = 0; i < btnRow.length; i++) {
        btnRow[i].style.display = 'inline';
      }
    }, 8000);
  });

  var levelBtn = document.getElementById('levelBtn');
  var levelColumn = document.getElementsByClassName('level');
  levelBtn.addEventListener('click', function() {
    var temp = 'show';
    selectLevel(temp);
  });

  var newBieBtn = document.getElementById('level1');
  newBieBtn.addEventListener('click', function() {
    levelSelector = 1;
    var newGame = new Game(levelSelector, velocity);
    var temp = 'hide';
    selectLevel(temp);
  });

  var avgBtn = document.getElementById('level2');
  avgBtn.addEventListener('click', function() {
    levelSelector = 2;
    var newGame = new Game(levelSelector, velocity);
    var temp = 'hide';
    selectLevel(temp);
  });

  var proBtn = document.getElementById('level3');
  proBtn.addEventListener('click', function() {
    levelSelector = 3;
    var newGame = new Game(levelSelector, velocity);
    var temp = 'hide';
    selectLevel(temp);
  });

  //function to handles appearance and disappearance of level buttons
  function selectLevel(action) {
    if (action === 'show') {
      for (let i = 0; i < levelColumn.length; i++) {
        levelColumn[i].style.display = 'block';
        levelBtn.style.display = 'none';
      }
    } else if (action === 'hide') {
      for (let i = 0; i < levelColumn.length; i++) {
        levelColumn[i].style.display = 'none';
        levelBtn.style.display = 'inline';
      }
    }
  }
}

//loads gameover screen, provides option to return to home or replay game
function loadGameOverScreen() {
  gameOverScreen.style.display = 'block';
  canvas.style.opacity = 0.8;
  c.font = 'bold 25pt Quicksand, sans-serif';
  c.fillText('High Score -', 310, 50);
  c.font = 'bold 40pt Quicksand, sans-serif';
  c.fillText(localStorage.getItem('highScore'), 500, 55);
  console.log(highScore);

  c.fillStyle = 'white';
}

var replayBtn = document.getElementById('rePlayBtn');
replayBtn.addEventListener('click', function() {
  gameOverScreen.style.display = 'none';
  location.reload = loadReGame();
});

var homeBtn = document.getElementById('homeBtn');
homeBtn.addEventListener('click', function() {
  location.reload();
});

//handles reloading game when replaying from gameover tab
function loadReGame() {
  velocity = 250 + levelSelector * 100;
  redObstaclesList = new RedObstaclesList();
  blueObstaclesList = new BlueObstaclesList();

  redKeyPressed = false;
  blueKeyPressed = false;

  currentScore = 0;

  isCollison = false;
  isCircle = false;
  blueCollide = false;
  isCircleMissed = false;

  reGame = new Game(levelSelector, velocity);
  drawBackground();
  lines();
  canvas.style.opacity = 0.8;
  startGame(reGame);
}

//hides welcomescreen and fires the game
function startGame(game) {
  welcomeScreen.style.display = 'none';
  canvas.style.opacity = 1;
  game.start();
}

//updates user's current score and saves high score
function updateScore() {
  if (isCollison === true && isCircle === true) {
    currentScore++;
  }
  c.fillText(currentScore, 30, 50);
  c.fillStyle = 'white';
  c.font = 'bold 40pt Quicksand, sans-serif';
  console.log(currentScore, highScore);
  if (currentScore > highScore) {
    highScore = currentScore;
    localStorage.setItem('highScore', highScore);
  }
}

// listner to start game with space key
window.onkeydown = function(e) {
  var code = e.keyCode ? e.keyCode : e.which;

  if (code === 32) {
    //space key
    welcomeScreen.style.display = 'none';
    canvas.style.opacity = 1;
    newGame.start();
  } else {
    //z key
    alert('Please click play button or press space key');
  }
};

// starting point of the game
loadWelcomeScreen();
