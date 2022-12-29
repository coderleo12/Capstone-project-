const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world, backgroundImg;
var canvas;
var player, tower, hand, ground;
var playerArrows = [];
var book;

var score = 0;

function preload(){
  backgroundImg = loadImage("./assets/background.png");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200,600);

  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  hand = new Hand(180,110,40,40,angle);
  player = new Player(150,140,150,150);
  
}


function draw() 
{
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
  
  rect(ground.position.x, ground.position.y, width * 2, 1);


  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 300, 400);
  pop();
  
  for (var i = 0; i < playerArrows.length; i++) {
    showArrows(playerArrows[i], i);
  }

  hand.display();
  player.display();

}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new Arrow(hand.x, hand.y);
    playerArrows.trajectory = [];
    Matter.Body.setAngle(playerArrows.body, playerArrows.angle);
    playerArrows.push(cannonBall);
  }
}

function showArrows(playerArrows, index) {
  if (playerArrows) {
    playerArrows.display();
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    playerArrows[playerArrows.length - 1].shoot();
  }
}

