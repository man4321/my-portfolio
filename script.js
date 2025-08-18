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
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
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

const HeryPorterTheme = () => {
    const hpBtn = document.getElementById("hpThemeBtn");
    const body = document.body;

    // // Toggle theme
    // hpBtn.addEventListener("click", () => {
    //     body.classList.toggle("hp-theme");

    //     if (body.classList.contains("hp-theme")) {
    //         spawnCandles();
    //         spawnSnake();
    //     } else {
    //         document.querySelectorAll(".candle, .snake").forEach(el => el.remove());
    //     }
    // });

    // // Floating candles
    function spawnCandles() {
        for (let i = 0; i < 10; i++) {
            let candle = document.createElement("div");
            candle.className = "candle";
            candle.style.left = Math.random() * window.innerWidth + "px";
            candle.style.top = Math.random() * (window.innerHeight / 2) + "px";
            document.body.appendChild(candle);
        }
    }

    // // Snake slithering
    function spawnSnake() {
        let snake = document.createElement("img");
        snake.src = "https://upload.wikimedia.org/wikipedia/commons/7/7a/Snake_icon.svg"; // placeholder snake
        snake.className = "snake";
        document.body.appendChild(snake);
    }

    // Cursor sparks (wand effect)
    window.addEventListener("mousemove", (e) => {
        if (!body.classList.contains("hp-theme")) return;

        let spark = document.createElement("div");
        spark.className = "spark";
        spark.style.left = e.pageX + "px";
        spark.style.top = e.pageY + "px";
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 1000);
    });
    function spawnFireplace() {
        const fireplace = document.getElementById("fireplace");
        fireplace.innerHTML = ""; // reset
        for (let i = 0; i < 4; i++) {
            let flame = document.createElement("div");
            flame.className = "flame";
            fireplace.appendChild(flame);
        }
        fireplace.style.display = "block";
    }

    function removeFireplace() {
        const fireplace = document.getElementById("fireplace");
        fireplace.innerHTML = "";
        fireplace.style.display = "none";
    }

    hpBtn.addEventListener("click", () => {
        body.classList.toggle("hp-theme");

        if (body.classList.contains("hp-theme")) {
            spawnCandles();
            spawnSnake();
            spawnFireplace(); // 🔥 add fireplace
        } else {
            document.querySelectorAll(".candle, .snake").forEach(el => el.remove());
            removeFireplace();
        }
    });

}
HeryPorterTheme();
