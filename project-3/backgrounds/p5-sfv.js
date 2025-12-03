let sfvSketch = function(p) {

  let noiseOffsets = [];
  let numBlobs = 3; 

  p.setup = function() {
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent("p5-sfv");

    for (let i = 0; i < numBlobs; i++) {
      noiseOffsets.push({
        x: p.random(1000),
        y: p.random(1000),
        size: p.random(1000),
        hue: p.random(1000), 
        colorSpeed: p.random(0.3, 0.7) 
      });
    }

    p.noStroke();
  };

  p.draw = function() {
    p.clear();
    drawHeatGradient();
  };

  function drawHeatGradient() {
    for (let i = 0; i < numBlobs; i++) {
      let t = p.frameCount * 0.001;
      
      let x = p.noise(noiseOffsets[i].x + t) * p.width * 1.8 - p.width * 0.4;
      let y = p.noise(noiseOffsets[i].y + t) * p.height * 1.8 - p.height * 0.4;
      
      let size = p.noise(noiseOffsets[i].size + t) * 2000 + 1500;

      let hueShift = p.noise(noiseOffsets[i].hue + t * noiseOffsets[i].colorSpeed * 50);
      
      let r = p.map(hueShift, 0, 1, 180, 255);
      let g = p.map(hueShift, 0, 1, 20, 180);
      let b = p.map(hueShift, 0, 1, 0, 60);
      
      let col = p.color(r, g, b, 15);

      drawGradientCircle(x, y, size, col);
    }

    let overlayShift = p.noise(p.frameCount * 0.0005);
    let overlayR = p.map(overlayShift, 0, 1, 240, 255);
    let overlayG = p.map(overlayShift, 0, 1, 50, 100);
    p.fill(overlayR, overlayG, 0, 20);
    p.rect(0, 0, p.width, p.height);
  }

  function drawGradientCircle(x, y, diameter, col) {
    let steps = 80;
    for (let i = steps; i > 0; i--) {
      let a = p.map(i, 0, steps, 0, p.alpha(col));
      let currentCol = p.color(p.red(col), p.green(col), p.blue(col), a);
      p.fill(currentCol);
      let d = p.map(i, 0, steps, 0, diameter);
      p.ellipse(x, y, d, d);
    }
  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

new p5(sfvSketch);