const { random, floor } = Math;

const randomBetween = (min, max) => random() * (max - min) + min;

const drawing = p => {
  p.setup = () => p.createCanvas(800, 800)

  p.draw = () => {
    let ellipseWidth = 60;
    let ellipseHeight = ellipseWidth;
    
    p.noStroke();
    p.fill(`#${floor(random()*16777215).toString(16)}`);
    
    if (p.mouseIsPressed) {
      ellipseWidth = randomBetween(ellipseWidth / 1.2, ellipseWidth * 1.2);
      ellipseHeight = ellipseWidth;
    }
    
    p.ellipse(p.mouseX, p.mouseY, ellipseWidth, ellipseHeight);
  }
}

[...document.querySelectorAll('.canvas')].map(node => { new p5(drawing, node.id) })