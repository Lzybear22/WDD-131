const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav.links');
 
menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
  menuBtn.textContent = nav.classList.contains('open') ? 'Close' : 'Menu';
});
 
const modal = document.getElementById('img-modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.getElementById('modal-close');
 
document.querySelector('.gallery').addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    // Swap to the full-res version: replace "-sm" with "-full"
    const fullSrc = e.target.src.replace('-sm.jpg', '-full.jpg');
    modalImg.src = fullSrc;
    modalImg.alt = e.target.alt;
    modal.classList.add('open');
  }
});
 
function closeModal() {
  modal.classList.remove('open');
  modalImg.src = '';
}
 
closeBtn.addEventListener('click', closeModal);
 
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
 
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
 