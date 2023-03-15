let dots = [];
let guideDots = [];
let currentIndex = 0;
let drawingCompleted = false;

let lastPos = { x: 122, y: 240 };
let currentPos = { x: 122, y: 240 };
let dotSize = 7;

const guidePoints = [
{x: 162, y: 218},
{x: 122, y: 240},
{x: 266, y: 308},
{x: 310, y: 218},
{x: 300, y: 314},
{x: 458, y: 360},
{x: 430, y: 316},
{x: 458, y: 220},
{x: 448, y: 170},
{x: 500, y: 216},
{x: 472, y: 310},
{x: 614, y: 268},
{x: 698, y: 310},
{x: 732, y: 228},
{x: 710, y: 170},
{x: 610, y: 216},
{x: 554, y: 186},
{x: 614, y: 146},
{x: 472, y: 88},
{x: 404, y: 120},
{x: 208, y: 130},
{x: 110, y: 186},
{x: 162, y: 218},
];

class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  connect(px, py) {
    stroke(255, 100, 167);//선 색깔 
    line(this.x, this.y, px, py);
  }
  plot(fillColor, strokeColor) {
    fill(255,255,102);
    stroke(255,255,102);//별 색깔
    strokeWeight(2);
    ellipse(this.x, this.y, dotSize);
  }
  plotText(txt) {
    fill(255, 255, 255);
    stroke(50,85,185);// 숫자 색 커스텀
    textSize(20);
    text(txt, this.x+8, this.y+10);
  }
  within(px, py) {
    let isWithin = false;
    let d = dist(px, py, this.x, this.y);
    isWithin = d < dotSize ? true: false;
    return isWithin;
  }
}

function setup() {
  createCanvas(900, 450);  
  for (let i = 1; i < guidePoints.length; i++) {
    guideDots.push(new Dot(guidePoints[i].x, guidePoints[i].y));
  }
}

function draw() {
  background(50,85,185);
  textFont('helvetica');
    
  for (let i = 0; i < guideDots.length; i++) {
    guideDots[i].plot(222, 160);
    guideDots[i].plotText(i+1);
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].plot(90, 90);
    if (i > 0) {
      dots[i].connect(dots[i-1].x, dots[i-1].y);
    }
  }
 
  if (currentIndex == 0) {
    fill(255,255,255);
    stroke(50,85,185);//여기서 시작 글자 색 커스텀 
    textSize(20);
    text("^ 여기서부터 시작해봐요!", guideDots[0].x-5, guideDots[0].y+30);    
  }
  else if (!drawingCompleted) {
    stroke(255,255,102);// 가이드 라인 색 
    strokeWeight(3);
    line(lastPos.x, lastPos.y, currentPos.x, currentPos.y);
  }
  else {
    fillVertex();
    fill(255,255,255);
    stroke(50,85,185);
    strokeWeight(5);
    ellipse(guideDots[length].x+80, guideDots[length].y-60, 30);
    textSize(20);
    text("멋진 물고기자리에요!", 40,90);    
  }
}

//물고기 색
function fillVertex() {
  stroke(255, 100, 167);
  fill(255, 100, 167);
  beginShape();
  for (let i = 0; i < dots.length; i++) {
    vertex(dots[i].x, dots[i].y);
  }  
  endShape(CLOSE);
}

function mousePressed() {
  currentPos.x = mouseX;  
  currentPos.y = mouseY;
  if (!drawingCompleted &&
      guideDots[currentIndex].within(mouseX, mouseY)) {
    dots.push(new Dot(mouseX, mouseY));
    currentIndex++;
    lastPos.x = mouseX;  
    lastPos.y = mouseY;
    if (currentIndex == guideDots.length) {
      drawingCompleted = true;
    }
  }
}

function mouseMoved() {
  currentPos.x = mouseX;  
  currentPos.y = mouseY;
}