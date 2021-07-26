const Beholder = window['beholder-detection'];

let playerMarkerNum = 1;
let gunMarkerNum = 2;

//create game elements
var wall = new Wall(new Vec2(60, 70), new Vec2(90, 70), new Vec2(60, 220), new Vec2(90, 220));
var wall2 = new Wall(new Vec2(660, 70), new Vec2(690, 70), new Vec2(660, 220), new Vec2(690, 220));
const ball = new Ball(350, 175);


//event listeners
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false);

//init
let hasStarted = false;
function init() {

  Beholder.init('#beholder-root', { overlay_params: { present: true }, feed_params: { brightness: 0 }, camera_params: { rearCamera: true, torch: true, videoSize: 0 } });

  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");

  wall2.rotate(Math.PI);

  requestAnimationFrame(update);
}


function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      //player.position.x = relativeX;
      //player2.position.x = relativeX + 500;
      //wall.point1.x = relativeX;

    }
    var relativeY = e.clientY - canvas.offsetTop;
    if (relativeY > 0 && relativeY < canvas.height) {
      //player.position.y = relativeY;
      //player2.position.y = relativeY;
      //wall.point1.y = relativeY; 
    }
}

function keyDownHandler(e) {
  if (e.key == "l") {
    player.rotate(0.2);
  }
  if (e.key == "j") {
    player.rotate(-0.2);
  }

  if (e.key == "k") {
    SpawnEnemy();
    //changeMode = !changeMode;
  }

  if (e.key == "q") {
    wall.rotate(-.3);
  }
  if (e.key == "e") {
    wall.rotate(.3);
  }
  if (e.key == "p") {
    wall2.rotate(.3);
  }
  if (e.key == "i") {
    wall2.rotate(-.3);
  }

  if (e.key == "w") {
    wall.translate(new Vec2(0, 10));
  }
  if (e.key == "a") {
    wall.translate(new Vec2(-10, 0));
  }
  if (e.key == "s") {
    wall.translate(new Vec2(0, -10));
  }
  if (e.key == "d") {
    wall.translate(new Vec2(10, 0));
  }
}

// function LimitDistance(alphaX, aplhaY, betaX, betaY)
// {
//   var maxDistance = 50;
//   if()
// }

function SpawnEnemy() {
  enemies.push(
    new Enemy(
      150,
      150,
      20, //radius
      1, //speed
      0,
      0
      //Math.floor(Math.random() * waypoints.length)
    )
  );
}

function drawLine() {
  ctx.beginPath();
  ctx.moveTo(canvas.width/2, 0);    // Move the pen to (30, 50)
  ctx.lineTo(canvas.width/2, canvas.height);  // Draw a line to (150, 100)
  ctx.strokeStyle = "#add8e6";
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.closePath();
}

let prevTime = Date.now();

function update() {

  //checks if both markers are active
// if(!Beholder.getMarker(playerMarkerNum).present ||
//   !Beholder.getMarker(gunMarkerNum).present) {
//    console.log("Player or gun not present") 
//     return;
//   }

  //time stuff
  let currentTime = Date.now();
  let dt = currentTime - prevTime;
  prevTime = currentTime;

  //beholder marker variables
  Beholder.update();

  //update for game elements
  ball.update(dt);
  wall.update(dt);
  wall2.update(dt);

  // WE DRAW LAST DYLION
  draw();

  requestAnimationFrame(update);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  drawLine();
  wall.draw(ctx);
  wall2.draw(ctx);
  ball.draw(ctx);
}

window.onload = init;
