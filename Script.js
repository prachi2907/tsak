const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
let stopAnimation = false;



canvas.width = window.innerWidth ; 
canvas.height = window.innerHeight; 

const object = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 30,
    dx: 5, // Horizontal velocity
    dy: 5, // Vertical velocity
    color: randomColor(),
    
};

function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function drawObject() {
    ctx.beginPath();
    ctx.arc(object.x, object.y, object.radius, 0, Math.PI * 2);
    ctx.fillStyle = object.color;
    ctx.fill();
    ctx.closePath();
}

function updateObjectPosition() {
    object.x += object.dx;
    object.y += object.dy;

    // Check for collisions with canvas boundaries
    if (object.y + object.radius > canvas.height || object.y - object.radius < 0 || object.x + object.radius > canvas.width || object.x - object.radius < 0) {
        object.dy = -object.dy;
        object.color = randomColor();
    }
    if (object.x + object.radius > canvas.width || object.x - object.radius < 0  ) {
        object.dx = -object.dx;
        object.color = randomColor();
    }
    
}



function animate() {
    if(!stopAnimation){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawObject();
    updateObjectPosition();
    requestAnimationFrame(animate);
    }
    else {
        // Animation is paused; do nothing until it's resumed
        requestAnimationFrame(animate);
    }
}

canvas.addEventListener('mouseenter', () => {
    stopAnimation = true;
});

canvas.addEventListener('mouseleave', () => {
    stopAnimation = false;
    animate();
});

animate();
