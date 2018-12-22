var img = document.getElementsByTagName("img")[1];
var bgDistance = 0;
var bgVelocity = 300;
var bgFrameGapTime = 17;

//car coordinates
var redCarLane1 = 45.25;
var redCarLane2 = 181.75;
var redCarTop = 480;
var blueCarLane1 = 324.25;
var blueCarLane2 = 460.75;
var blueCarTop = 480;
var isRedCarMoving = false;
var isBlueCarMoving = false;

function Cars() {
  this.redCarLeft = redCarLane1;
  this.redCarTop = redCarTop;
  this.blueCarLeft = blueCarLane1;
  this.blueCarTop = blueCarTop;
  this.blueCar = new Image();
  this.redCar = new Image();
  this.redCarLane = "left";
  this.blueCarLane = "left";

  this.drawRed = function() {
    this.redCar.src = "./images/red-car.png";
    c.drawImage(this.redCar, this.redCarLeft, this.redCarTop);
  };

  this.drawBlue = function() {
    this.blueCar.src = "./images/blue-car.png";
    c.drawImage(this.blueCar, this.blueCarLeft, this.blueCarTop);
  };

  this.changeRedCarLane = function() {
    if (carR.redCarLane === "left" && isRedCarMoving === false) {
      var swipePosition = setInterval(function() {
        if (carR.redCarLeft <= redCarLane2) {
          isRedCarMoving = true;
          carR.redCarLeft += 1;
        } else {
          isRedCarMoving = false;
          carR.redCarLane = "right";
          clearInterval(swipePosition);
        }
      }, 1);
    } else if (carR.redCarLane === "right" && isRedCarMoving === false) {
      var swipePosition = setInterval(function() {
        if (carR.redCarLeft >= redCarLane1) {
          isRedCarMoving = true;
          carR.redCarLeft -= 1;
        } else {
          isRedCarMoving = false;
          carR.redCarLane = "left";
          clearInterval(swipePosition);
        }
      }, 1);
    }
  };

  this.changeBlueCarLane = function() {
    if (carB.blueCarLane === "left" && isBlueCarMoving === false) {
      var swipePosition = setInterval(function() {
        if (carB.blueCarLeft <= blueCarLane2) {
          isBlueCarMoving = true;
          carB.blueCarLeft += 1;
        } else {
          isBlueCarMoving = false;
          carB.blueCarLane = "right";
          clearInterval(swipePosition);
        }
      }, 1);
    } else if (carB.blueCarLane === "right" && isBlueCarMoving === false) {
      var swipePosition = setInterval(function() {
        if (carB.blueCarLeft >= blueCarLane1) {
          isBlueCarMoving = true;
          carB.blueCarLeft -= 1;
        } else {
          isBlueCarMoving = false;
          carB.blueCarLane = "left";
          clearInterval(swipePosition);
        }
      }, 1);
    }
  };
}

function lines() {
  //middle line
  c.beginPath();
  c.moveTo(267, 0);
  c.lineTo(267, 627);
  c.lineWidth = 12;
  c.strokeStyle = "#8198f1";
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

function moveBackground() {
  bgDistance += bgVelocity * (bgFrameGapTime / 1000);
  if (bgDistance > canvas.height) {
    bgDistance = 0;
  }
  c.save();
  c.translate(0, bgDistance);
  c.drawImage(img, 0, 0);
  c.drawImage(img, 0, -img.height + 1);
  c.restore();
}
