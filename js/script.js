const carousel = document.getElementById('carousel');
const container = document.querySelector('.carousel-container');

let isDragging = false;
let startX = 0;
let currentRotation = 0;
let targetRotation = 0;
let velocity = 0;
let animationFrame;
let lastX = 0;
let lastTime = 0;

const MAX_SPEED = 0.3;
const ANGLE_PER_ITEM = 45;
const FRICTION = 0.95;

container.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
    startX = e.clientX;
    lastX = e.clientX;
    lastTime = Date.now();
    velocity = 0;
    container.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const currentX = e.clientX;
    const deltaX = currentX - lastX;
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTime;

    if (deltaTime > 0) {
        let rawVelocity = (deltaX / deltaTime) * 15;
        velocity = Math.max(Math.min(rawVelocity, MAX_SPEED), -MAX_SPEED);

        targetRotation += velocity * 2;
    }

    lastX = currentX;
    lastTime = currentTime;
});

window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    container.style.cursor = 'grab';
});


function animate() {
    currentRotation += (targetRotation - currentRotation) * 0.08;

    if (!isDragging && Math.abs(velocity) > 0.01) {
        targetRotation += velocity * 2;
        velocity *= FRICTION;
        if (Math.abs(velocity) > MAX_SPEED) {
            velocity = velocity > 0 ? MAX_SPEED : -MAX_SPEED;
        }
    }

    carousel.style.transform = `rotateY(${currentRotation}deg)`;

    animationFrame = requestAnimationFrame(animate);
}

animate();