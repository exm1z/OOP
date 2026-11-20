const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const shapes = Array(122).fill(null);
const limit = 122;
let count = 0;
let type = 'Крапка';
let start = null;
let preview = null;

function createShape(x1, y1, x2, y2) {
  if (type === 'Крапка') return new Point(x1, y1, x2, y2);
  if (type === 'Лінія') return new Line(x1, y1, x2, y2);
  if (type === 'Прямокутник') return new Rectangle(x1, y1, x2, y2);
  return new Ellipse(x1, y1, x2, y2);
}

function drawAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  for (let i = 0; i < count; i++) shapes[i].draw();
  if (preview) {
    ctx.strokeStyle = 'blue';
    ctx.setLineDash([]);
    preview.draw(true);
  }
  document.getElementById('status').textContent =
    `Обрано: ${type} | Об’єктів: ${count}/${limit}`;
}

function mouse(e) {
  const r = canvas.getBoundingClientRect();
  return {
    x: (e.clientX - r.left) * canvas.width / r.width,
    y: (e.clientY - r.top) * canvas.height / r.height
  };
}

class Editor {
  constructor() {
    canvas.addEventListener('pointerdown', this.pointerDown.bind(this));
    canvas.addEventListener('pointermove', this.pointerMove.bind(this));
    canvas.addEventListener('pointerup', this.pointerUp.bind(this));
    canvas.addEventListener('pointercancel', this.pointerCancel.bind(this));
    document.querySelectorAll('[data-shape]').forEach(button =>
      button.addEventListener('click', this.selectShape.bind(this)));
    document.getElementById('clear').addEventListener('click', this.clear.bind(this));
    document.getElementById('save').addEventListener('click', this.save.bind(this));
    document.getElementById('about').addEventListener('click', this.about.bind(this));
    document.querySelectorAll('details').forEach(menu =>
      menu.addEventListener('toggle', this.onNotify.bind(this)));
    document.querySelectorAll('[data-shape="Крапка"]').forEach(button =>
      button.classList.add('active'));
    drawAll();
  }

  pointerDown(e) {
    if (e.button !== 0) return;
    if (count >= limit) {
      alert('Максимум 122 об’єкти!');
      return;
    }
    const p = mouse(e);
    if (type === 'Крапка') {
      shapes[count++] = createShape(p.x, p.y, p.x, p.y);
      drawAll();
      return;
    }
    start = p;
    preview = createShape(p.x, p.y, p.x, p.y);
    canvas.setPointerCapture(e.pointerId);
  }

  pointerMove(e) {
    if (!start) return;
    const p = mouse(e);
    preview = createShape(start.x, start.y, p.x, p.y);
    drawAll();
  }

  pointerUp(e) {
    if (!start) return;
    const p = mouse(e);
    shapes[count++] = createShape(start.x, start.y, p.x, p.y);
    start = null;
    preview = null;
    drawAll();
  }

  pointerCancel() {
    start = null;
    preview = null;
    drawAll();
  }

  selectShape(e) {
    type = e.currentTarget.dataset.shape;
    start = null;
    preview = null;
    document.querySelectorAll('[data-shape]').forEach(button =>
      button.classList.toggle('active', button.dataset.shape === type));
    document.querySelectorAll('details').forEach(menu => menu.open = false);
    drawAll();
  }

  onNotify(e) {
    const menu = e.currentTarget;
    if (menu.open && menu.querySelector('summary').textContent === 'Об’єкти') {
      document.querySelectorAll('.menu [data-shape]').forEach(button =>
        button.classList.toggle('active', button.dataset.shape === type));
    }
  }

  clear() {
    shapes.fill(null);
    count = 0;
    start = null;
    preview = null;
    drawAll();
  }

  save() {
    const link = document.createElement('a');
    link.download = 'Lab3.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  about() {
    alert('Lab3 — графічний редактор. Варіант 22.');
  }
}

new Editor();