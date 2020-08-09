// p5-basic-painter
let numCols = 9;
let numRows = 9;
let boxW = 100; // sqaure
let synth;
var framenum = 0;
var currentPoint = 0;
let durationmod = 3;
let bufferBorder = 10;

var pointArray = [];
const AMinorScale = ['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4'];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(21);
  synth = new Tone.Synth().toDestination();

  fill(0,255,0)
  rect(0,0,numCols*boxW+20,numRows*boxW+20);

}

function draw() {
  framenum++; // keep track of frame

  // draw a grid
  for (var i=0; i<(numCols); i++){
    for (var j=0; j<(numRows); j++){
      fill(255);
      stroke(0);
      square((i)*boxW+bufferBorder, (j)*boxW+bufferBorder, boxW);
    }
  }

  noStroke();
  for (var i=0; i<pointArray.length; i++){
    circle(pointArray[i].x, pointArray[i].y, 10);
    if(i>0){
      stroke(0);
      line(pointArray[i-1].x,pointArray[i-1].y,pointArray[i].x,pointArray[i].y);
    }
  }

  // overlay
  
  rect(0,0,70,30)
  fill(255,0,0);
  noStroke();
  text(framenum, 5,10);

  if(pointArray.length==0) return;
  if (pointArray.length<=currentPoint) { // replay
    currentPoint = 0;
    framenum = 0;
  }
  
  stroke(0,255,0);
  text(pointArray[currentPoint].duration, 10,20); // next note @ 
  // time to play?
  
  fill(255,0,255);
  circle(pointArray[currentPoint].x,pointArray[currentPoint].y,20)
  

  if (pointArray[currentPoint].duration <= framenum){
    synth.triggerAttackRelease(AMinorScale[int(pointArray[currentPoint].y/boxW)], '32n'); 
    currentPoint++;
  }
  
  

  }

function mouseClicked(){
  framenum=0;
  currentPoint = 0;
  Tone.start();
  synth.triggerAttackRelease(AMinorScale[0], '32n'); 

  // record point
  pointArray.push(new clickedPoint(mouseX,mouseY,framenum));
  let pl = pointArray.length;

  if(pl > 1){ // at least 2 points
    // calculate "duration" for the last added point
    pointArray[pl-1].duration = pointArray[pl-2].duration+int(dist(pointArray[pl-1].x, pointArray[pl-1].y, pointArray[pl-2].x, pointArray[pl-2].y)/durationmod);
    console.log("duration calculated as " + pointArray[pl-2].duration);
  }

}

function keyPressed() {
  background(21);
  framenum=0;
  currentPoint = 0;
}

class clickedPoint{
  constructor(x,y,frame){
    this.x = x;
    this.y = y;
    this.frame = frame;
    this.duration = 0;
  }
}