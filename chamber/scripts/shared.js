// Shared by every page: mobile menu + footer dates
const menuBtn = document.querySelector('#menu-btn');
const navList = document.querySelector('#nav-list');
if (menuBtn && navList) {
  menuBtn.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.textContent = open ? '✕' : '☰';
  });
}
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;
