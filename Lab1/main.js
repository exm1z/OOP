import { openSlider } from './module1.js';
import { openFirst } from './module2.js';
import { openSecond } from './module3.js';

function closeDialogs() {
  document.querySelectorAll('dialog').forEach(dialog => dialog.close());
}
function showResult(text) {
  document.getElementById('result').textContent = 'Результат: ' + text;
}
async function firstWindow() {
  let windowNumber = 1;
  while (true) {
    closeDialogs();
    const action = windowNumber === 1 ? await openFirst() : await openSecond();
    if (action === 'cancel') break;
    if (action === 'ok') {
      showResult('Робота 2 завершена');
      break;
    }
    windowNumber = action === 'next' ? 2 : 1;
  }
  closeDialogs();
}

document.getElementById('work1').addEventListener('click', () => {
  closeDialogs();
  openSlider(showResult);
});
document.getElementById('work2').addEventListener('click', firstWindow);