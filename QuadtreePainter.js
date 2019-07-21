var test_rect;
var children;

function setup() {
  createCanvas(500, 500);
  
  test_rect = new Rectangle(0, 0, width, height);
  children = test_rect.subdivide();
}


function draw() {
  background(128);
  fill(255, 0, 0);
  
  for (let child of children) {
    child.draw();
  }
}
