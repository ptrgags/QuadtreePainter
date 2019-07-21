/**
 * Rectangle, represents a cartesian product of 
 * two half-open intervals [left, right) x [top, bottom)
 */
class Rectangle {
  constructor(left, top, right, bottom) {
    // The left and top bounds are *inclusive*
    this.left = left;
    this.top = top;
    
    // The right and bottom bounds are *exclusive*
    this.right = right;
    this.bottom = bottom;
  }
  
  get width() {
    return this.right - this.left;
  }
  
  get height() {
    return this.bottom - this.top;
  }
  
  /*
   * Subdivide this rectangle into (nearly) equally-sized quarters.
   * This always returns the results in the order NW, NE, SW, SE.
   */ 
  subdivide() {
    let mid_x = floor((this.left + this.right) / 2);
    let mid_y = floor((this.top + this.bottom) / 2);
    
    let nw = new Rectangle(this.left, this.top, mid_x, mid_y);
    let ne = new Rectangle(mid_x, this.top, this.right, mid_y);
    let sw = new Rectangle(this.left, mid_y, mid_x, this.bottom);
    let se = new Rectangle(mid_x, mid_y, this.right, this.bottom);
    
    // The Processing editor still requires the trailing comma though it
    // looks ugly on one line like this :/
    return [nw, ne, sw, se,];
  }
  
  intersects(x, y) {
    return left <= x && x < right && top <= y && y < bottom;
  }
  
  /**
   * Draw the rectangle on the screen. This does not change
   * stroke/fill colors.
   */
  draw() {
    rect(this.left, this.top, this.width, this.height);
  }
}
