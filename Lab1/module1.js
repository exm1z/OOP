export function openSlider(showResult) {
  const dialog = document.getElementById('dialog1');
  const slider = document.getElementById('slider');
  const number = document.getElementById('number');

  slider.oninput = () => number.textContent = slider.value;
  document.getElementById('saveNumber').onclick = () => {
    showResult(slider.value);
    dialog.close();
  };
  document.getElementById('cancel1').onclick = () => dialog.close();
  dialog.showModal();
}