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
        typingElement.textContent = currentRole.substring(0, charIndex-1);
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
    const isDark = document.body.classList.contains('dark');
    toggleDark.innerHTML = isDark
        ? '<span style="font-size: 1em; line-height: 1;">☀️</span>'
        : '<span style="font-size: 1em; line-height: 1;">🌙</span>';
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

// Mouse trail effect
const canvasTrail = document.getElementById("trailCanvas");
const ctxTrail = canvasTrail.getContext("2d");
const particles = [];

canvasTrail.width = window.innerWidth;
canvasTrail.height = window.innerHeight;

class TrailParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
        this.alpha = 1;
        this.decay = 0.015;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.decay;
        this.size = Math.max(0, this.size - 0.05);
    }

    draw() {
        ctxTrail.save();
        ctxTrail.globalAlpha = this.alpha;
        ctxTrail.fillStyle = this.color;
        ctxTrail.beginPath();
        ctxTrail.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctxTrail.fill();
        ctxTrail.restore();
    }
}

function handleParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].alpha <= 0 || particles[i].size <= 0) {
            particles.splice(i, 1);
        }
    }
}

function animateTrail() {
    ctxTrail.clearRect(0, 0, canvasTrail.width, canvasTrail.height);
    handleParticles();
    requestAnimationFrame(animateTrail);
}

window.addEventListener("mousemove", (e) => {
    const rect = canvasTrail.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    for (let i = 0; i < 3; i++) {
        particles.push(new TrailParticle(x, y));
    }
});

window.addEventListener("click", (e) => {
    const rect = canvasTrail.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    for (let i = 0; i < 15; i++) {
        particles.push(new TrailParticle(x, y));
    }
});

window.addEventListener("resize", () => {
    canvasTrail.width = window.innerWidth;
    canvasTrail.height = window.innerHeight;
});

// Initialize skill progress bars
function initSkills() {
    const skills = document.querySelectorAll('.skill');
    let delay = 0;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skill = entry.target;
                const level = skill.getAttribute('data-level');
                const progress = skill.querySelector('.skill-progress');

                setTimeout(() => {
                    progress.style.width = level + '%';
                }, delay);

                delay += 100; // Stagger the animations
                observer.unobserve(skill);
            }
        });
    }, {
        threshold: 0.5
    });

    skills.forEach(skill => {
        observer.observe(skill);

        // Add hover effect for skill details
        skill.addEventListener('mouseenter', () => {
            const level = skill.getAttribute('data-level');
            const progress = skill.querySelector('.skill-progress');
            progress.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
        });

        skill.addEventListener('mouseleave', () => {
            const progress = skill.querySelector('.skill-progress');
            progress.style.boxShadow = 'none';
        });
    });
}

animateTrail();
typeEffect();
initSkills();






const skills = [
    "React.js", "JavaScript", "TypeScript", "Redux", "Node.js", "MongoDB",
    "Tailwind CSS", "Material-UI", "AWS", "Docker", "Git", "Next.js",
    "Express.js", "HTML5", "CSS3", "Agile", "REST APIs", "CI/CD"
];

const radius = 150; // distance from center
const skillCloud = document.getElementById("skillCloud");
let angleX = Math.PI / 200;
let angleY = Math.PI / 200;
let mouseX = 0, mouseY = 0;

// Create skill elements
const tags = skills.map(text => {
    const el = document.createElement("span");
    el.textContent = text;
    skillCloud.appendChild(el);
    return { el };
});

// Position tags in sphere
function positionAll() {
    const length = tags.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
    tags.forEach((tag, i) => {
        const y = 1 - (i / (length - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = phi * i;
        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        tag.x = x * radius;
        tag.y = y * radius;
        tag.z = z * radius;
    });
}
positionAll();

// Rotate sphere
function rotate() {
    const cosX = Math.cos(angleX), sinX = Math.sin(angleX);
    const cosY = Math.cos(angleY), sinY = Math.sin(angleY);

    tags.forEach(tag => {
        // Rotate Y axis
        let x1 = tag.x * cosY - tag.z * sinY;
        let z1 = tag.x * sinY + tag.z * cosY;
        // Rotate X axis
        let y1 = tag.y * cosX - z1 * sinX;
        let z2 = tag.y * sinX + z1 * cosX;

        tag.x = x1;
        tag.y = y1;
        tag.z = z2;

        const scale = 500 / (500 - tag.z);
        const x = tag.x * scale + skillCloud.offsetWidth / 2;
        const y = tag.y * scale + skillCloud.offsetHeight / 2;

        tag.el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
        tag.el.style.zIndex = Math.floor(scale * 100);
        tag.el.style.opacity = scale / 2;
    });
}

function animateCloud() {
    rotate();
    requestAnimationFrame(animateCloud);
}
animateCloud();

// Mouse control
skillCloud.addEventListener("mousemove", (e) => {
    const rect = skillCloud.getBoundingClientRect();
    mouseX = (e.clientX - rect.left - rect.width / 2) / 200;
    mouseY = (e.clientY - rect.top - rect.height / 2) / 200;
    angleX = mouseY * 0.05;
    angleY = mouseX * 0.05;
});
