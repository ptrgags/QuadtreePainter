const N = 100;

var root;
var components = {
  red: 1,
  green: 0,
  blue: 0,
};

var layers = {
  leaves: true,
  boundaries: true,
  points: true,
};

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

function reset() {
  let big_rect = new Rectangle(0, 0, width, height);
  root = new Quadtree(big_rect);
}

function setup() {
  createCanvas(500, 500);
  
  reset();
}

function draw() {
  background(128);
  
  root.draw(layers.leaves, layers.boundaries, layers.points);
  
  // Label the RGB components
  noStroke();
  fill(255);
  text(`RGB = (${components.red}, ${components.green}, ${components.blue})`, 10, 20);
}

function keyReleased() {
  console.log(key);
  switch (key) {
    case 'q':
      components.red = 1 - components.red;
      break;
    case 'w':
      components.green = 1 - components.green;
      break;
    case 'e':
      components.blue = 1 - components.blue;
      break;
    case '1':
      layers.leaves = !layers.leaves;
      break;
    case '2':
      layers.boundaries = !layers.boundaries;
      break;
    case '3':
      layers.points = !layers.points;
      break;
    case ' ':
      insert_random(root);
      break;
    case 'Escape':
      reset();
      break;
    default:
      break;
  }
}

function mouseReleased() {
  let c = color(
    components.red * 255, components.green * 255, components.blue * 255);
  root.insert(mouseX, mouseY, c);
}
