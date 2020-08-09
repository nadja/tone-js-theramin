// tone-waveform

let synth;
let bgCol;
let size;
let waveform;
var thecards = [];
var drawnimage;
var makeNewPattern = 0;
var xpos = 20;

const AMinorScale = ['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4'];

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadImages();
  drawnimage = thecards[0];

  bgCol = color(207, 236, 207);
  background(bgCol);
  textSize(22);
  
  // power of 32, in the range [32, 32768]
  size = 1024;

  synth = new Tone.Synth();
  waveform = new Tone.Waveform(size).toDestination();
  synth.connect(waveform);
  
  noFill();
  strokeWeight(2);
}

function loadImages() {
    // it's gonna be a lot :x
    // cmswp 
    for (var i= 0; i<9; i++){
        thecards[i] = loadImage("cards/c0" + (i+1).toString() + ".jpg");
    }
}

function draw() {
  // background(bgCol);

  // draw the wave
  const waveArray = waveform.getValue();
  const bandSize = width / size;

  /*
  beginShape();

  for (let i = 0; i < waveArray.length; i++) {
    curveVertex(bandSize * i, map(waveArray[i], -1, 1, height, 0));
  }
  endShape();
  */

  image(drawnimage,xpos,random(-50,50));

}

function mousePressed() {
  hasStarted = true;
  Tone.start();
}

function keyPressed() {

    xpos += 200;

  switch (key) {
    case ('a'): 
      synth.triggerAttackRelease(AMinorScale[0], '16n'); 
      bgCol = color(207, 236, 207);
      drawnimage = thecards[0];
      break;
    
    case ('s'): 
      synth.triggerAttackRelease(AMinorScale[1], '16n');
      bgCol = color(154, 206, 223);
      drawnimage = thecards[1];

      break;
    
    case ('d'): 
      synth.triggerAttackRelease(AMinorScale[2], '16n'); 
      bgCol = color(221, 212, 232);
      drawnimage = thecards[3];

      break;
    
    case ('f'): 
      synth.triggerAttackRelease(AMinorScale[3], '16n'); 
      bgCol = color(253, 202, 162);
      drawnimage = thecards[4];

      break;
    
    case ('j'): 
      synth.triggerAttackRelease(AMinorScale[4], '16n');
      bgCol = color(219, 213, 185); 
      drawnimage = thecards[5];

      break;

    case ('k'): 
      synth.triggerAttackRelease(AMinorScale[5], '16n'); 
      bgCol = color(179, 226, 221);
      drawnimage = thecards[6];

      break;
    
    case ('l'): 
      synth.triggerAttackRelease(AMinorScale[6], '16n'); 
      bgCol = color(148, 168, 208);
      drawnimage = thecards[7];

      break;
  }
}