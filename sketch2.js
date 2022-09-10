let slider , inp , inp2;

function setup() {
createCanvas(windowWidth, windowHeight);
background(220);
textSize(40);


inp = createInput('10');
inp.position(310, windowHeight-110);
inp.size(50);
inp.input(myInputEvent);

inp2 = createInput('80');
inp2.position(310, windowHeight-60);
inp2.size(50);
inp2.input(myInputEvent2);

slider = createSlider(0, 100, 1);
slider.position(windowWidth-170, windowHeight-60);
slider.style('width', '120px');

}

class Point{
constructor(x , y , x_plus , y_plus){
    this.x = x;
    this.y = y;
    this.x_plus = x_plus;
    this.y_plus = y_plus;
}
}

function myInputEvent() {
    if (isNaN(this.value()))return ;
    points = [];
    num = this.value();
    for (let i = 0 ; i<num ; i++){
      points.push(new Point(Math.random()*screen.width , Math.random()*screen.height, Math.random() > 0.5? 1 : -1, Math.random() > 0.5? 1 : -1));
    }
  }

  function myInputEvent2() {
    if (isNaN(this.value()))return ;
    num2 = this.value();
  }

function mouseClicked() {
    points = [];
    for (let i = 0 ; i<num ; i++){
      points.push(new Point(Math.random()*screen.width , Math.random()*screen.height, Math.random() > 0.5? 1 : -1, Math.random() > 0.5? 1 : -1));
    }
  }

var num = 10;
var num2 = 80;

var points = [];

for (let i = 0 ; i<num ; i++){
points.push(new Point(Math.random()*screen.width , Math.random()*screen.height, Math.random() > 0.5? 1 : -1, Math.random() > 0.5? 1 : -1));
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    slider.position(windowWidth-170, windowHeight-60);
    inp2.position(310, windowHeight-60);
    inp.position(310, windowHeight-110);
}

function draw() {
clear();
background(220);

var amount = 0 ;
var amount2 = 0;

max_allow = parseInt(num*slider.value()/100);
console.log(max_allow);
for (let i = 0; i < points.length; i++) {
    stroke(255);
    strokeWeight(10);
    
    
    if ((Math.abs(points[i].x - mouseX) < num2) && (Math.abs(points[i].y - mouseY) < num2)){
    amount++;
    amount2++;
    
    if (Math.abs(points[i].x - mouseX) > num/2) points[i].x += points[i].x > mouseX ? -1.3 : 1.3;
    if (Math.abs(points[i].y - mouseY) > num/2) points[i].y += points[i].y > mouseY ? -1.3 : 1.3;

    
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
    
    current = 0;

    for (let j = 0; j < points.length; j++) {
    if (j == i){continue};
    
    if ((Math.abs(points[i].x - points[j].x) < num2) && (Math.abs(points[i].y - points[j].y) < num2)){
        amount2++;
        current++;

        if (current >= max_allow)break;
    strokeWeight(1);
    line(points[i].x , points[i].y , points[j].x , points[j].y);
    strokeWeight(10);
    }
    }
    text("Connected : "+amount , 80 , 80);
    text("Vertex : "+amount2 , 380 , 80);
    text("Num of Pts: " , 80 , windowHeight-100);
    text("Conn dis: " , 80 , windowHeight-40);
    text(max_allow , windowWidth-170 , windowHeight-100);
    point(points[i].x,points[i].y);
    
}
}