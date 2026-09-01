// =========================================================
// THEME TOGGLE (padrão é escuro; clique liga o modo claro)
// =========================================================
const themeToggle = document.getElementById('themeToggle');
const THEME_KEY = 'portfolio-theme';

function applyTheme(isLight){
  document.documentElement.classList.toggle('light', isLight);
  themeToggle.setAttribute('aria-pressed', isLight);
}
function storeTheme(value){
  try{ localStorage.setItem(THEME_KEY, value); }
  catch(e){ /* localStorage indisponível, ignora */ }
}

themeToggle.addEventListener('click', ()=>{
  const isLight = !document.documentElement.classList.contains('light');
  applyTheme(isLight);
  storeTheme(isLight ? 'light' : 'dark');
});

// =========================================================
// HEADER SCROLL STATE + BOTÃO VOLTAR AO TOPO
// =========================================================
const header = document.getElementById('siteHeader');
const toTop = document.getElementById('toTop');

window.addEventListener('scroll', ()=>{
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 30);
  toTop.classList.toggle('show', y > 600);
});
toTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

// =========================================================
// MENU MOBILE
// =========================================================
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuBackdrop = document.getElementById('menuBackdrop');

function closeMobileMenu(){
  mobileMenu.classList.remove('open');
  menuBackdrop.classList.remove('open');
  burgerBtn.classList.remove('active');
  burgerBtn.setAttribute('aria-expanded', false);
  document.body.style.overflow = '';
}

burgerBtn.addEventListener('click', ()=>{
  const open = mobileMenu.classList.toggle('open');
  menuBackdrop.classList.toggle('open', open);
  burgerBtn.classList.toggle('active', open);
  burgerBtn.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
menuBackdrop.addEventListener('click', closeMobileMenu);
mobileMenu.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click', closeMobileMenu);
});

// =========================================================
// TERMINAL — efeito de digitação (único momento de animação
// orquestrado do site). Respeita prefers-reduced-motion: se
// a pessoa preferir menos movimento, o conteúdo já escrito no
// HTML permanece visível e nada é animado.
// =========================================================
function initTerminal(){
  const root = document.getElementById('terminal');
  if(!root) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion) return;

  const typedEls = root.querySelectorAll('[data-typed]');
  const revealEls = root.querySelectorAll('[data-reveal]');

  typedEls.forEach(el=>{
    el.dataset.full = el.textContent;
    el.textContent = '';
  });
  revealEls.forEach(el=>{
    el.style.opacity = '0';
  });

  function wait(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function typeInto(el, speed){
    const full = el.dataset.full || '';
    for(let i = 0; i < full.length; i++){
      el.textContent += full[i];
      await wait(speed);
    }
  }

  function reveal(el){
    el.style.transition = 'opacity .3s ease';
    el.style.opacity = '1';
  }

  async function run(){
    await wait(500);
    await typeInto(typedEls[0], 55);   // "whoami"
    await wait(250);
    reveal(revealEls[0]);              // "Phietro Gabriel"
    await wait(500);
    await typeInto(typedEls[1], 32);   // "cat foco.txt"
    await wait(250);
    reveal(revealEls[1]);              // linha de cargo/foco
    await wait(150);
    reveal(revealEls[2]);              // linha de localização
  }
  run();
}
initTerminal();