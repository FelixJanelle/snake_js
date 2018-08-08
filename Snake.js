function Snake(r, g, b,transparence, choix) {
  this.r = r;
  this.g = g;
  this.b = b;
  
  this.langue = 0;
  
  this.vrai = 0;
  
  this.x = 0;
  this.y = 0;
  this.xspeed = 0;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  
  //this.tetex_s = this.x
  //this.tetey_w = this.y
  

  this.eat = function(pos) {
    this.vrai = 0
   // console.log(pos.z);
    //collision
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
    
    //f1
    if (pos.z > 0 && pos.z < chanceDeAvoir){
      this.vrai = 1
      }
      
      else if (pos.z > chanceDeAvoir && pos.z < 100){   
      this.vrai = 2
      }
     }
    
      if (this.vrai == 1){
        this.total = this.total + 3 //pomme
        return true;
      } else if (this.vrai == 2){
        this.total = this.total + 3 //ananas
        return true;
      } else {
       return false
      } 
  }

  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.death = function(r) {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        if (r = 1) {
        console.log('Longeur (joueur 1):' + this.tail.length);
        } 
        if (r = 2){
        console.log('Longeur (joueur 2):' + this.tail.length);
        }
        this.total = 0;
        this.tail = [];
      }
    }
  }

  this.update = function(pos) {
    
     //si c'est pomme
    if (pos.z > 0 && pos.z < chanceDeAvoir){
        //shift tout de 1 et ajoute deux nouveaux espaces dans l'array
        for (var i = 0; i < this.tail.length - 1 ; i++) {
          this.tail[i] = this.tail[i + 1];
          this.tail[i] = this.tail[i + 1];
          this.tail[i] = this.tail[i + 1];

        }
        if (this.total >= 1) {
          //pour chaque index de l'array, ca crée un vecteur (x,y), qui sera utilisé plus tard pour la position spacial de chaque élément de tail.
          this.tail[this.total - 1] = createVector(this.x, this.y);
          this.tail[this.total - 2] = createVector(this.x, this.y);
          this.tail[this.total - 3] = createVector(this.x, this.y);
      }
     }
     
   //si c'est ananas
    if (pos.z > chanceDeAvoir && pos.z < 100){   
        //shift tout de 1 et ajoute deux nouveaux espaces dans l'array
        for (var i = 0; i < this.tail.length - 1 ; i++) {
          this.tail[i] = this.tail[i + 1];
          this.tail[i] = this.tail[i + 1];
          this.tail[i] = this.tail[i + 1];
          //this.tail[i] = this.tail[i + 1];
          //this.tail[i] = this.tail[i + 1];
          //this.tail[i] = this.tail[i + 1];
        }
        if (this.total >= 1) {
          //pour chaque index de l'array, ca crée un vecteur (x,y), qui sera utilisé plus tard pour la position spacial de chaque élément de tail.
          this.tail[this.total - 1] = createVector(this.x, this.y);
          this.tail[this.total - 2] = createVector(this.x, this.y);
          this.tail[this.total - 3] = createVector(this.x, this.y);
          //this.tail[this.total - 4] = createVector(this.x, this.y);
          //this.tail[this.total - 5] = createVector(this.x, this.y);
          //this.tail[this.total - 6] = createVector(this.x, this.y);
        }
     }
    
    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

  //portail
     // this.x = constrain(this.x, 0, width - scl);
     // this.y = constrain(this.y, 0, height - scl);
     
     //plafond et plancher
     this.y = constrain(this.y, 0, height - scl);
     
     //portail droit (cheat inclu)
     if ( this.x > width && (keyIsDown(96) || keyIsDown(70))){
          
              if (keyIsDown(LEFT_ARROW)){
                this.x = pos.x
                this.y = pos.y
              } else if (keyIsDown(UP_ARROW)){
                this.x = pos.x
                this.y = pos.y
              } else if (keyIsDown(DOWN_ARROW)){
                this.x = pos.x
                this.y = pos.y
              } else if (keyIsDown(RIGHT_ARROW)){
                this.x = pos.x
                this.y = pos.y
              }
     } else if (this.x > width && this.y == (hauteurPortail - 1) * scl){
       this.x = 0;
       this.y = height - hauteurPortail* scl;
       this.total = this.total + 1
     }
     
     //empêche de traverser le mur de droite
     if (this.x > width - scl && this.y !== (hauteurPortail - 1) * scl){
     this.x = width - scl;
     }
     
     //portail gauche (reverse)
     if (this.x < 0 && this.y !== height - hauteurPortail * scl){
     this.x = 0;
     }
     if (this.x < 0){
     this.x = width - scl;
     this.y = (hauteurPortail - 1)* scl;
     this.total = this.total + 1
     }
  }

  this.show = function() {
     var j = scl/9;
    push();
    noStroke();
    var t = 3
    //noStroke();
    //dessine tous les carrées de la tail
    for (var i = 0; i < this.tail.length; i++) {
      fill(r * (r - 50/255) * 255,g * (g-50/255) * 255,b * (b-50/255) * 255, transparence);
      rect(this.tail[i].x, this.tail[i].y + j, scl, scl - 2 * j);
      rect(this.tail[i].x + j, this.tail[i].y, scl - 2 * j, scl);
      fill(r * 255,g * 255,b * 255, transparence);
      rect(this.tail[i].x + j, this.tail[i].y + j, scl - 2 * j, scl - 2 * j);     
    }
    pop();
    
    if (this.tail.length >= 20){
      this.langue = 1;
    } else {
      this.langue = 0; 
    }
  //Tête snake
    var j = scl/9;
    
    push();
    noFill();
    strokeWeight(2);
    stroke(r * 255,g * 255,b * 255, 100);
    if (choix == 3) {
      image(katerie,this.x ,this.y, scl, scl)
      rect(this.x ,this.y, scl, scl)
    }
     if (choix == 4) {
      image(francis,this.x ,this.y, scl, scl)
      rect(this.x ,this.y, scl, scl)
    }
    if (choix == 5) {
      image(sophie,this.x ,this.y, scl, scl)
      rect(this.x ,this.y, scl, scl)
    }
    if (choix == 6) {
      if(this.xspeed < 0){
        image(florence_gauche,this.x ,this.y, scl, scl)
        rect(this.x ,this.y, scl, scl)
      } else {
        image(florence_droite,this.x ,this.y, scl, scl)
        rect(this.x ,this.y, scl, scl)
      }
    }
    pop();
    
    
    
    
    if(this.xspeed > 0){ //droite
      if (choix == 1){
       push();
        //tête
        fill(r * (r - 50/255) * 255,g * (g-50/255) * 255,b * (b-50/255) * 255);
        rect(this.x + j, this.y, scl - 4 * j, scl);
        fill(r * (r - 25/255) * 255,g * (g-25/255) * 255,b * (b-25/255) * 255);
        rect(this.x, this.y + 1 * j, scl - 1 * j, scl - 2 * j);
        fill(r * 255,g * 255,b * 255);
        rect(this.x, this.y + 2 * j, scl, scl - 4 * j);
        //langue
        if(this.langue == 1){
          fill(255, 105, 180)
          rect(this.x + scl, this.y + 4 * j, 2 * j, j);
        }
        //yeux
        stroke(0);
        strokeWeight(0.5);
        fill (255);
        rect(this.x + 2 * j, this.y + j, 3 * j, 3 * j);
        rect(this.x + 2 * j, this.y + 5 * j, 3 * j, 3 * j);
        noStroke();
        fill (0);
        rect(this.x + 3 * j, this.y + 2 * j, j, j);
        rect(this.x + 3 * j, this.y + 6 * j, j, j);
        pop();
      }else if (choix == 2){
       push();
        noStroke();
        fill(r * 255, g * 255, b * 255);
        rect(this.x + j, this.y, scl - 5 * j, scl);
        rect(this.x, this.y + j, scl - 3 * j, scl - 2 * j);
        fill(r * (r - 25/255) * 255,g * (g-25/255) * 255,b * (b-25/255) * 255);
        rect(this.x + j, this.y + 3 * j, scl - 2 * j, scl - 3 * j);
        rect(this.x, this.y + 4 * j, scl, scl - 5 * j);
        //oeil
        stroke(0);
        strokeWeight(0.5);
        fill(255);
        rect(this.x + scl/2 - 3 * j, this.y + j, 3 * j, 3 * j);
        noStroke();
        fill(0);
        rect(this.x + scl/2, this.y + 6 * j, 4 * j, j);
        rect(this.x + scl/2 - 2 * j, this.y + 2 * j, 2 * j, 2 * j);
        rect(this.x + scl/2 - j, this.y + 5 * j, j, j);
       pop();
      }
    }else if(this.xspeed < 0){ //gauche
      if (choix == 1){
       push();
        translate(this.x, this.y);
        rotate(180);
        translate(-this.x, -this.y);
        translate (- scl, - 2 * scl);
        translate(0, scl);
        noStroke();
        //tête
        fill(r * (r - 50/255) * 255,g * (g-50/255) * 255,b * (b-50/255) * 255);
        rect(this.x + j, this.y, scl - 4 * j, scl);
        fill(r * (r - 25/255) * 255,g * (g-25/255) * 255,b * (b-25/255) * 255);
        rect(this.x, this.y + 1 * j, scl - 1 * j, scl - 2 * j);
        fill(r * 255,g * 255,b * 255);
        rect(this.x, this.y + 2 * j, scl, scl - 4 * j);
        //langue
        if(this.langue == 1){
          fill(255, 105, 180)
          rect(this.x + scl, this.y + 4 * j, 2 * j, j);
        }
        //yeux
        stroke(0);
        strokeWeight(0.5);
        fill (255);
        rect(this.x + 2 * j, this.y + j, 3 * j, 3 * j);
        rect(this.x + 2 * j, this.y + 5 * j, 3 * j, 3 * j);
        fill (0);
        rect(this.x + 3 * j, this.y + 2 * j, j, j);
        rect(this.x + 3 * j, this.y + 6 * j, j, j);
       pop();
      } else if (choix == 2){
       push();
        translate(this.x, this.y);
        rotate(180);
        translate(-this.x, -this.y);
        translate (- scl, - 2 * scl);
        translate(0, scl);
        noStroke();
        fill(r * 255, g * 255, b * 255);
        rect(this.x + j, this.y, scl - 5 * j, scl);
        rect(this.x, this.y + j, scl - 3 * j, scl - 2 * j);
        fill(r * (r - 25/255) * 255,g * (g-25/255) * 255,b * (b-25/255) * 255);
        rect(this.x + j, this.y + 3 * j, scl - 2 * j, scl - 3 * j);
        rect(this.x, this.y + 4 * j, scl, scl - 5 * j);
        //oeil
        stroke(0);
        strokeWeight(0.5);
        fill(255);
        rect(this.x + scl/2 - 3 * j, this.y + j, 3 * j, 3 * j);
        noStroke();
        fill(0);
        rect(this.x + scl/2, this.y + 6 * j, 4 * j, j);
        rect(this.x + scl/2 - 2 * j, this.y + 2 * j, 2 * j, 2 * j);
        rect(this.x + scl/2 - j, this.y + 5 * j, j, j);
       pop();
      }
    }else if(this.yspeed < 0){ // haut
     if (choix == 1){
       push();
        translate(this.x, this.y);
        rotate(-90);
        translate(-this.x, -this.y);
        translate (- scl, - 2 * scl);
        translate(0, 2 * scl);
        noStroke();
        //tête
        fill(r * (r - 50/255) * 255,g * (g-50/255) * 255,b * (b-50/255) * 255);
        rect(this.x + j, this.y, scl - 4 * j, scl);
        fill(r * (r - 25/255) * 255,g * (g-25/255) * 255,b * (b-25/255) * 255);
        rect(this.x, this.y + 1 * j, scl - 1 * j, scl - 2 * j);
        fill(r * 255,g * 255,b * 255);
        rect(this.x, this.y + 2 * j, scl, scl - 4 * j);
        //langue
        if(this.langue == 1){
          fill(255, 105, 180)
          rect(this.x + scl, this.y + 4 * j, 2 * j, j);
        }
        //yeux
        stroke(0);
        strokeWeight(0.5);
        fill (255);
        rect(this.x + 2 * j, this.y + j, 3 * j, 3 * j);
        rect(this.x + 2 * j, this.y + 5 * j, 3 * j, 3 * j);
        fill (0);
        rect(this.x + 3 * j, this.y + 2 * j, j, j);
        rect(this.x + 3 * j, this.y + 6 * j, j, j);
        pop();
     } else if (choix == 2){
        push();
        translate(this.x, this.y);
        rotate(-90);
        translate(-this.x, -this.y);
        translate (- scl, - scl);
        translate(0, scl);
        noStroke();
        fill(r * 255, g * 255, b * 255);
        rect(this.x + j, this.y, scl - 5 * j, scl);
        rect(this.x, this.y + j, scl - 3 * j, scl - 2 * j);
        fill(r * (r - 25/255) * 255,g * (g-25/255) * 255,b * (b-25/255) * 255);
        rect(this.x + j, this.y + 3 * j, scl - 2 * j, scl - 3 * j);
        rect(this.x, this.y + 4 * j, scl, scl - 5 * j);
        //oeil
        stroke(0);
        strokeWeight(0.5);
        fill(255);
        rect(this.x + scl/2 - 3 * j, this.y + j, 3 * j, 3 * j);
        noStroke();
        fill(0);
        rect(this.x + scl/2, this.y + 6 * j, 4 * j, j);
        rect(this.x + scl/2 - 2 * j, this.y + 2 * j, 2 * j, 2 * j);
        rect(this.x + scl/2 - j, this.y + 5 * j, j, j);
       pop();
     }
    }else if(this.yspeed > 0){ //bas 
      if (choix == 1){
       push();
        translate(this.x, this.y);
        rotate(90);
        translate(-this.x, -this.y);
        translate (- scl, - 2 * scl);
        translate(scl, scl);
        noStroke();
        //tête
        fill(r * (r - 50/255) * 255,g * (g-50/255) * 255,b * (b-50/255) * 255);
        rect(this.x + j, this.y, scl - 4 * j, scl);
        fill(r * (r - 25/255) * 255,g * (g-25/255) * 255,b * (b-25/255) * 255);
        rect(this.x, this.y + 1 * j, scl - 1 * j, scl - 2 * j);
        fill(r * 255,g * 255,b * 255);
        rect(this.x, this.y + 2 * j, scl, scl - 4 * j);
        //langue
        if(this.langue == 1){
          fill(255, 105, 180)
          rect(this.x + scl, this.y + 4 * j, 2 * j, j);
        }
        //yeux
        stroke(0);
        strokeWeight(0.5);
        fill (255);
        rect(this.x + 2 * j, this.y + j, 3 * j, 3 * j);
        rect(this.x + 2 * j, this.y + 5 * j, 3 * j, 3 * j);
        fill (0);
        rect(this.x + 3 * j, this.y + 2 * j, j, j);
        rect(this.x + 3 * j, this.y + 6 * j, j, j);
       pop();
      }else if (choix == 2){
       push();
        translate(this.x, this.y);
        rotate(90);
        translate(-this.x, -this.y);
        translate (0, - 2 * scl);
        translate(0, scl);
        noStroke();
        fill(r * 255, g * 255, b * 255);
        rect(this.x + j, this.y, scl - 5 * j, scl);
        rect(this.x, this.y + j, scl - 3 * j, scl - 2 * j);
        fill(r * (r - 25/255) * 255,g * (g-25/255) * 255,b * (b-25/255) * 255);
        rect(this.x + j, this.y + 3 * j, scl - 2 * j, scl - 3 * j);
        rect(this.x, this.y + 4 * j, scl, scl - 5 * j);
        //oeil
        stroke(0);
        strokeWeight(0.5);
        fill(255);
        rect(this.x + scl/2 - 3 * j, this.y + j, 3 * j, 3 * j);
        noStroke();
        fill(0);
        rect(this.x + scl/2, this.y + 6 * j, 4 * j, j);
        rect(this.x + scl/2 - 2 * j, this.y + 2 * j, 2 * j, 2 * j);
        rect(this.x + scl/2 - j, this.y + 5 * j, j, j);
       pop();
      }
    }
}
}
