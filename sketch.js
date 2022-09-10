function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
}

class Point{
  constructor(x , y , x_plus , y_plus){
    this.x = x;
    this.y = y;
    this.x_plus = x_plus;
    this.y_plus = y_plus;
  }
}

const num = prompt("how many circles ?");
console.log(num);

var points = [];

for (let i = 0 ; i<num ; i++){
  points.push(new Point(Math.random()*400 , Math.random()*400, Math.random() > 0.5? 1 : -1, Math.random() > 0.5? 1 : -1));
}

function draw() {
  clear();
  setup();
  
  var amount = 0 ;
  for (let i = 0; i < points.length; i++) {
    stroke(255);
    strokeWeight(10);
    
    if ((Math.abs(points[i].x - mouseX) < 100) && (Math.abs(points[i].y - mouseY) < 100)){
      amount++;
      
      if (Math.abs(points[i].x - mouseX) > 40) points[i].x += points[i].x > mouseX ? -0.7 : 0.7;
      if (Math.abs(points[i].y - mouseY) > 40) points[i].y += points[i].y > mouseY ? -0.7 : 0.7;
  
      
      strokeWeight(1);
      line(points[i].x , points[i].y , mouseX , mouseY);
      strokeWeight(10);
    }else{
      if (points[i].x >= windowWidth) points[i].x_plus = Math.random()*-1;
      if (points[i].x <= 0) points[i].x_plus = Math.random();
      if (points[i].y >= windowHeight) points[i].y_plus = Math.random()*-1;
      if (points[i].y <= 0) points[i].y_plus = Math.random(); 
      points[i].x += points[i].x_plus;
      points[i].y += points[i].y_plus;
    }
    
    for (let j = 0; j < points.length; j++) {
      if (j == i){continue};
      
      if ((Math.abs(points[i].x - points[j].x) < 80) && (Math.abs(points[i].y - points[j].y) < 80)){
      strokeWeight(1);
      line(points[i].x , points[i].y , points[j].x , points[j].y);
      strokeWeight(10);
    }
    }
    text("Connected : "+amount , 20 , 20);
    point(points[i].x,points[i].y);
    
  }
}