var bg, bgImg;
var bottomGround, invisibleGround;
var topGround;
var balloon, balloonImg;
var obstacleTop, obsTop1, obsTop2;
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3;
var die, jump;
var gOImg, restartImg, gO, restart;
var score = 0;
var obsBottomGrp, obsTopGrp;
var gameState = PLAY;
var PLAY = 1;
var END =0;
var edges;

function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

obsTop1 = loadImage("assets/obsTop1.png")
obsTop2 = loadImage("assets/obsTop2.png")

obsBottom1 = loadImage("assets/obsBottom1.png")
obsBottom2 = loadImage("assets/obsBottom2.png")
obsBottom3 = loadImage("assets/obsBottom3.png")

gOImg = loadImage("assets/gameOver.png");
restartImg = loadImage("assets/restart.png");

die = loadSound("assets/die.mp3");
jump = loadSound("assets/jump.mp3");
}

function setup(){

  createCanvas(800,500)
//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3
console.log();

//creating top, bottom and invisible grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
invisibleGround = createSprite(200, 440, 800, 20);
invisibleGround.visible = false;

//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

 gO = createSprite(400, 250);
gO.addImage(gOImg)

restart = createSprite(375, 300);
restart.addImage(restartImg)

obsBottomGrp = new Group();
obsTopGrp = new Group();
}

function draw() {  
  background("black");
        
 edges = createEdgeSprites();
if (balloon.collide(edges[2]) || balloon.collide(edges[3])) {
  balloon.velocityY = balloon.velocityY*-1; 
}
//console.log("gameState = PLAY");
gO.visible = false;
restart.visible = false;
 
 
     //making the hot air balloon jump
     if(keyDown("space")) {
      balloon.velocityY = -4 ;
     }
      //adding gravity
     balloon.velocityY = balloon.velocityY + 0;
   
     spawnObstaclesTop();
  //   console.log("gameState = insidePLAY");
     spawnObstaclesBottom();
     if (obsTopGrp.isTouching(balloon) || obsBottomGrp.isTouching(balloon)) {
      gameState = END;
      console.log(gameState);
     }else { 
       //displaying score
   text("Score : "+ score, 200, 150);
   score = score+10
  };
//let the balloon move according to the instructions below
  if (keyDown("UP_ARROW")) {
    balloon.velocityY-=1;
  }
  
if (keyDown("DOWN_ARROW")) {
  balloon.velocityY+=1;
}

//console.log(balloon.velocityY);
 if (gameState === END) {         
    console.log("insideEndState");
    //making the velocity 0 for the obstacles to make them stop in end state.
    obsBottomGrp.velocityX = 0;
    obsTopGrp.velocityX =0;    
    //making images visible
    restart.visible = true;
    gO.visible = true;
    //set the lifetime for each object so that they are never destroyed
    obsBottomGrp.setLifetimeEach(-1);
    obsTopGrp.setLifetimeEach(-1); 
    //adding depth to the images to let them make visible
    restart.depth+=1;
    gOImg.depth+=1;
    //if condition to make the restart image work 
    if (mousePressedOver(restart)) {
      reset();
    }
  }      
          Bar();
   
          //stopping balloon from falling on invisible ground
          balloon.collide(invisibleGround)
   drawSprites();     
}


function spawnObstaclesTop() 
{
      if(World.frameCount % 60 === 0) {
        obstacleTop = createSprite(400,50,40,50);
        
    obstacleTop.scale = 0.1;
    obstacleTop.velocityX = -4;

    //random y positions for top obstacles
    obstacleTop.y = Math.round(random(10,100));

    //generate random top obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacleTop.addImage(obsTop1);
              break;
      case 2: obstacleTop.addImage(obsTop2);
              break;
      default: break;
    }

     //assign lifetime to the variable
   obstacleTop.lifetime = 750;
    
   balloon.depth = balloon.depth + 1;
   
   obsTopGrp.add(obstacleTop);
      }
}

function spawnObstaclesBottom() {
  if (World.frameCount%70 === 0) {
    obstacleBottom = createSprite(390, 270, 50, 60);
  obstacleBottom.scale = 0.1;
  obstacleBottom.velocityX = -5;

  var rand1 = Math.round(random(1,3));
  switch(rand1) {
    case 1: obstacleBottom.addImage(obsBottom1);
           break;
    case 2: obstacleBottom.addImage(obsBottom2);
           break;
    case 3: obstacleBottom.addImage(obsBottom3);
    default: break;              
  }

  obstacleBottom.lifetime = 750;
obsBottomGrp.add(obstacleBottom);
  }
}

 function Bar() 
 {
         if(World.frameCount % 60 === 0)
         {
           var bar = createSprite(400,200,10,800);
          bar.velocityX = -6
          bar.depth = balloon.depth;
          bar.lifetime = 70;
          bar.visible = false;
         }
}

function reset() {
  gameState = PLAY;
  score = 0;
  gO.visible = false;
  restart.visible = false;
  obsBottomGrp.destroyEach();
  obsTopGrp.destroyEach();
  
}
  
