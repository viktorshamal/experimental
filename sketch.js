const {
  random,
  floor
} = Math;

const randomBetween = (min, max) => random() * (max - min) + min;

const defaultCanvas = (p, node) => {
  p.createCanvas(600, 600);
  p.fill("black");
  p.text(node.id, 10, p.height - 30);
}

const drawings = {
  "view": node => p => {
    p.setup = () => defaultCanvas(p, node);

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
}

const testElements = document.querySelectorAll("[component]");

Array.prototype.forEach.call(testElements, function(node) {
  new p5(drawings[node.getAttribute("component")](node), node.id)
})
