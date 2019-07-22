class Quadtree {
  constructor(boundary, capacity=4) {
    // radius for displaying points
    this.POINT_RADIUS = 3;
    
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
   * Average the colors of the points stored at this node.
   * this only makes sense to call on leaves, but it won't
   * break on interior nodes.
   */
  get color() {
    if (this.points.length === 0) {
      return color(0, 0, 0, 0);
    }
    
    // Average the colors of all points in this tile.
    let r_total = 0;
    let g_total = 0;
    let b_total = 0;
    let count = 0;
    for (let [, , c] of this.points) {
      r_total += red(c);
      g_total += green(c);
      b_total += blue(c);
      count++;
    }
    return color(
      r_total / count, 
      g_total / count, 
      b_total / count); 
  }
  
  /**
   * Insert a colored point at (x, y) into the quadtree
   */
  insert(x, y, point_color) {
    if (this.is_leaf) {
      // Add it to the point list
      // TODO: If a point already exists at this x and y, don't re-add
      // else we reach infinite recursion
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
  
  /**
   * Subdivide an overfull node into four smaller nodes
   */
  subdivide() {
    // Subdivide the boundary and make 4 subtrees, one per
    // sub-boundary.
    let sub_boundaries = this.boundary.subdivide();
    this.children = sub_boundaries.map((b) => 
      new Quadtree(b, this.capacity));
    
    // Since there are only 4 subtrees, all leaves,
    // this runs in O(4n) time where n is the number of
    // points in the original overfull node.
    for (let [x, y, c] of this.points) {
      
      // For each point, try each subtree and see if
      // we can insert it. Stop on the first valid insertion.
      for (let child of this.children) {
        if (child.contains(x, y)) {
          child.insert(x, y, c);
          break;
        }
      }
    }
    
    // Finally, clear the points list since we've moved
    // all the points down the tree.
    this.points = [];
  }
  
  erase_leaf(x, y) {
    if (this.is_leaf) {
      this.points = [];
    } else {
      for (let child of this.children) {
        if (child.contains(x, y)) {
          child.erase_leaf(x, y);
          break;
        }
      }
      
      if (!this.is_overfull) {
        this.points = [];
        for (let child of this.children) {
          this.points = this.points.concat(child.points);
        }
        this.children = null;
      }
    }
  }
  
  contains(x, y) {
    return this.boundary.contains(x, y);
  }
  
  draw_leaves() {
    if (this.is_leaf) {
      fill(this.color);
      noStroke();
      this.boundary.draw();
    } else {
      for (let child of this.children) {
        child.draw_leaves();
      }
    }
  }
  
  draw_boundaries() {
    noFill();
    stroke(0);
    this.boundary.draw();
    
    if (!this.is_leaf) {
      for (let child of this.children) {
        child.draw_boundaries();
      }
    }
  }
  
  draw_points() {
    if (this.is_leaf) {
      stroke(0);
      for (let [x, y, c] of this.points) {
        fill(c);
        ellipse(x, y, 2 * this.POINT_RADIUS, 2 * this.POINT_RADIUS);
      }
    } else {
      for (let child of this.children) {
        child.draw_points();
      }
    }
  }
  
  
  /**
   * Draw the root of the tree in layers (leaf backgrounds, boundaries, then points)
   */
  draw(leaves=true, boundaries=true, points=true) {
    if (leaves) {
      this.draw_leaves();
    }
    if (boundaries) {
      this.draw_boundaries();
    }
    if (points) {
      this.draw_points();
    }
  }
}
