function Nourriture(){
   this.r = 0;


 this.create = function(){
   this.cols = floor(width/scl);
   this.rows = floor(height/scl);
  
      this.food = createVector(floor(random(this.cols)), floor(random(this.rows)), (random(100))/scl);
      this.food.mult(scl);
}
 
 
 this.aliment = function(r) {
   this.r = r;
  
   
  if(r > 0 && r < chanceDeAvoir){
    //Pomme
    stroke(0);
    //strokeWeight(0.5);
    var p = scl * 3/20;
    
    fill(255, 0, 0);
    rect(this.food.x, this.food.y, scl, scl);
    fill(51);
    rect(this.food.x, this.food.y + scl - p, p, p); //en bas à gauche
    rect(this.food.x + scl - p, this.food.y + scl - p, p, p);// en bas à droite
    rect(this.food.x + (scl - p)/2, this.food.y, p, p);//en haut au centre
    
    //tige
    fill(0,150,0);
    stroke(0);
    rect(this.food.x + (scl - p)/2,this.food.y + p, p, -3 * p);
    rect(this.food.x + (scl - p)/2 + p,this.food.y - 3 * p, p, p);
    
    //reflet
    fill(255);
    rect(this.food.x + p,this.food.y + p, p * 2/3, 3 * p);
    rect(this.food.x + p * 5/3,this.food.y + 4 * p, p * 2/3,p * 2/3);
      fill(51);
      noStroke();
      rect(this.food.x + scl - p + p/7, this.food.y + scl - p + p/7, p, p);//bas droite
      rect(this.food.x - p/7, this.food.y + scl - p + p/7, p, p);//bas gauche
      
  e1 = 100
  
  } else if (r > chanceDeAvoir && r < 100){
    e1 = e1 - 1;
    
    var scale_min = 0.5;
    var scale_max = 2;
    push();
     translate(this.food.x + scl/2 + random (-1.5 * scl, 1.5 * scl), this.food.y + scl/2 + random(-1.5 * scl, 1.5 *scl));
     //translate(this.food.x + scl/2, this.food.y + scl/2)
     rotate(random(-10, 10));
     //scale(random(scale_min, scale_max));
     scale(random(scale_min, scale_max), random(scale_min, scale_max));
     //scale(3)
    
    //Ananas
    var a = scl/10
    var t = -scl/2
    stroke(0);
    fill(255, 200, 0);
    rect(t, t, scl, scl);
    
    
    fill(51);
    rect(t , t + scl - a, a, a); //en bas à gauche
    rect(t + scl - a, t + scl - a, a, a);// en bas à droite
    rect(t, t, a, 2 * a); //en haut à gauche
    rect(t + scl - a, t, a, 2 * a);// en haut à droite
    
    noStroke();
      rect(t - a/7, t + scl - a + a/7, a, a); //en bas à gauche
      rect(t + scl - a + a/7, t + scl - a + a/7, a, a);// en bas à droite
      rect(t - a/7, t - a/7, a , 2 * a); //en haut à gauche
      rect(t + scl - a + a/7, t - a/7, a, 2 * a);// en haut à droite
    stroke(0);
    
    //orange foncé
    fill(255, 150, 0);
    rect(t + scl/2 - 3 * a, t + scl/2 - 2 * a, 2 * a, 2 * a); //en haut à gauche
    rect(t + scl/2 + 1 * a, t + scl/2 - 2 * a, 2 * a, 2 * a); //en haut à droite
    rect(t + scl/2 - 3 * a, t + scl/2 + a, 2 * a, 2 * a); //en bas à gauche
    rect(t + scl/2 + 1 * a, t + scl/2 + a, 2 * a, 2 * a); //en bas à droite
    
    fill(255, 200, 0);
    noStroke();
      rect(t + scl/2 - 3 * a - a/2, t + scl/2 - a, a + a/2, a + a/2); //en haut à gauche
      rect(t + scl/2 + 2 * a , t + scl/2 - a, a + a/2, a + a/2); //en haut à droite
      rect(t + scl/2 - 3 * a - a/2, t + scl/2 + 2 * a , a + a/2, a + a/2); //en bas à gauche
      rect(t + scl/2 + 2 * a, t + scl/2 + 2 * a, a + a/2, a + a/2); //en bas à droite
    stroke(0);
    fill(255, 150, 0);
    
    //tige
    fill(0,150,0);
    stroke(0);
    var a = 3
    
    rect(t + (scl - a)/2 - a, t - 2 * a, 3 * a, 2 * a);//base
    rect(t + (scl - a)/2 , t - 4 * a, a, 2 * a);//centre
    rect(t + (scl - a)/2 + 2 * a, t - 3 * a, a, 2 * a);//droite
    rect(t + (scl - a)/2 - 2 * a, t - 3 * a, a, 2 * a);//gauche
    
    noStroke();
       rect(t + (scl - a)/2 - 2 * a + a/4, t - 2 * a + a/4, 5 * a - a, a/2 );//base
       rect(t + (scl - a)/2 + a/4, t - 4 * a + 1, a - a/2, 2 * a);//centre
       fill(0, 120, 0);
       rect(t + (scl - a)/2 + a - a/8, t - 1 * a - a/8, a, a);//droite foncé
       fill(0, 175, 0);
       rect(t + (scl - a)/2 - 2 * a + a/8, t - 3 * a + a/8, a/2, a);//gauche pale
    stroke(0)
    
     pop();
  } 
}
}
