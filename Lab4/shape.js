class Shape {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1; this.y1 = y1;
    this.x2 = x2; this.y2 = y2;
  }
  Show() {}
}
class PointShape extends Shape {
  Show(draft = false) {
    ctx.beginPath();
    ctx.arc(this.x1, this.y1, 3, 0, 2 * Math.PI);
    if (draft) ctx.stroke();
    else {
      ctx.fillStyle = 'black';
      ctx.fill();
    }
  }
}
class LineShape extends Shape {
  Show() {
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
  }
}
class RectShape extends Shape {
  constructor(x1, y1, x2, y2, filled = true) {
    super(x1, y1, x2, y2);
    this.filled = filled;
  }
  Show(draft = false) {
    const x = Math.min(this.x1, this.x2);
    const y = Math.min(this.y1, this.y2);
    const w = Math.abs(this.x2 - this.x1);
    const h = Math.abs(this.y2 - this.y1);
    if (!draft && this.filled) {
      ctx.fillStyle = '#87cefa';
      ctx.fillRect(x, y, w, h);
    }
    ctx.strokeRect(x, y, w, h);
  }
}
class EllipseShape extends Shape {
  Show(draft = false) {
    const rx = Math.abs(this.x2 - this.x1);
    const ry = Math.abs(this.y2 - this.y1);
    if (!rx || !ry) return;
    ctx.beginPath();
    ctx.ellipse(this.x1, this.y1,
      rx, ry, 0, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

class CircleLineShape extends Shape {
  constructor(x1, y1, x2, y2) {
    super(x1, y1, x2, y2);
    this.line = new LineShape(x1, y1, x2, y2);
    this.circle1 = new EllipseShape(x1, y1, x1 + 6, y1 + 6);
    this.circle2 = new EllipseShape(x2, y2, x2 + 6, y2 + 6);
  }
  Show(draft = false) {
    this.line.Show(draft);
    this.circle1.Show(draft);
    this.circle2.Show(draft);
  }
}

class CubeShape extends Shape {
  constructor(x1, y1, x2, y2) {
    super(x1, y1, x2, y2);
    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);
    const s = Math.min(Math.abs(x2 - x1), Math.abs(y2 - y1)) * 0.8;
    const d = s / 4;
    this.rect1 = new RectShape(x, y + d, x + s, y + d + s, false);
    this.rect2 = new RectShape(x + d, y, x + d + s, y + s, false);
    this.lines = [
      new LineShape(x, y + d, x + d, y),
      new LineShape(x + s, y + d, x + d + s, y),
      new LineShape(x, y + d + s, x + d, y + s),
      new LineShape(x + s, y + d + s, x + d + s, y + s)
    ];
  }
  Show(draft = false) {
    this.rect1.Show(draft);
    this.rect2.Show(draft);
    this.lines.forEach(line => line.Show(draft));
  }
}