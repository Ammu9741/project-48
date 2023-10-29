var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg
var zombieGroup
var bullets = 6
var gameState ="fight"
var life = 3
var score = 0

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
zombieImg = loadImage("assets/zombie.png")
heart1Img = loadImage("assets/heart_1.png")
heart2Img = loadImage("assets/heart_2.png")
heart3Img = loadImage("assets/heart_3.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  
zombieGroup = new Group()

bulletGroup = new Group()


//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

heart1 = createSprite(displayWidth-150,40,20,20)
heart1.addImage("heart1",heart1Img)
heart1.scale = 0.5
heart1.visible = false

heart2 = createSprite(displayWidth-150,40,20,20)
heart2.addImage("heart2",heart2Img)
heart2.scale = 0.5
heart2.visible = false

heart3 = createSprite(displayWidth-150,40,20,20)
heart3.addImage("heart3",heart3Img)
heart3.scale = 0.5

}



function draw() {
  background(0); 



if (gameState == "fight"){
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}

if(life == 3){
  heart3.visible = true
  heart2.visible = false
  heart1.visible = false
}
else if(life == 2){
  heart2.visible = true
  heart3.visible = false
  heart1.visible = false
}
else if(life ==1){
  heart1.visible = true
  heart2.visible = false
  heart3.visible = false
}
else if(life == 0){
  heart3.visible = false
  heart2.visible = false
  heart1.visible = false
  gameState = "lost"
}

if(score == 5){
  gameState = "won"}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 
  bullet = createSprite(player.x+50,player.y-30,20,10)
  bullet.velocityX = 15
  player.depth = bullet.depth
  player.depth = player.depth+1
  bulletGroup.add(bullet)
  bullets = bullets-1
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
enemy()

if( bullets == 0){
gameState = "bullet"

}

if(zombieGroup.isTouching(player)){
  for(i = 0; i <zombieGroup.length; i = i+1){
if( zombieGroup[i].isTouching(player)){
  zombieGroup[i].destroy()
  life = life-1
}
  }
 }

 if(zombieGroup.isTouching(bulletGroup)){
  for(i = 0; i <zombieGroup.length; i = i+1){
    if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy()
      bulletGroup.destroyEach()
      score = score+1
    } 
  }
 }
}
drawSprites();
if (gameState =="lost"){
  fill("red")
  textSize(50)
  text("YOU LOST!",400,400)  
  zombieGroup.destroyEach()
  player.destroy()
  }

else if(gameState =="won"){
  fill("green")
  textSize(50)
   text("YOU WON!",400,400) 
  zombieGroup.destroyEach()
  player.destroy()
   
}

else if (gameState =="bullet"){
  fill("yellow")
  textSize(50)
   text("you ran out of bullets",400,400) 
  zombieGroup.destroyEach()
  player.destroy()
  
}



}

function enemy(){

  if(frameCount%100===0)
  {
    x = random(500,1200)
    y = random(100,500)
    zombie = createSprite(x,y,50,50)
    zombie.velocityX = -3
    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombieGroup.add(zombie)
    zombie.lifetime = 400


  }
}






