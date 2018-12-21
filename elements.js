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

function Cars() {
  this.redCarLeft = redCarLane1;
  this.redCarTop = redCarTop;
  this.blueCarLeft = blueCarLane1;
  this.blueCarTop = blueCarTop;
  this.blueCar = new Image();
  this.redCar = new Image();
  this.redCarLane = "left";
  this.blueCarLane = "left";
  // if (this.redCarLeft === redCarLane1) {
  //   this.lane = "left";
  // } else if (this.redCarLeft === redCarLane2) {
  //   this.lane = "right";
  // }

  this.drawRed = function() {
    this.redCar.src = "./images/red-car.png";
    c.drawImage(this.redCar, this.redCarLeft, this.redCarTop);
  };

  this.drawBlue = function() {
    this.blueCar.src = "./images/blue-car.png";
    c.drawImage(this.blueCar, this.blueCarLeft, this.blueCarTop);
  };

  this.changeRedCarLane = function() {
    if (this.redCarLane === "left") {
      this.redCarLane = "right";
      this.redCarLeft = redCarLane2;
    } else if (this.redCarLane === "right") {
      this.redCarLane = "left";
      this.redCarLeft = redCarLane1;
    }
  };

  this.chnageBlueCarLane = function() {
    if (this.blueCarLane === "left") {
      this.blueCarLane = "right";
      this.blueCarLeft = blueCarLane2;
    } else if (this.blueCarLane === "right") {
      this.blueCarLane = "left";
      this.blueCarLeft = blueCarLane1;
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
