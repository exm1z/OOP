export function openFirst() {
  const dialog = document.getElementById('dialog2');
  return new Promise(resolve => {
    document.getElementById('next').onclick = () => resolve('next');
    document.getElementById('cancel2').onclick = () => resolve('cancel');
    dialog.showModal();
  });
}