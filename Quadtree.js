class Quadtree {
  constructor(boundary, capacity=4) {
    // radius for displaying points
    this.POINT_RADIUS = 5;
    
    this.capacity = 4;
    // List of [x, y, color] triples
    this.points = [];
    this.children = null;
    this.boundary = boundary;
  }
  
  /**
   * Check if this tile contains more than the capacity.
   * This uses the recursive getter num_points so we can
   * check when a tile is no longer overfull on deletion
   * (this is the condition for consolidating a set of four tiles)
   */
  get is_overfull() {
    return this.num_points > this.capacity;
  }
  
  get is_leaf() {
    return this.children === null;
  }
  
  /**
   * Count how many points are contained in this quadtree node
   * by recursing down the tree.
   */
  get num_points() {
    if (this.is_leaf) {
      return this.points.length;
    } else {
      // Recurse and count up the points of each subtree
      let count = 0;
      for (let child of this.children) {
        count += child.num_points;
      }
      return count;
    }
  }
  
  /**
   * Insert a colored point at (x, y) into the quadtree
   */
  insert(x, y, point_color) {
    if (this.is_leaf) {
      // Add it to the point list
      this.points.push([x, y, point_color,]);
      
      // If we overfilled the tile, subdivide it into 4.
      if (this.is_overfull) {
        this.subdivide();
      }
      return true;
    } else {
      // Move down the tree until we find a leaf.
      for (let child of this.children) {
        if (child.contains(x, y)) {
          child.insert(x, y, point_color);
          return true;
        }
      }
      return false;
    }
  }
  
  contains(x, y) {
    return this.boundary.contains(x, y);
  }
  
  draw() {
    if (this.is_leaf) {
      fill(0, 0, 0, 0);
      stroke(0);
      this.boundary.draw();
      
      noStroke();
      for (let [x, y, c] of this.points) {
        fill(c);
        ellipse(x, y, 2 * this.POINT_RADIUS, 2 * this.POINT_RADIUS);
      }
    } else {
      
      noFill();
      stroke(0);
      this.boundary.draw();
      
      // Draw in depth-first order
      for (let child of this.children) {
        child.draw();
      }
    }
  }
}
