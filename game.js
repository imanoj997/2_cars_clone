var canvas = document.getElementsByTagName('canvas')[0];
var c = canvas.getContext('2d');

canvas.width = window.innerWidth / 2.5;
canvas.height = window.innerHeight - 2;


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function Game() {
    var initialRedObstacle = new RedObstacles();
    redObstacleArray.push(initialRedObstacle);
    var initialBlueObstacle = new BlueObstacles();
    blueObstacleArray.push(initialBlueObstacle);

    var redRandomDelay = getRandomInt(39,79);
    var blueRandomDelay = getRandomInt(41,81);

    function init() {
        c.clearRect(0, 0, canvas.width, canvas.height);
        moveBackground();
        lines();
        var cars = new Cars();
        cars.drawRed();
        cars.drawBlue();
        
        if(redObstacleDelay%redRandomDelay === 0){
            //console.log(obstacleDelay,randomDelay);
            redObstacleDelay = 1;
            redRandomDelay =  getRandomInt(39,79);
            var redObstacle = new RedObstacles();
            redObstacleArray.push(redObstacle);
            //console.log(redObstacle + 'created');
        }
        if(blueObstacleDelay%blueRandomDelay === 0){
            blueObstacleDelay = 1;
            blueRandomDelay =  getRandomInt(41,81);
            var blueObstacle = new BlueObstacles();
            blueObstacleArray.push(blueObstacle);
        }
        
        redObstacleArray.forEach(element => {
            element.draw();
            element.update();
            if (element.y>canvas.height) {
                redObstacleArray.splice(0,1);
                //console.log(element + 'destroyed');
            }
        });
        blueObstacleArray.forEach(element => {
            element.draw();
            element.update();
            if (element.y>canvas.height) {
                blueObstacleArray.splice(0,1);
                //console.log(element + 'destroyed');
            }
        });
        redObstacleDelay++;
        blueObstacleDelay++;


        requestAnimationFrame(init);
    }
    init();
    
}

Game();

