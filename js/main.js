// ===== 自動設定 BASE（唯一保留）=====
(function(){
  const base = document.getElementById('baseHref');
  if(!base) return;

  const { hostname, pathname } = location;

  if (hostname.includes('github.io')) {
    const repo = pathname.split('/')[1];
    base.setAttribute('href', '/' + repo + '/');
  } else {
    base.setAttribute('href', '/');
  }
})();

// ===== 共用元件載入（直接用相對路徑）=====
function loadComponent(path, targetId, callback){
  fetch(path)
    .then(res => {
      if(!res.ok) throw new Error(path + ' not found');
      return res.text();
    })
    .then(data => {
      const el = document.getElementById(targetId);
      if(el) el.innerHTML = data;
      if(callback) callback();
    })
    .catch(err => console.error(err));
}

// ✅ 不再用 BASE
loadComponent('components/header.html', 'header', initMenu);
loadComponent('components/floating-cta.html', 'floating-cta');

// ===== 漢堡 =====
function initMenu(){
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');

  if(!hamburger || !menu) return;

  // 🔥 強制初始化（關鍵）
  hamburger.classList.remove('active');
  menu.classList.remove('active');

  // toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
  });

  // 點 menu 關閉
  document.querySelectorAll('#menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      menu.classList.remove('active');
    });
  });
}

// ===== 表單送出 → LINE =====
function submitForm(e){
  e.preventDefault();

  alert("已收到資料，將立即為您安排");

  setTimeout(()=>{
    window.location.href="https://line.me/R/ti/p/@你的ID";
  },1500);
}

// ===== CTA 追蹤 =====
function track(type){
  console.log("CTA click:", type);
}

// ===== 滾動顯示 CTA =====
window.addEventListener('scroll', () => {
  const el = document.querySelector('.floating-cta');
  if(!el) return;

  el.style.display = window.scrollY > 300 ? 'flex' : 'none';
});

