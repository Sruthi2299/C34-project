const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var PLAY = 1;
var END = 0;
var gameState = PLAY
var shooter;
var invisibleGround , invisibleGround1,invisibleGround2 , invisibleGround4;

var bulletsGroup;
var enemiesGroup;

var score;

function setup() {
  createCanvas(500,500);
  engine = Engine.create();
  world = engine.world;
  
  shooter = createSprite(250,499,50,50);

  invisibleGround = createSprite(500,500,1000,20);
  invisibleGround.visible = false;

  invisibleGround1 = createSprite(500,500,20,1000);
  invisibleGround1.visible =false;

  invisibleGround2= createSprite(0,0,20,1000);
  invisibleGround2.visible = false;

  invisibleGround4= createSprite(0,0,1000,20);
  invisibleGround4.visible = false;
  
  bulletsGroup = new Group();
  enemiesGroup = new Group();
  
  score = 0;
 
}


function draw() 
{
  background("black");
  textSize(20);
  push();
  text("Score: " + score,0,20);
  fill("white");
  pop(); 

if(gameState === PLAY){
  if(keyCode == LEFT_ARROW){
     shooter.x =  shooter.x - 3
  }
 
  if(keyCode == RIGHT_ARROW){
    shooter.x = shooter.x + 3
 }
  
  if(bulletsGroup.collide(enemiesGroup)){
    score = score + 5
   
  }

  shooter.collide(invisibleGround) 
  shooter.collide(invisibleGround1) 
  shooter.collide(invisibleGround2 || invisibleGround4);

  if(enemiesGroup.collide(invisibleGround || invisibleGround1 || invisibleGround2 || invisibleGround4)){
   
    gameState = END
  }
  
  SpawnEnemy();
  SpawnBullets();

}
else if (gameState === END){
  
  shooter.visible = false;
  text("GAMEOVER",200,250);
  fill("white");

  bulletsGroup.setVelocityYEach(0);
  enemiesGroup.setVelocityYEach(0);

  bulletsGroup.destroyEach();
  enemiesGroup.destroyEach();
  
}

  Engine.update(engine);
  drawSprites();
}

function SpawnEnemy(){
  if (frameCount % 70 === 0 ) {
    enemy = createSprite(100,0,25,25);
    enemy.x = Math.round(random(40,470));
    enemy.velocityY = 3
    enemy.scale = 1;
    enemy.lifetime = 300
    enemiesGroup.add(enemy);

  }
}

function SpawnBullets(){
  if (frameCount % 10 === 0) {
    bullet = createSprite(250,450,5,15);
    bullet.x = shooter.x
    bullet.velocityY =  -3
    bullet.scale = 1;
    bullet.lifetime = 300
    bulletsGroup.add(bullet);

  }

}