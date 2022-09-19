var Play=1;
var End=0;
var trex ,trex_running;
var soloImage;
var pontos;
var estadoJogo= Play;

function preload(){
  trex_running=loadAnimation("trex1.png", "trex3.png", "trex4.png");
soloImage=loadImage("ground2.png");
nuvemImage=loadImage("cloud.png");
obstaculo1=loadImage("obstacle1.png");
obstaculo2=loadImage("obstacle2.png");
obstaculo3=loadImage("obstacle3.png");
obstaculo4=loadImage("obstacle4.png");
obstaculo5=loadImage("obstacle5.png");
obstaculo6=loadImage("obstacle6.png");

fimImg=loadImage("gameOver.png");
reinicio=loadImage("restart.png")

somPulo=loadSound("jump.mp3");
somMorte=loadSound("jdie.mp3");
somPoint=loadSound("jcheckPoint.mp3");

}

function setup(){
  createCanvas(600,200)
  

 trex=createSprite(50,160,20,50);
trex.addAnimation("running", trex_running);
trex.scale=0.5;
trex.x=50;

 solo=createSprite(200,180,400,20);
 solo.addImage("solo", soloImage);
 solo.x=solo.width/2;

 solo_invisivel=createSprite(200,190,400,10);
 solo_invisivel.visible=false;

 var rand=Math.round(random(1,100));
 pontos=0;
}

function draw(){
  background("white")
  text("Pontuação:"+pontos,500,50);
  pontos=pontos+ frameCount/60;
  
  solo.velocityX=-2;
  drawSprites();

  if(solo.x<0){
    solo.x=solo.width/2;
  }

  if (keyDown("space") && trex.y>=100){
    trex.velocityY=-10;
  }
  trex.velocityY=trex.velocityY+0.5;
  trex.collide(solo_invisivel);

  if(estadoJogo==Play){
    solo.velocityX=-2;
    pontos=pontos+ Math.round(frameCount/60);
    
    if(pontos>0 && pontos % 100==0){
      somPoint.play();
    }

    if(solo.x<0){
      solo.x=solo.width/2;
    }

    if(keyDown("space") && trex.y>150){
      trex.velocityY=-15;
      somPulo.play();
    }
    trex.velocityY=trex.velocityY+1;
    gerarNuvens();
    gerarObstaculos();
    
    if(obstaculos.isTouching(trex)){
      estadoJogo=End;
      somMorte.play();
    }
  }
  else if(estadoJogo==End){
    solo.velocityX=0;
    nuvem.setVelocityXEach(0);
    obstaculos.setVelocityXEach(0);
  }
}

function gerarNuvens(){
  if(frameCount % 60 ==0){
    nuvem=createSprite(600,100,40,10);
    nuvem.velocityX=-3;
    nuvem.addImage(nuvemImage);
    nuvem.y=Math.round(random(10,60));
    nuvem.scale=0.4;
  
    nuvem.depth=trex.depth;
    trex.depth=trex.depth+1;

    nuvem.lifetime=220;
  }
}


function gerarObstaculos(){
  if(frameCount % 60==0){
    var obstaculos= createSprite(600,165,10,40);
    obstaculos.velocityX= -(6 + pontos/100);

    var rand=Math.round(random(1,6));
    switch(rand){
      case 1:obstaculos.addImage(obstaculo1);
              break ;
      case 2:obstaculos.addImage(obstaculo2);
              break ;
      case 3:obstaculos.addImage(obstaculo3);
              break ;
      case 4:obstaculos.addImage(obstaculo4);
              break ;
      case 5:obstaculos.addImage(obstaculo5);
              break ;
      case 6:obstaculos.addImage(obstaculo6);
              break ;

    }

    obstaculos.scale=0.5;
    obstaculos.lifetime=300;
  }
}