export function openSecond() {
  const dialog = document.getElementById('dialog3');
  return new Promise(resolve => {
    document.getElementById('back').addEventListener('click', () => resolve('back'));
    document.getElementById('ok2').addEventListener('click', () => resolve('ok'));
    document.getElementById('cancel3').addEventListener('click', () => resolve('cancel'));
    dialog.showModal();
  });
}