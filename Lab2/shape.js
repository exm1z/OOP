class Shape {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1; this.y1 = y1;
    this.x2 = x2; this.y2 = y2;
  }
  draw() {}
}
class Point extends Shape {
  draw() {
    ctx.beginPath();
    ctx.arc(this.x1, this.y1, 3, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
  }
}
class Line extends Shape {
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
  }
}
class Rectangle extends Shape {
  draw(draft = false) {
    const w = Math.abs(this.x2 - this.x1);
    const h = Math.abs(this.y2 - this.y1);
    if (!draft) {
      ctx.fillStyle = 'pink';
      ctx.fillRect(this.x1 - w, this.y1 - h, 2 * w, 2 * h);
    }
    ctx.strokeRect(this.x1 - w, this.y1 - h, 2 * w, 2 * h);
  }
}
class Ellipse extends Shape {
  draw(draft = false) {
    const rx = Math.abs(this.x2 - this.x1) / 2;
    const ry = Math.abs(this.y2 - this.y1) / 2;
    if (!rx || !ry) return;
    ctx.beginPath();
    ctx.ellipse((this.x1 + this.x2) / 2, (this.y1 + this.y2) / 2,
      rx, ry, 0, 0, 2 * Math.PI);
    if (!draft) {
      ctx.fillStyle = 'white';
      ctx.fill();
    }
    ctx.stroke();
  }
}