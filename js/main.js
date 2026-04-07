// ===== Header載入 =====
const BASE = location.pathname.split('/')[1]
  ? '/' + location.pathname.split('/')[1] + '/'
  : '/';

fetch(BASE + 'components/header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
    initMenu();
  });



// ===== 漢堡 =====
function initMenu(){
  const hamburger=document.getElementById('hamburger');
  const menu=document.getElementById('menu');

  if(hamburger){
    hamburger.addEventListener('click',()=>{
      menu.classList.toggle('active');
    });
  }
}

// ===== 表單送出 → LINE =====
function submitForm(e){
  e.preventDefault();

  alert("已收到資料，將立即為您安排");

  setTimeout(()=>{
    window.location.href="https://line.me/R/ti/p/@你的ID";
  },1500);
}

// ===== 載入 Floating CTA =====
fetch(BASE + 'components/floating-cta.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('floating-cta').innerHTML = data;
  });

/* ===== 追蹤（可接 GA） ===== */
function track(type){
  console.log("CTA click:", type);
}

window.addEventListener('scroll', () => {
  const el = document.querySelector('.floating-cta');
  if(window.scrollY > 300){
    el.style.display = 'flex';
  } else {
    el.style.display = 'none';
  }
});