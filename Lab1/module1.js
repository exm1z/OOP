export function openSlider(showResult) {
  const dialog = document.getElementById('dialog1');
  const slider = document.getElementById('slider');
  const number = document.getElementById('number');

  slider.addEventListener('input', () => number.textContent = slider.value);
  document.getElementById('saveNumber').addEventListener('click', () => {
    showResult(slider.value);
    dialog.close();
  });
  document.getElementById('cancel1').addEventListener('click', () => dialog.close());
  dialog.showModal();
}