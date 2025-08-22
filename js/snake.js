// Modern Snake game for landing page
// Uses HTML5 canvas to render a detailed snake experience

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('snake-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const size = 20; // size of a grid square
  const tileCount = canvas.width / size;
  let snake = [{ x: 10, y: 10 }];
  let velocity = { x: 1, y: 0 };
  let food = randomPosition();
  let score = 0;
  const scoreEl = document.getElementById('snake-score');

  function randomPosition() {
    return {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  }

  function collision(pos) {
    return snake.some(segment => segment.x === pos.x && segment.y === pos.y);
  }

  function reset() {
    snake = [{ x: 10, y: 10 }];
    velocity = { x: 1, y: 0 };
    food = randomPosition();
    score = 0;
    scoreEl.textContent = score;
  }

  function update() {
    const head = {
      x: snake[0].x + velocity.x,
      y: snake[0].y + velocity.y
    };

    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= tileCount ||
      head.y >= tileCount ||
      collision(head)
    ) {
      reset();
      return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score++;
      scoreEl.textContent = score;
      food = randomPosition();
    } else {
      snake.pop();
    }
  }

  function draw() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0e0e0e');
    gradient.addColorStop(1, '#232323');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw grid
    ctx.strokeStyle = '#1a1a1a';
    for (let i = 0; i < tileCount; i++) {
      ctx.beginPath();
      ctx.moveTo(i * size, 0);
      ctx.lineTo(i * size, canvas.height);
      ctx.moveTo(0, i * size);
      ctx.lineTo(canvas.width, i * size);
      ctx.stroke();
    }

    // draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#76ff03' : '#b2ff59';
      ctx.strokeStyle = '#33691e';
      ctx.fillRect(segment.x * size + 1, segment.y * size + 1, size - 2, size - 2);
      ctx.strokeRect(segment.x * size + 0.5, segment.y * size + 0.5, size - 1, size - 1);
    });

    // draw food
    const fx = food.x * size + size / 2;
    const fy = food.y * size + size / 2;
    const foodGradient = ctx.createRadialGradient(fx, fy, 2, fx, fy, size / 2);
    foodGradient.addColorStop(0, '#ff8a80');
    foodGradient.addColorStop(1, '#ff1744');
    ctx.fillStyle = foodGradient;
    ctx.beginPath();
    ctx.arc(fx, fy, size / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
  }

  function gameLoop() {
    update();
    draw();
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' && velocity.x !== 1) velocity = { x: -1, y: 0 };
    if (event.key === 'ArrowUp' && velocity.y !== 1) velocity = { x: 0, y: -1 };
    if (event.key === 'ArrowRight' && velocity.x !== -1) velocity = { x: 1, y: 0 };
    if (event.key === 'ArrowDown' && velocity.y !== -1) velocity = { x: 0, y: 1 };
  });

  setInterval(gameLoop, 150);
});
