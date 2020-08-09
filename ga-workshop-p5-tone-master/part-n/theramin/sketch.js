
const now = Tone.now()

const dist = new Tone.Distortion(0.8).toDestination();
const crusher = new Tone.BitCrusher(4).toDestination();

const synth = new Tone.Synth().connect(crusher);

/*
const reverb = new Tone.JCReverb(0.4).toDestination();
const delay = new Tone.FeedbackDelay(0.5);
// connecting the synth to reverb through delay
const synth = new Tone.DuoSynth().chain(delay, reverb);
*/

let rad = 25;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(21);



  fill(200,12,212)

}

function draw() {
  //fill(0);
  //circle(random(width/4,width*3/4),random(height/4,height*3/4),10);
  noStroke();
  
  fill(255,0,0);
  circle(500,500,20);
  circle(450,550,20);
  circle(400,600,20);
  circle(600,400,20);
  circle(300,700,20);

  
}

function mouseClicked(){
  Tone.start();
  let freq = mouseX*height+mouseY;

  synth.triggerAttackRelease(freq/1000,.01);
  noStroke();
  fill(125);
  circle(mouseX,mouseY,rad);
}

function mouseDragged(){
  let freq = mouseX*height+mouseY;
  synth.triggerAttack(freq/1000, now);
  
  stroke(255)
  fill(125)

  circle(mouseX,mouseY,rad);
}

function mouseReleased(){
  console.log("released")
  synth.triggerRelease();
  console.log(mouseX + ", " + mouseY)
  
}
