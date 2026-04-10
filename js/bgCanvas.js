const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
const PARTICLE_COUNT = 35;
const CONNECT_DISTANCE = 150;

function resizeCanvas() {
  const hero = document.querySelector(".hero");
  canvas.width = hero.offsetWidth;
  canvas.height = hero.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// 粒子
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;

    this.size = Math.random() * 2 + 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
    if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
  }

  draw() {
    ctx.fillStyle = "rgba(195,167,104,0.8)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }
}

// 連線
function drawLines() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {

      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CONNECT_DISTANCE) {
        let opacity = 1 - dist / CONNECT_DISTANCE;

        ctx.strokeStyle = `rgba(195,167,104,${opacity * 0.15})`;
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

// 波浪
let time = 0;
function drawWave() {
  ctx.beginPath();

  for (let x = 0; x < canvas.width; x++) {
    let y =
    canvas.height * 0.8 + 
    Math.sin(x * 0.01 + time) * 15;

    ctx.lineTo(x, y);
  }

  ctx.strokeStyle = "rgba(195,167,104,0.12)";
  ctx.lineWidth = 2;
  ctx.stroke();

  time += 0.02;
}

// 動畫
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  drawLines();
  drawWave();

  requestAnimationFrame(animate);
}

init();
animate();