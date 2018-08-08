var s;
var scl = 20;
var hauteurPortail = 2;
var e1 = 100; 
var e2 = 100; 
var chanceDeAvoir = 80; //pomme

var xoff = 100

var slider;

//image
var francis;
var katerie;
var sophie;
var florence_gauche;
var florence_droite;

//sons
var divenire;
var rainbow;

//Smile
var rad = 30;
var xpos, ypos;
var xspeed = 2.8;
var yspeed = 2.2;
var xdirection = 1;
var ydirection = 1;


function preload(){
  //image
  katerie = loadImage('images/katerie.jpg');
  francis = loadImage('images/francis.jpg');
  sophie = loadImage('images/sophie.png');
  florence_gauche = loadImage('images/florence_gauche.jpg');
  florence_droite = loadImage('images/florence_droite.jpg');
}


function setup() {
  frameRate(10);
  angleMode(DEGREES);
  ellipseMode(RADIUS);
  xpos = width/2;
  ypos = height/2;
 
  
  createCanvas(400, 400);
  //3=katerie, 4=francis, 5=sophie, 6=florence
  s = new Snake(1,0,1,100, 6); //(R, G, B, transparence, choix)
  w = new Snake(0,1,1,100,5);
  n1 = new Nourriture();
  n2 = new Nourriture();
  
  pickLocation1();
  pickLocation2();
  hauteurPortail = floor(random(1, height/scl));
  
  //createSlider(10,100,50);
  //createButton('go');
  
  
  //sons
  divenire = loadSound('sons/divenire.mp3', loaded);
  rainbow = loadSound('sons/rainbow.mp3');
}

function loaded(){
  divenire.loop();
}

function pickLocation1() {
  if ( s.total == 12 || w.total == 12 ){
    if (!rainbow.isPlaying()){
       divenire.stop();
       console.log('test');
       rainbow.play();
    } 
    
  }
  if(s.total > 0 || w.total > 0){
    if (!rainbow.isPlaying() && !divenire.isPlaying()){
       divenire.loop();  
    }
  }

   
  
  for (var i = 0; i < 2; i++){
      n1.create();
      //pour changer le portail à chaque pickLocation
     // hauteurPortail = floor(random(1, height/scl));
   }
  
}

function pickLocation2() {
  for (var i = 0; i < 2; i++){
      n2.create();
      //pour changer le portail à chaque pickLocation
     // hauteurPortail = floor(random(1, height/scl));
   }
}

function mousePressed() {
  //s.total++;
  //w.total++;
  //scl = floor(random(10, 20));
  //pickLocation1();
  //pickLocation2();
  console.log(s.total)
  //console.log(n1.food.z);
  //console.log(n1.r);
  //console.log(n2.r);
}



function draw() {
  background(51);
  //if ( rainbow.isLoaded() ){
  //  console.log ('y')
  //}
  
 
  
 //écriture de la longeur
    
    var s_ = 10 + s.total/3;
    var w_ = 10 + w.total/3;
    var positionText_s = scl;
    var positionText_w = scl;
    
     push();
     textSize(s_);
     fill(s.r * 255, s.g * 255, s.b * 255);
     if (s_ > 10 + 49.9/3){
       textSize(25);
       fill(noise(xoff) * 255, noise(xoff + 1000) * 255, noise(xoff + 2000) * 255);
       xoff = xoff + 0.5
       translate(random(-2,2), random(-2,2));
     }
     text(s.total, positionText_s, 2 * positionText_s);
     pop();
     
     push();
     textSize(w_);
     fill(w.r * 255, w.g * 255, w.b * 255);
     if (w_ > 10 + 49.9/3){
       textSize(25);
       fill(noise(xoff) * 255, noise(xoff + 1000) * 255, noise(xoff + 2000) * 255);
       xoff = xoff + 0.5
       translate(random(-2,2), random(-2,2));
     }
     text(w.total, positionText_s, 3 * positionText_s);
     pop();
   

 //Quadrillé
    for (i = 1; i < height/scl; i ++){
        stroke(200, 200, 200, 50);
        strokeWeight(0.5);
        line(0, i * scl, width, i * scl);
    }
     for (i = 1; i < width/scl; i ++){
        stroke(200, 200, 200, 50);
        line(i * scl, 0, i * scl, height);
    }

 //smile movement
    xpos = xpos + xspeed * xdirection;
    ypos = ypos + yspeed * ydirection;
    
    if (xpos > width - rad || xpos < rad) {
      xdirection *= -1;
    }
    if (ypos > height - rad || ypos < rad) {
      ydirection *= -1;
    }
  
  //smile draw
  push();
  
  if ( s.tail.length > w.tail.length){
    strokeWeight(3);
    stroke(s.r * 255,s.g * 255,s.b * 255,75);
    fill(s.r * 255,s.g * 255,s.b * 255,50);
  } else if ( s.tail.length < w.tail.length){
    strokeWeight(3); 
    stroke(w.r * 255,w.g * 255,w.b * 255, 75);
    fill(w.r * 255,w.g * 255,w.b * 255, 50);
  } else {
    strokeWeight(3); 
    stroke(255,255,0,50);
    fill(255,255,0,50);
  }
  
    
    ellipse(xpos, ypos, rad, rad);
    fill(0,0,0,100);
    noStroke();
    ellipse(xpos + rad/3, ypos - rad/3, rad/10, rad/10);
    ellipse(xpos - rad/3, ypos - rad/3, rad/10, rad/10);
    noFill();
    stroke(0,0,0,100);
    strokeWeight(3);
    curve(xpos - rad, ypos - rad, xpos - rad/2, ypos + rad/3, xpos + rad/2, ypos + rad/3, xpos + rad, ypos - rad);
    strokeWeight(1);
   pop();
    
  //portail draw
    push();
    noStroke();
    fill(0, 0, 200, 100);
    //droite
    rect(width - scl, (hauteurPortail - 1) * scl, scl, scl/2 - 1);
    rect(width - 2 * scl, (hauteurPortail - 1) * scl + scl/2 + 1, scl, scl/2 - 1);
    triangle(width - 2 * scl, (hauteurPortail - 1) * scl + scl/2 - 1, width - scl, (hauteurPortail - 1) * scl + scl/2 - 1, width - scl, (hauteurPortail - 1) * scl - scl/2);
    triangle(width - scl, (hauteurPortail - 1) * scl + scl/2 + 1, width, (hauteurPortail - 1) * scl + scl/2 + 1, width - scl, (hauteurPortail - 1) * scl + scl + scl/2);
    //gauche
    rect(0, height - hauteurPortail * scl, scl, scl/2 - 1);
    rect(scl, height - hauteurPortail * scl + scl/2 + 1, scl, scl/2 - 1);
    triangle(scl, height - hauteurPortail * scl - scl/2, scl,  height - hauteurPortail * scl + scl/2 - 1, 2 * scl, height - hauteurPortail * scl + scl/2 - 1);
    triangle(0, height - hauteurPortail * scl + scl/2 + 1, scl, height - hauteurPortail * scl + scl/2 + 1, scl, height - hauteurPortail * scl + scl + scl/2);
    pop();
  
  if (s.eat(n1.food)) {
    //explosion1.food
      noStroke();
      fill(255, random(0, 150), 0);
      triangle(n1.food.x, n1.food.y, n1.food.x + scl, n1.food.y + scl, n1.food.x + 2 * scl, n1.food.y - scl);//haut droite
      triangle(n1.food.x + scl, n1.food.y, n1.food.x, n1.food.y + scl, n1.food.x - scl, n1.food.y - scl);//haut gauche
      triangle(n1.food.x + scl, n1.food.y, n1.food.x, n1.food.y + scl, n1.food.x + 2 * scl, n1.food.y + 2 * scl);//bas droite
      triangle(n1.food.x, n1.food.y, n1.food.x + scl, n1.food.y + scl, n1.food.x - scl, n1.food.y + 2 * scl);//bas gauche
      
      fill(200, 200, 200);
      ellipse (n1.food.x +scl, n1.food.y, scl/2, scl/2);//haut droite
      ellipse (n1.food.x, n1.food.y, scl/2, scl/2);//haut gauche
      ellipse (n1.food.x +scl, n1.food.y + scl, scl/2, scl/2);//bas droite
      ellipse (n1.food.x, n1.food.y + scl, scl/2, scl/2);//bas gauche
      
      ellipse (n1.food.x +scl, n1.food.y + scl/2, scl/2, scl/2);//centre droite
      ellipse (n1.food.x + scl/2, n1.food.y, scl/2, scl/2);//centre haut
      ellipse (n1.food.x +scl/2, n1.food.y + scl, scl/2, scl/2);//centre bas
      ellipse (n1.food.x, n1.food.y + scl/2, scl/2, scl/2);//centre gauche
      pickLocation1();
  }
  
  if (s.eat(n2.food)) {
    //explosion2.food
      noStroke();
      fill(255, random(0, 150), 0);
      triangle(n2.food.x, n2.food.y, n2.food.x + scl, n2.food.y + scl, n2.food.x + 2 * scl, n2.food.y - scl);//haut droite
      triangle(n2.food.x + scl, n2.food.y, n2.food.x, n2.food.y + scl, n2.food.x - scl, n2.food.y - scl);//haut gauche
      triangle(n2.food.x + scl, n2.food.y, n2.food.x, n2.food.y + scl, n2.food.x + 2 * scl, n2.food.y + 2 * scl);//bas droite
      triangle(n2.food.x, n2.food.y, n2.food.x + scl, n2.food.y + scl, n2.food.x - scl, n2.food.y + 2 * scl);//bas gauche
      
      fill(200, 200, 200);
      ellipse (n2.food.x +scl, n2.food.y, scl/2, scl/2);//haut droite
      ellipse (n2.food.x, n2.food.y, scl/2, scl/2);//haut gauche
      ellipse (n2.food.x +scl, n2.food.y + scl, scl/2, scl/2);//bas droite
      ellipse (n2.food.x, n2.food.y + scl, scl/2, scl/2);//bas gauche
      
      ellipse (n2.food.x +scl, n2.food.y + scl/2, scl/2, scl/2);//centre droite
      ellipse (n2.food.x + scl/2, n2.food.y, scl/2, scl/2);//centre haut
      ellipse (n2.food.x +scl/2, n2.food.y + scl, scl/2, scl/2);//centre bas
      ellipse (n2.food.x, n2.food.y + scl/2, scl/2, scl/2);//centre gauche
      pickLocation2();
  }
  
  s.death(1);
  s.update(n1.food);
  s.show();
  
  if (w.eat(n1.food)) {
    //explosion1.food
      noStroke();
      fill(255, random(0, 150), 0);
      triangle(n1.food.x, n1.food.y, n1.food.x + scl, n1.food.y + scl, n1.food.x + 2 * scl, n1.food.y - scl);//haut droite
      triangle(n1.food.x + scl, n1.food.y, n1.food.x, n1.food.y + scl, n1.food.x - scl, n1.food.y - scl);//haut gauche
      triangle(n1.food.x + scl, n1.food.y, n1.food.x, n1.food.y + scl, n1.food.x + 2 * scl, n1.food.y + 2 * scl);//bas droite
      triangle(n1.food.x, n1.food.y, n1.food.x + scl, n1.food.y + scl, n1.food.x - scl, n1.food.y + 2 * scl);//bas gauche
      
      fill(200, 200, 200);
      ellipse (n1.food.x +scl, n1.food.y, scl/2, scl/2);//haut droite
      ellipse (n1.food.x, n1.food.y, scl/2, scl/2);//haut gauche
      ellipse (n1.food.x +scl, n1.food.y + scl, scl/2, scl/2);//bas droite
      ellipse (n1.food.x, n1.food.y + scl, scl/2, scl/2);//bas gauche
      
      ellipse (n1.food.x +scl, n1.food.y + scl/2, scl/2, scl/2);//centre droite
      ellipse (n1.food.x + scl/2, n1.food.y, scl/2, scl/2);//centre haut
      ellipse (n1.food.x +scl/2, n1.food.y + scl, scl/2, scl/2);//centre bas
      ellipse (n1.food.x, n1.food.y + scl/2, scl/2, scl/2);//centre gauche
      pickLocation1();
  }
  
  if (w.eat(n2.food)) {
    //explosion2.food
      noStroke();
      fill(255, random(0, 150), 0);
      triangle(n2.food.x, n2.food.y, n2.food.x + scl, n2.food.y + scl, n2.food.x + 2 * scl, n2.food.y - scl);//haut droite
      triangle(n2.food.x + scl, n2.food.y, n2.food.x, n2.food.y + scl, n2.food.x - scl, n2.food.y - scl);//haut gauche
      triangle(n2.food.x + scl, n2.food.y, n2.food.x, n2.food.y + scl, n2.food.x + 2 * scl, n2.food.y + 2 * scl);//bas droite
      triangle(n2.food.x, n2.food.y, n2.food.x + scl, n2.food.y + scl, n2.food.x - scl, n2.food.y + 2 * scl);//bas gauche
      
      fill(200, 200, 200);
      ellipse (n2.food.x +scl, n2.food.y, scl/2, scl/2);//haut droite
      ellipse (n2.food.x, n2.food.y, scl/2, scl/2);//haut gauche
      ellipse (n2.food.x +scl, n2.food.y + scl, scl/2, scl/2);//bas droite
      ellipse (n2.food.x, n2.food.y + scl, scl/2, scl/2);//bas gauche
      
      ellipse (n2.food.x +scl, n2.food.y + scl/2, scl/2, scl/2);//centre droite
      ellipse (n2.food.x + scl/2, n2.food.y, scl/2, scl/2);//centre haut
      ellipse (n2.food.x +scl/2, n2.food.y + scl, scl/2, scl/2);//centre bas
      ellipse (n2.food.x, n2.food.y + scl/2, scl/2, scl/2);//centre gauche
      pickLocation2 ();
  }
  
  w.death(2);
  w.update(n2.food);
  w.show();
  
  n1.aliment(n1.food.z);
  n2.aliment(n2.food.z);
 
 
 if(e1 < 10){
   pickLocation1();
   e1 = 100
  }

 if(e2 < 10){
   pickLocation2();
   e2 = 100
   }
 
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1); 
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);  
  } 
  
   if (keyCode === 87) {
    w.dir(0, -1);
    orientation_w = 0;
  } else if (keyCode === 83) {
    w.dir(0, 1);
     orientation_w = 1;
  } else if (keyCode === 68) {
    w.dir(1, 0);
    orientation_w = 2;
  } else if (keyCode === 65) {
    w.dir(-1, 0);
     orientation_w = 3;
  }
}
