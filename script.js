window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const intro = document.getElementById('intro-screen');
        const welcome = document.getElementById('welcome-screen');
        intro.style.opacity = '0';
        setTimeout(() => {
            intro.style.display = 'none';
            welcome.classList.remove('hidden-fade');
        }, 800);
    }, 1500);
});

document.getElementById('open-btn').addEventListener('click', function() {
    const welcome = document.getElementById('welcome-screen');
    const stage = document.getElementById('main-stage');
    const flap = document.querySelector('.flap');
    const card = document.getElementById('invitation-card');
    const envelope = document.getElementById('envelope');
    const music = document.getElementById('bg-music');

    welcome.style.opacity = '0';
    setTimeout(() => {
        welcome.style.display = 'none';
        stage.classList.remove('hidden');
        music.play().catch(() => {});
        setTimeout(() => {
            flap.style.transform = "rotateX(180deg)";
            flap.style.zIndex = "1";
            setTimeout(() => {
                card.classList.add('extract-card');
                setTimeout(() => {
                    envelope.style.opacity = '0';
                    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
                    setTimeout(() => envelope.style.display = 'none', 1000);
                }, 1000);
            }, 600);
        }, 500);
    }, 400);
});

const targetDate = new Date(2026, 3, 19, 20, 0, 0).getTime();
setInterval(() => {
    const diff = targetDate - new Date().getTime();
    if (diff <= 0) {
        document.getElementById('timer').innerText = "È ORA DI FESTEGGIARE!";
        return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('timer').innerText = `${d}g ${h}o ${m}m ${s}s`;
}, 1000);

const vOverlay = document.getElementById('video-overlay');
const vPlayer = document.getElementById('invitation-video');
const bgMusic = document.getElementById('bg-music');

document.getElementById('view-video-btn').addEventListener('click', () => {
    vOverlay.classList.add('active');
    bgMusic.pause();
    vPlayer.load();
    vPlayer.play().catch(e => console.log("Errore video:", e));
});

document.getElementById('close-video').addEventListener('click', () => {
    vOverlay.classList.remove('active');
    vPlayer.pause();
    vPlayer.currentTime = 0;
    bgMusic.play();
});

vOverlay.addEventListener('click', (e) => {
    if (e.target === vOverlay) document.getElementById('close-video').click();
});