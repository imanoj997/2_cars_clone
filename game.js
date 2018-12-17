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
    var redObstaclesList = new RedObstaclesList();
    var blueObstaclesList = new BlueObstaclesList();

    var initialRedObstacle = new RedObstacles();
    redObstaclesList.add(initialRedObstacle);

    var initialBlueObstacle = new BlueObstacles();
    blueObstaclesList.add(initialBlueObstacle);

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
            redObstaclesList.add(redObstacle);
            //console.log(redObstacle + 'created');
        }
        if(blueObstacleDelay%blueRandomDelay === 0){
            blueObstacleDelay = 1;
            blueRandomDelay =  getRandomInt(41,81);
            var blueObstacle = new BlueObstacles();
            blueObstaclesList.add(blueObstacle);
        }
        
        redObstaclesList.redObstacleArray.forEach(element => {
            element.draw();
            element.update();
            if (element.y>canvas.height) {
                redObstaclesList.remove(redObstacle);
                //console.log(element + 'destroyed');
            }
        });
        blueObstaclesList.blueObstacleArray.forEach(element => {
            element.draw();
            element.update();
            if (element.y>canvas.height) {
                blueObstaclesList.remove(redObstacle);
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

