export function openFirst(next, cancel) {
  const dialog = document.getElementById('dialog2');
  document.getElementById('next').onclick = next;
  document.getElementById('cancel2').onclick = cancel;
  dialog.showModal();
}