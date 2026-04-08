// js/menu.js

export function initMenu(){
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');

  if(!hamburger || !menu) return;

  // 初始化
  hamburger.classList.remove('active');
  menu.classList.remove('active');

  hamburger.onclick = () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');

    document.body.classList.toggle('menu-open');
  };

  // 點擊關閉
  document.querySelectorAll('#menu a').forEach(link=>{
    link.onclick = ()=>{
      hamburger.classList.remove('active');
      menu.classList.remove('active');
      document.body.classList.remove('menu-open');
    };
  });
}