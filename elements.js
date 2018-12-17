var img = document.getElementsByTagName('img')[0];
var bgDistance = 0;
var bgVelocity = 300;
var bgFrameGapTime = 17;


//car coordinates
var redCarLeft = 45.25;
var redCarTop = 480;
var blueCarLeft = 460.75;
var blueCarTop = 480;


function Cars() {
  var blueCar = new Image();
  var redCar = new Image();

  this.drawRed = function () {
      redCar.src = './images/red-car.png';
      c.drawImage(redCar, redCarLeft, redCarTop);
  }

  this.drawBlue = function () {
      blueCar.src = './images/blue-car.png';
      c.drawImage(blueCar, blueCarLeft, blueCarTop);
  }

}

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
