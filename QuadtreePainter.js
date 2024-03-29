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
  let y = random(height);
  let c = color(
    random(255),
    random(255),
    random(255));
  
  tree.insert(x, y, c);
}

function reset() {
  let big_rect = new Rectangle(0, 0, width, height);
  root = new Quadtree(big_rect);
}

function setup() {
  c = createCanvas(500, 500);
  c.parent('canvas-container');
  
  reset();
}

function get_selected_color() {
  return color(
      components.red * 255, 
      components.green * 255, 
      components.blue * 255);
}

function draw() {
  background(64);
  
  root.draw(layers.leaves, layers.boundaries, layers.points);
  
  // Label the RGB components
  stroke(0);
  fill(get_selected_color());
  text(`RGB = (${components.red}, ${components.green}, ${components.blue})`, 10, 20);
}

function keyReleased() {
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
    case 'p':
      saveCanvas('screenshot', 'png');
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
    case 'Enter':
      insert_random(root);
      return false;
    case 'Escape':
      reset();
      break;
    default:
      break;
  }
  return true;
}

function mouseReleased(e) {
  if (e.ctrlKey) {
    root.erase_leaf(mouseX, mouseY);
    return false;
  } else {
    let c = color(
      components.red * 255, components.green * 255, components.blue * 255);
    root.insert(mouseX, mouseY, c);
    return false;
  }
  return true;
}
