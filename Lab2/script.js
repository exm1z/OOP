const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const shapes = [];
const limit = 121;
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
  shapes.forEach(shape => shape.draw());
  if (preview) {
    ctx.strokeStyle = 'red';
    preview.draw(true);
  }
  document.title = `Lab2 — ${type}`;
  document.getElementById('status').textContent =
    `Обрано: ${type} | Об’єктів: ${shapes.length}/${limit}`;
}
function mouse(e) {
  const r = canvas.getBoundingClientRect();
  return {
    x: (e.clientX - r.left) * canvas.width / r.width,
    y: (e.clientY - r.top) * canvas.height / r.height
  };
}

canvas.addEventListener('pointerdown', e => {
  if (e.button !== 0) return;
  if (shapes.length >= limit) {
    alert('Максимум 121 об’єкт!');
    return;
  }
  const p = mouse(e);
  if (type === 'Крапка') {
    shapes.push(createShape(p.x, p.y, p.x, p.y));
    drawAll();
    return;
  }
  start = p;
  preview = createShape(p.x, p.y, p.x, p.y);
  canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener('pointermove', e => {
  if (!start) return;
  const p = mouse(e);
  preview = createShape(start.x, start.y, p.x, p.y);
  drawAll();
});
canvas.addEventListener('pointerup', e => {
  if (!start) return;
  const p = mouse(e);
  shapes.push(createShape(start.x, start.y, p.x, p.y));
  start = null;
  preview = null;
  drawAll();
});
canvas.addEventListener('pointercancel', () => {
  start = null;
  preview = null;
  drawAll();
});

document.querySelectorAll('[data-shape]').forEach(button => {
  button.addEventListener('click', () => {
    type = button.dataset.shape;
    start = null;
    preview = null;
    document.querySelectorAll('[data-shape]').forEach(b =>
      b.classList.toggle('active', b === button));
    document.querySelectorAll('details').forEach(menu => menu.open = false);
    drawAll();
  });
});
document.querySelector('[data-shape="Крапка"]').classList.add('active');

document.getElementById('clear').addEventListener('click', () => {
  shapes.length = 0;
  start = null;
  preview = null;
  drawAll();
});
document.getElementById('save').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'Lab2.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
document.getElementById('about').addEventListener('click', () =>
  alert('Lab2 — графічний редактор. Варіант 21.'));

drawAll();