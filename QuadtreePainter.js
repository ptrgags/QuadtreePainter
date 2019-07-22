var root;

function setup() {
  createCanvas(500, 500);
  
  let big_rect = new Rectangle(0, 0, width, height);
  root = new Quadtree(big_rect);
  root.insert(100, 100, color(255, 0, 0));
  root.insert(50, 100, color(0, 255, 0));
  root.insert(25, 50, color(0, 0, 255));
  root.insert(75, 100, color(255, 255, 0));
}

 
function draw() {
  background(128);
  
  root.draw();
}
