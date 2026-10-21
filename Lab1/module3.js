export function openSecond(back, ok, cancel) {
  const dialog = document.getElementById('dialog3');
  document.getElementById('back').onclick = back;
  document.getElementById('ok2').onclick = ok;
  document.getElementById('cancel3').onclick = cancel;
  dialog.showModal();
}