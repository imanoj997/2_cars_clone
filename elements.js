//car coordinates
var redCarLane1 = 45.25;
var redCarLane2 = 181.75;
var redCarTop = 480;
var blueCarLane1 = 324.25;
var blueCarLane2 = 460.75;
var blueCarTop = 480;
var isRedCarMoving = false;
var isBlueCarMoving = false;
var carXChange = 1;

//car class
function Cars() {
  this.redCarLeft = redCarLane1;
  this.redCarTop = redCarTop;
  this.blueCarLeft = blueCarLane1;
  this.blueCarTop = blueCarTop;
  this.blueCar = new Image();
  this.redCar = new Image();
  this.redCarLane = 'left';
  this.blueCarLane = 'left';

  this.drawRed = function() {
    this.redCar.src = './images/red-car.png';
    c.drawImage(this.redCar, this.redCarLeft, this.redCarTop);
  };

  this.drawBlue = function() {
    this.blueCar.src = './images/blue-car.png';
    c.drawImage(this.blueCar, this.blueCarLeft, this.blueCarTop);
  };

  this.changeRedCarLane = function(carXChange) {
    if (carR.redCarLane === 'left' && isRedCarMoving === false) {
      var swipePosition = setInterval(function() {
        if (carR.redCarLeft <= redCarLane2) {
          isRedCarMoving = true;
          carR.redCarLeft += carXChange;
        } else {
          isRedCarMoving = false;
          carR.redCarLane = 'right';
          clearInterval(swipePosition);
        }
      }, 1);
    } else if (carR.redCarLane === 'right' && isRedCarMoving === false) {
      var swipePosition = setInterval(function() {
        if (carR.redCarLeft >= redCarLane1) {
          isRedCarMoving = true;
          carR.redCarLeft -= carXChange;
        } else {
          isRedCarMoving = false;
          carR.redCarLane = 'left';
          clearInterval(swipePosition);
        }
      }, 1);
    }
  };

  this.changeBlueCarLane = function(carXChange) {
    if (carB.blueCarLane === 'left' && isBlueCarMoving === false) {
      var swipePosition = setInterval(function() {
        if (carB.blueCarLeft <= blueCarLane2) {
          isBlueCarMoving = true;
          carB.blueCarLeft += carXChange;
        } else {
          isBlueCarMoving = false;
          carB.blueCarLane = 'right';
          clearInterval(swipePosition);
        }
      }, 1);
    } else if (carB.blueCarLane === 'right' && isBlueCarMoving === false) {
      var swipePosition = setInterval(function() {
        if (carB.blueCarLeft >= blueCarLane1) {
          isBlueCarMoving = true;
          carB.blueCarLeft -= carXChange;
        } else {
          isBlueCarMoving = false;
          carB.blueCarLane = 'left';
          clearInterval(swipePosition);
        }
      }, 1);
    }
  };
}

//draws divider lines
function lines() {
  //middle line
  c.beginPath();
  c.moveTo(267, 0);
  c.lineTo(267, 627);
  c.lineWidth = 12;
  c.strokeStyle = '#8198f1';
  c.stroke();

  //left line
  c.beginPath();
  c.moveTo(130.5, 0);
  c.lineTo(130.5, 627);
  c.lineWidth = 6;
  c.stroke();

  //right line
  c.beginPath();
  c.moveTo(409.5, 0);
  c.lineTo(409.5, 627);
  c.stroke();
}

// draws blue background
function drawBackground() {
  var img = document.getElementsByTagName('img')[0];
  c.drawImage(img, 0, 0);
}
