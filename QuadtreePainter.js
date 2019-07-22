const N = 100;

var root;

function insert_random(tree) {
  let x = random(width);
  let y = random(height / 2, height);
  let c = random([
    color(255, 0, 0),
    color(0, 255, 0),
    color(0, 0, 255),
  ]);
  
  tree.insert(x, y, c);
}

function setup() {
  createCanvas(500, 500);
  
  let big_rect = new Rectangle(0, 0, width, height);
  root = new Quadtree(big_rect);
  
  for (let i = 0; i < N; i++) {
    insert_random(root);
  }
}

 
function draw() {
  background(128);
  
  root.draw(true, false, false);
}
