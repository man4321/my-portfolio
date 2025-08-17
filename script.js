const roles = [
    "Frontend Engineer",
    "React.js Developer",
    "JavaScript Enthusiast",
    "Problem Solver",
    "Tech Explorer"
];

const typingElement = document.querySelector(".typing");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500); // pause longer before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500); // pause before typing next role
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100); // slightly faster typing
    }
}

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dark mode toggle
const toggleDark = document.getElementById('toggleDark');
toggleDark.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleDark.textContent = document.body.classList.contains('dark') ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Scroll animations
const sections = document.querySelectorAll("section");
const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < triggerBottom) {
            sec.classList.add("visible");
        }
    });
};
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particlesArray;
const mouse = { x: null, y: null, radius: 120 };

window.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.x - rect.left;
    mouse.y = event.y - rect.top;
});

function resizeCanvas() {
    canvas.width = header.offsetWidth;
    canvas.height = header.offsetHeight;
}
const header = document.querySelector("header");
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Particle object
class Particle {
    constructor(x, y, dx, dy, size) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.fill();
    }
    update() {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) this.dx = -this.dx;
        if (this.y + this.size > canvas.height || this.y - this.size < 0) this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

// Create particles
function initParticles() {
    particlesArray = [];
    const numParticles = Math.min(100, Math.floor((canvas.width * canvas.height) / 9000)); // Limit max particles
    for (let i = 0; i < numParticles; i++) {
        let size = Math.random() * 1 + 1; // Random size between 1-2
        let x = Math.random() * (canvas.width - size * 2) + size;
        let y = Math.random() * (canvas.height - size * 2) + size;
        let dx = (Math.random() - 0.5) * 1;
        let dy = (Math.random() - 0.5) * 1;
        particlesArray.push(new Particle(x, y, dx, dy, size));
    }
}
initParticles();

// Connect particles with lines
function connectParticles() {
    const maxDistance = (canvas.width / 7) * (canvas.height / 7);
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 1;

    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = dx * dx + dy * dy;

            if (distance < maxDistance) {
                let opacity = 1 - (distance / maxDistance);
                ctx.strokeStyle = `rgba(255,255,255,${opacity * 0.2})`;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animate
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        let dx = mouse.x - particlesArray[i].x;
        let dy = mouse.y - particlesArray[i].y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
            ctx.strokeStyle = "rgba(255,255,255,0.6)";
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(particlesArray[i].x, particlesArray[i].y);
            ctx.stroke();
        }
    }
    connectParticles();
    requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

typeEffect();
