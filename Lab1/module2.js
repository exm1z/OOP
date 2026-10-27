export function openFirst() {
  const dialog = document.getElementById('dialog2');
  return new Promise(resolve => {
    document.getElementById('next').addEventListener('click', () => resolve('next'));
    document.getElementById('cancel2').addEventListener('click', () => resolve('cancel'));
    dialog.showModal();
  });
}