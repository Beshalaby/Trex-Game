{

var trex,trexRunning,trexCollided, ground, invisibleGround, groundImage;

var gameOver, gameOverImg, restart, restartImg;
  
var ob1,ob2, ob3, ob4, ob5, ob6;
  
var cloudImg;
  
var jump, die, checkPoint;

var PLAY=1;
var END=2;

var gameState=PLAY;

var count=0;

var obstacleGroup, cloudsGroup;

var speed=6.5;

var time=1;

}
  
  setInterval(function () {
    count = count + time;
  }, 100);
  

function preload () {
 trexRunning= loadAnimation("trex1.png","trex3.png","trex4.png");
 groundImage=loadImage("ground2.png");

  gameOverImg= loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
  
  cloudImg=loadImage("cloud.png");
  
  ob1=loadImage("obstacle1.png");
  ob2=loadImage("obstacle2.png");
  ob3=loadImage("obstacle3.png");
  ob4=loadImage("obstacle4.png");
  ob5=loadImage("obstacle5.png");
  ob6=loadImage("obstacle6.png");
  
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  checkPoint=loadSound("checkPoint.mp3");
  
  trexCollided=loadImage("trex_collided.png");
}



function setup() {
  createCanvas(600, 200);
  
  trex=createSprite(50,180,20,25);
  trex.addAnimation("running",trexRunning);
  trex.addImage("collided", trexCollided);
  trex.scale=0.5;
  ground=createSprite(200,180,400,20);
  ground.addImage(groundImage);
  ground.x=ground.width/2;
  ground.velocityX=-2;
  
  invisibleGround=createSprite(200,190,400,15);
  invisibleGround.visible=false;
  
  gameOver=createSprite(300,100,20,20);
  gameOver.addImage(gameOverImg);
  
  restart=createSprite(300,150);
  restart.addImage(restartImg);
  restart.scale=0.5;
  
  obstacleGroup=createGroup();
  cloudsGroup=createGroup();
  
  
  
}

function draw() {
  background (255);
if(gameState===PLAY) {
    ground.velocityX = -(Math.round(count/100)+speed);
    if (ground.x < 0){
    ground.x = ground.width/2;
    }
  
  //jump when the space key is pressed
  if((keyDown("space")||keyDown("up"))&& trex.y >= 158){
    trex.velocityY = -13 ;
    jump.play();
  }
  
       
  
  //add gravity
  trex.velocityY = trex.velocityY + 0.8;

    
  gameOver.visible=false;
  restart.visible=false;
  
  time=1;
  
  textSize(18);
  text(count,560,30);
  
  if (count%100===0&&count>0) {
    checkPoint.play();     
    }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if(obstacleGroup.isTouching(trex)) {
    gameState=END;
    time=0;
    die.play();
    }
  
  
  spawnClouds();
  spawnObstacles();
  
} else if(gameState===END) {
     ground.velocityX=0;
     trex.velocityX=0;
     cloudsGroup.setVelocityEach(0,0);
     obstacleGroup.setVelocityEach(0,0);
     cloudsGroup.setLifetimeEach(-1);
     obstacleGroup.setLifetimeEach(-1);
     trex.setVelocity(0,0);
     gameOver.visible=true;
     restart.visible=true;
    trex.changeAnimation("collided");
     
     if(mousePressedOver(restart)) {
       reset();
       count=0;
     }
    }
  
  trex.collide(invisibleGround);
  drawSprites();
}


function spawnClouds() {
  //write code here to spawn the clouds
  if(frameCount%90===0) {
    var cloud = createSprite(600,100,70,50);
    cloud.velocityX=-2;
    cloud.y= Math.round(random(50,150));
    cloud.addImage(cloudImg);
    cloud.scale=random(0.3,1);
    cloud.lifetime=300;
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  //write code here to spawn the clouds
  if(frameCount%80===0) {
    xpos = random(1,100);
    var cactus = createSprite(600+xpos,162,10,50);
    cactus.velocityX= -(Math.round(count/100)+speed);
    var x= Math.round(random(1,6));
    switch (x) {
      case 1: cactus.addImage(ob1); 
        break;
      case 2: cactus.addImage(ob2);
        break;
      case 3: cactus.addImage(ob3); 
        break;
      case 4: cactus.addImage(ob4);
        break;
      case 5: cactus.addImage(ob5);
        break;
      case 6: cactus.addImage(ob6); 
        break;
        
        default: break;
    }
    cactus.scale=0.5;
    cactus.lifetime=300;
    obstacleGroup.add(cactus);
  }
}

function reset () {
  obstacleGroup.destroyEach();
  cloudsGroup.destroyEach();
  gameState=PLAY;
  trex.changeAnimation("running");
  }
