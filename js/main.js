// ===== 自動設定 BASE（唯一保留）=====
(function () {
  const base = document.getElementById('baseHref');
  if (!base) return;

  const { hostname, pathname } = location;

  if (hostname.includes('github.io')) {
    const parts = pathname.split('/').filter(Boolean);

    if (parts.length > 0) {
      base.setAttribute('href', '/' + parts[0] + '/');
    } else {
      base.setAttribute('href', '/');
    }

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

  if(hamburger && menu){

    // toggle
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      menu.classList.toggle('active');
    });

    // 🔥 點 menu 自動關閉
    document.querySelectorAll('#menu a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
      });
    });
  }
}

document.querySelectorAll('.menu a').forEach(link => {
  if (location.href.includes(link.getAttribute('href'))) {
    link.classList.add('active');
  }
});

// ===== 表單送出 → LINE =====
function submitForm(e){
  e.preventDefault();

  alert("已收到資料，將立即為您安排");

  setTimeout(()=>{
    window.location.href="https://line.me/R/ti/p/@205rzchp";
  },1500);
}

// ===== CTA 追蹤 =====
function track(type){
  console.log("CTA click:", type);
}



