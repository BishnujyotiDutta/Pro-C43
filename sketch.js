var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var gameOver; 
var score=0,gameOverImg,ding1;
var attempts=3,dingS,Sound,survivalTime,points=0,points;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png"); 
  gameOverImg = loadImage("gameOver.png");
  dingS = loadSound("ding.mp3");
  ding1 = loadSound("MarioDiedSound.wav")

}

function setup() {
  createCanvas(800,400);

  
  survivalTime = 0;
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(400,230,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  gameOver.visible=false;


  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  points =0;
}

function draw() { 
  background(0);
  drawSprites();
  
  //for displaying score
 
  
  
  
  
  
  if(gameState===PLAY){
    fill("white");
    stroke("black");
    textSize(30);
    if(frameCount%30===0){
       score=score+1;
    }
    text("Survival Time: "+score,300,25);
    
  stroke("black");
  textSize(30);
  fill("white");
  text("Points: "+ points, 550,25);



  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      player.scale += 0.05
      points = points + 2;
      dingS.play();
    }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnFood();
    spawnObstacles();  
 
    if(obstaclesGroup.isTouching(player)){ 
        gameState = END;
        gameOver.visible=true;
        ding1.play();
    }
  }else if(gameState === END){

    backgr.velocityX = 0;
    player.visible = false;
    
    FoodGroup.destroyEach();
    obstaclesGroup.destroyEach();

    /*textSize(30);
    fill(255);
    text("Game Over!", 300,220);*/
  }
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX= -4; 
    
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  //write code here to spawn the obstacles
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX=-(4 + 2*score/100); 
    obstacle.addImage(obstacle_img);
    
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}