const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let rects = [];
let c1 = {
  x: 100,
  y: 100,
  w: 50,
  h: 50,
  color: "rgba(0, 150, 200, 1)",
  dx: 2 // for auto-move
};

function rect(obj) {
  ctx.fillStyle = obj.color;
  ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
}

// Add shape on click
canvas.onclick = function (event) {
  c1.x = event.offsetX;
  c1.y = event.offsetY;
  rects.push({ ...c1 });
};

// Move with arrow keys
document.onkeydown = function (event) {
  const step = 10;
  if (event.key === "ArrowUp") c1.y -= step;
  else if (event.key === "ArrowDown") c1.y += step;
  else if (event.key === "ArrowLeft") c1.x -= step;
  else if (event.key === "ArrowRight") c1.x += step;
};

// Mouse move controls size and alpha
canvas.onmousemove = function (event) {
  let size = Math.max(10, event.offsetX / 5);
  let alpha = Math.min(1, event.offsetY / canvas.height);
  c1.w = c1.h = size;
  c1.color = `rgba(0, 150, 200, ${alpha.toFixed(2)})`;
};

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Auto-move
  c1.x += c1.dx;
  if (c1.x + c1.w > canvas.width || c1.x < 0) {
    c1.dx *= -1; // reverse direction
  }

  rect(c1);
  rects.forEach(r => rect(r));

  requestAnimationFrame(update);
}

update();
