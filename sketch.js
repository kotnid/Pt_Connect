let ele;
let db;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  textSize(40);

  const firebaseConfig = {
    
  };

  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
}

function create_rank(doc){
  document.getElementsByClassName("leaderboard")[0].innerHTML+="<p>"+doc.data().name+","+doc.data().time+"</p><br>";
}

function submit(){
  var name = document.getElementById("name").value;
  db.collection('data').add({name:name , time:timer});
  
  document.getElementsByClassName("score")[0].style.display = 'none';
  document.getElementsByClassName("leaderboard")[0].style.display = '';

  db.collection('data').orderBy('time').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      create_rank(doc);
    })
  })
}

function submit2(){
  document.getElementsByClassName("score")[0].style.display = 'none';
  document.getElementsByClassName("leaderboard")[0].style.display = 'none';
  stat = 0;
  console.log(stat);
}

function mouseClicked() {
  if (stat != 0){return };
  stat = 1;
  sec = 0;

  points = [];
  for (let i = 0 ; i<num ; i++){
    points.push(new Point(Math.random()*screen.width , Math.random()*screen.height, Math.random() > 0.5? 1 : -1, Math.random() > 0.5? 1 : -1));
  }

  start_time = new Date();
}

class Point{
  constructor(x , y , x_plus , y_plus){
    this.x = x;
    this.y = y;
    this.x_plus = x_plus;
    this.y_plus = y_plus;
  }
}

//const num = prompt("how many circles ?");
//console.log(num);
num = 5 ;

var points = [];
var stat = 0;

for (let i = 0 ; i<num ; i++){
  points.push(new Point(Math.random()*screen.width , Math.random()*screen.height, Math.random() > 0.5? 1 : -1, Math.random() > 0.5? 1 : -1));
}

let timer = 0;

function draw() {
  //console.log(stat);
  if (stat == 0){
    clear();
    background(220);

    text('Click to start' , width / 2, height / 2  );

    for (let i = 0; i < points.length; i++) {
      stroke(255);
      strokeWeight(10);
      
      if ((Math.abs(points[i].x - mouseX) < 100) && (Math.abs(points[i].y - mouseY) < 100)){
        amount++;
        
        if (Math.abs(points[i].x - mouseX) > 40) points[i].x += points[i].x > mouseX ? -1.3 : 1.3;
        if (Math.abs(points[i].y - mouseY) > 40) points[i].y += points[i].y > mouseY ? -1.3 : 1.3;
    
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
      point(points[i].x,points[i].y);
  
      }
  }
  else if (stat == 1){
  clear();
  background(220);
  
  if (frameCount % 60 == 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer ++;
  }

  sec = (new Date() - start_time)/1000;
  text("time : "+sec, 500 ,100);

  var amount = 0 ;
  for (let i = 0; i < points.length; i++) {
    stroke(255);
    strokeWeight(10);
    
    if ((Math.abs(points[i].x - mouseX) < 100) && (Math.abs(points[i].y - mouseY) < 100)){
      amount++;
      
      if (Math.abs(points[i].x - mouseX) > 40) points[i].x += points[i].x > mouseX ? -1.3 : 1.3;
      if (Math.abs(points[i].y - mouseY) > 40) points[i].y += points[i].y > mouseY ? -1.3 : 1.3;
  
      
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
      break;
    }
    }
    text("Connected : "+amount , 100 , 100);
    point(points[i].x,points[i].y);

    if (amount == points.length){stat = 2}
  }
    
  }
  else if (stat == 2){
    textAlign(CENTER);
    text('Ended , time : '+timer , width / 2, height / 2);
    text('Click to restart' , width / 2, height / 2 + 100);
    clear();
    document.getElementsByClassName("score")[0].style="";
    document.getElementsByClassName("time")[0].innerHTML = sec;
  }
}