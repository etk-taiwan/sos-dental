// CTA click tracking（未來可串 GA）
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    console.log('CTA Click:', btn.innerText);
  });
});


// 表單驗證
function validateForm(form) {
  const name = form.querySelector('[name="name"]').value.trim();
  const contact = form.querySelector('[name="contact"]').value.trim();

  if (!name || !contact) {
    alert("請填寫姓名與聯絡方式");
    return false;
  }

  return true;
}


// 模擬送出（可改 fetch API）
function submitForm(e) {
  e.preventDefault();

  const form = e.target;

  if (!validateForm(form)) return;

  alert("已送出，我們將盡快聯絡您");

  form.reset();
}


// 案例滑動優化（滑鼠拖曳）
const sliders = document.querySelectorAll('.cases');

sliders.forEach(slider => {
  let isDown = false;
  let startX, scrollLeft;

  slider.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => isDown = false);
  slider.addEventListener('mouseup', () => isDown = false);

  slider.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
});

// 載入 header
fetch('/components/header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;

    // ⚠️ 載入後再綁事件（重要）
    initMenu();
  });

function initMenu(){
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');

  if(hamburger){
    hamburger.addEventListener('click', () => {
      menu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }
}