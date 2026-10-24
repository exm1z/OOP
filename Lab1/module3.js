export function openSecond() {
  const dialog = document.getElementById('dialog3');
  return new Promise(resolve => {
    document.getElementById('back').onclick = () => resolve('back');
    document.getElementById('ok2').onclick = () => resolve('ok');
    document.getElementById('cancel3').onclick = () => resolve('cancel');
    dialog.showModal();
  });
}