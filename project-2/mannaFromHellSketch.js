let font;
let pg;
let yOffsets = [];
let baseY = [];
let dripSpeed = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('p5-canvas');
  noStroke();

  
  textFont('Pirata One');
  textSize(160);
  textAlign(CENTER, CENTER);


  pg = createGraphics(width, height);
  pg.pixelDensity(1);
  pg.textFont('Pirata One');
  pg.textSize(160);
  pg.textAlign(CENTER, CENTER);
  pg.fill(255);
  pg.text('Manna From Hell', width / 2, height / 2);

  pg.loadPixels();
  for (let x = 0; x < pg.width; x++) {
    yOffsets[x] = random(1000);
    baseY[x] = 0;
    dripSpeed[x] = random(0.5, 2);
  }
}

function draw() {
  clear(); 
  pg.loadPixels();

  let melted = createImage(pg.width, pg.height);
  melted.loadPixels();

  for (let x = 0; x < pg.width; x++) {
    let offset = noise(yOffsets[x]) * 80; 
    yOffsets[x] += 0.01;
    baseY[x] += dripSpeed[x] * 0.2;

    for (let y = 0; y < pg.height; y++) {
      let index = (x + y * pg.width) * 4;
      let r = pg.pixels[index];
      let g = pg.pixels[index + 1];
      let b = pg.pixels[index + 2];
      let a = pg.pixels[index + 3];

      if (a > 0) {
        let newY = constrain(
          y + offset + sin(frameCount * 0.02 + x * 0.05) * 2 + baseY[x] * 0.05,
          0,
          pg.height - 1
        );
        let newIndex = (x + int(newY) * pg.width) * 4;
        melted.pixels[newIndex] = r;
        melted.pixels[newIndex + 1] = g;
        melted.pixels[newIndex + 2] = b;
        melted.pixels[newIndex + 3] = a;
      }
    }
  }

  melted.updatePixels();
  image(melted, 0, 0, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
