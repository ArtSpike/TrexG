var sword;
var PLAY = 1;
var END=0;
var gameState=1;
var swordImage
var score=0
var fruitGroup
var enemyGroup
var fruit1,fruit2,fruit3,fruit4;
var fruitImage1,fruitImage2,fruitImage3,fruitImage4;
var monster, monsterImage
var gameOverImage
var knifeSwooshSound;
var gameOverSound;


function preload(){
  swordImage=loadImage("sword.png");
  fruitImage1=loadImage("fruit1.png");
  fruitImage2=loadImage("fruit2.png");
  fruitImage3=loadImage("fruit3.png");
  fruitImage4=loadImage("fruit4.png");
  monsterImage=loadAnimation("alien1.png","alien2.png");
  gameOverImage=loadImage("gameover.png");
  knifeSwooshSound=loadSound("knifeSwooshSound.mp3");
  gameOverSound=loadSound("gameover.mp3");
 
}
function setup(){
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7
  
  fruitGroup= new Group();
  enemyGroup= new Group();
}

function draw(){
  background("white")
  if (gameState===1){
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  }
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    knifeSwooshSound.play();
    score=score+1;
  }
  if (sword.isTouching(enemyGroup)){
    gameState=0;
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.velocityX=0;
    enemyGroup.velocityX=0;
    sword.addImage(gameOverImage);
    sword.x=200;
    sword.y=200;
    gameOverSound.play();
  }
  if (gameState==1){
  fruits();
  Enemy(); 
  }
  drawSprites();
}

function fruits(){
  if (World.frameCount%80===0){
    position=Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    
    
    
    r=Math.round(random(1,4));
    if (r==1){
      fruit.addImage(fruitImage1);
    } else if (r==2){
      fruit.addImage(fruitImage2);
    } else if (r==3){
      fruit.addImage(fruitImage3);
    } else{
      fruit.addImage(fruitImage4);
    }
    fruit.scale=0.2;
    fruit.y=Math.round(random(50,340));
    
    if (position==1){
      fruit.x=400;
      fruit.velocityX=-(7+(score/4));
    }
   else{
     if (position==2){
       fruit.x=0;
       fruit.velocityX= (7+(score/4));
     }
   }
    
    fruit.setLifetime=100;
    
    
    fruitGroup.add(fruit);
    
  }
}
function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}
