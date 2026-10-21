import { openSlider } from './module1.js';
import { openFirst } from './module2.js';
import { openSecond } from './module3.js';

function closeDialogs() {
  document.querySelectorAll('dialog').forEach(dialog => dialog.close());
}
function showResult(text) {
  document.getElementById('result').textContent = 'Результат: ' + text;
}
function firstWindow() {
  closeDialogs();
  openFirst(secondWindow, closeDialogs);
}
function secondWindow() {
  closeDialogs();
  openSecond(firstWindow, () => {
    showResult('Робота2 завершена');
    closeDialogs();
  }, closeDialogs);
}

document.getElementById('work1').onclick = () => {
  closeDialogs();
  openSlider(showResult);
};
document.getElementById('work2').onclick = firstWindow;