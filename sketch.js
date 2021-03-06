var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudimg;
var score;
var SERVE = 2;
var PLAY = 1;
var END = 0;
var gameState = SERVE;

var obstaclesGroup,cloudsGroup;
var rand
var score;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;

var gameover,gameoverImg,restart,restartImg

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudimg = loadImage("cloud.png")
 
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png"); 
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  gameoverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.png");


}

function setup() {

  createCanvas(windowWidth,windowHeight)
  
  //create a trex sprite
  trex = createSprite(50,height-100,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  //trex.debug = true;
  trex.setCollider("circle",0,0,50);
  //create a ground sprite
  ground = createSprite(200,height-80,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(200,height-70,400,10);
  invisibleGround.visible = false;
  
  score = 0

  obstaclesGroup = new Group()
  cloudsGroup = new Group()

  gameover = createSprite(300,100)
  gameover.addImage(gameoverImg);
  gameover.scale = 2
  gameover.visible = false;

  restart = createSprite(300,140);
  restart.addImage(restartImg);
  restart.scale = 0.5
  restart.visible = false;
}

function draw() {
  //set background color
  background(180);
  text(" Score "+ score , 500,50)
  if(gameState===SERVE){
    trex.velocityY = 0;
    ground.velocityX = 0;

    if(keyDown("space")){
      gameState = PLAY;
    }
  }
  if(gameState===PLAY){
    score = score+Math.round(frameCount/60);

    if(touches.length>0||keyDown("space")&& trex.y >= height - 120) {
      trex.velocityY = -10;  
      touches = [];       
    }

    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    spawnClouds();
    spawnObstacles();

  if(obstaclesGroup.isTouching(trex)){
    gameState = END;
  }
  }else if(gameState===END){
   ground.velocityX = 0;

   obstaclesGroup.setVelocityXEach(0);
   cloudsGroup.setVelocityXEach(0);

   trex.changeAnimation("collided",trex_collided);

   obstaclesGroup.setLifetimeEach(-1)
   cloudsGroup.setLifetimeEach(-1);
    
   gameover.visible = true;
   restart.visible = true;
  }
  
  
  
  // jump when the space key is pressed
  
  
  trex.velocityY = trex.velocityY + 0.8
  
 
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  //Spawn Clouds
 
  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
 // write your code here 
 if(frameCount % 60===0){
 cloud = createSprite(600,100,40,10);
 cloud.velocityX = -3;
 cloud.scale = 0.5;
 cloud.y = Math.round(random(10,height/2));
 cloud.addImage(cloudimg);
 console.log(cloud.depth)
 cloud.depth = trex.depth;
 trex.depth  = trex.depth +1

 cloud.lifetime = 200
 cloudsGroup.add(cloud)
 }
}
function spawnObstacles(){
if(frameCount % 60===0){
  var obstacle = createSprite(600,height-100,10,40);
  obstacle.velocityX = -6;

  rand = Math.round(random(1,6))
  switch(rand){
    case 1: obstacle.addImage(obstacle1)
    break;
    case 2: obstacle.addImage(obstacle2)
    break;
    case 3: obstacle.addImage(obstacle3)
    break;
    case 4: obstacle.addImage(obstacle4)
    break;
    case 5: obstacle.addImage(obstacle5)
    break;
    case 6: obstacle.addImage(obstacle6)
    break;
    default:break
  }
  obstacle.scale = 0.5
  obstacle.lifetime = 100
  obstaclesGroup.add(obstacle);

}

}


