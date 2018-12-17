var canvas = document.getElementsByTagName('canvas')[0];
var c = canvas.getContext('2d');


var img = document.getElementsByTagName('img')[0];
var bgDistance = 0;
var bgVelocity = 300;
var bgFrameGapTime = 17;

var redObstacleCircleImg = document.getElementsByTagName('img')[1];
var redObstacleRectImg = document.getElementsByTagName('img')[2];
var carDistance = 0;
var carVelocity = 300;
var carFrameGapTime = 17;

var redObstacleArray = [];
var blueCircleArray = [];
var redRectArray = [];
var blueRectArray = [];

var redObstacleXArray = [45.25, 181.25];
var redObstacleTypeArray = ['circle','rect']
var blueCircleXArray = [324.25, 460.75];
var circleY = 0;


//car coordinates
var redCarLeft = 45.25;
var redCarTop = 480;
var blueCarLeft = 460.75;
var blueCarTop = 480;

canvas.width = window.innerWidth / 2.5;
canvas.height = window.innerHeight - 2;

var count = 0;


function Game() {
    var initialredObstacle = new RedObstacles();
    redObstacleArray.push(initialredObstacle);
    function init() {
        c.clearRect(0, 0, canvas.width, canvas.height);
        moveBackground();
        lines();
        var cars = new Cars();
        cars.drawRed();
        cars.drawBlue();
        if(count%100 === 0){
            var redObstacle = new RedObstacles();
            redObstacleArray.push(redObstacle);
            //console.log(redObstacle + 'created');
        }
        redObstacleArray.forEach(element => {
            element.draw();
            element.update();
            if (element.y>canvas.height) {
                redObstacleArray.splice(0,1);
                //console.log(element + 'destroyed');
            }
        });
        
        
        count++;
        requestAnimationFrame(init);
    }
    init();
    
}


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


function RedObstacles() {
    this.x = redObstacleXArray[Math.floor((Math.random() * 2))];
    this.y = circleY;
    this.radius = 20;
    this.obstacleType = redObstacleTypeArray[Math.floor((Math.random() * 2))];

    this.draw = function(){
        if (this.obstacleType == 'circle') {
            c.drawImage(redObstacleCircleImg, this.x, this.y);
        }
        else{
            c.drawImage(redObstacleRectImg, this.x, this.y);
        }
        
    }

    this.update = function () {
        this.y += carVelocity * (carFrameGapTime / 1000);
    }

    this.getElement = function () {
        return redObstacle;
    }
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


Game();

