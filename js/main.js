document.addEventListener('DOMContentLoaded', () => {
    initClock();
    renderGarden();
    initLoveInteraction();
    initFallingBackground();
});

/* --- LOVE PROPOSAL INTERACTION --- */
function initLoveInteraction() {
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');

    if (!btnYes || !btnNo) return;

    // YES Button Click
    btnYes.addEventListener('click', () => {
        // Celebration!
        const content = document.querySelector('.love-content');
        content.innerHTML = `
            <h1 class="pixel-text" style="color: #d41e52; animation: bounce 1s infinite;">YAY! ❤</h1>
            <p style="margin-top: 10px;">Happy Valentine's Day!</p>
            <div class="cat-wrapper">
                <img src="assets/cat_heart.png" alt="Happy Cat" class="pixel-cat" style="animation: spin 1s infinite linear;">
            </div>
        `;

        // Add spin animation dynamically
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
            @keyframes spin { 100% { transform: rotate(360deg); } }
        `;
        document.head.appendChild(style);
    });

    // NO Button Runaway
    btnNo.addEventListener('mouseover', () => {
        const x = Math.random() * (window.innerWidth - btnNo.offsetWidth) - (window.innerWidth / 2);
        const y = Math.random() * (window.innerHeight - btnNo.offsetHeight) - (window.innerHeight / 2);

        // Keep it somewhat within the window if possible, or just move it randomly
        // Let's just translate it away from cursor
        const randomX = (Math.random() - 0.5) * 200;
        const randomY = (Math.random() - 0.5) * 200;

        btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });

    // Just in case they click it
    btnNo.addEventListener('click', () => {
        alert("Nice try! But you have to say YES! 🔫");
    });
}

/* --- FALLING BACKGROUND --- */
function initFallingBackground() {
    const assets = ['assets/Love.png', 'assets/flow1.png'];

    // Create a container for falling items so they don't clutter the body directly
    const container = document.createElement('div');
    container.className = 'falling-container';
    document.body.appendChild(container);

    setInterval(() => {
        const img = document.createElement('img');
        img.src = assets[Math.floor(Math.random() * assets.length)];
        img.className = 'falling-item';

        // Random Properties
        const startLeft = Math.random() * 100; // 0-100%
        const duration = Math.random() * 5 + 3; // 3-8s
        const size = Math.random() * 30 + 20; // 20-50px

        img.style.left = `${startLeft}vw`;
        img.style.animationDuration = `${duration}s`;
        img.style.width = `${size}px`;
        img.style.height = 'auto'; // Keep aspect ratio

        container.appendChild(img);

        // Cleanup
        setTimeout(() => {
            img.remove();
        }, duration * 1000);

    }, 500); // Spawn every 500ms
}

/* --- SYSTEM CLOCK --- */
function initClock() {
    const clockElement = document.getElementById('clock');
    if (!clockElement) return;

    function updateTime() {
        const now = new Date();
        // Format: 14:02 (matching reference) or user's local time
        let timeString = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        clockElement.textContent = timeString;
    }

    updateTime();
    setInterval(updateTime, 1000);
}

/* --- APP SWITCHER LOGIC --- */
window.openApp = function (appId) {
    // 1. Hide all apps first
    const apps = document.querySelectorAll('.app-screen');
    apps.forEach(app => app.classList.add('hidden'));

    // 2. Show the target app
    const targetApp = document.getElementById(appId);
    if (targetApp) {
        targetApp.classList.remove('hidden');

        // Simple pop animation
        targetApp.style.transform = "scale(0.95)";
        setTimeout(() => {
            targetApp.style.transform = "scale(1)";
        }, 100);
    }
}

window.minimizeApp = function () {
    // Hide all apps (return to "Desktop" state - or show Home if we treat Home as background)
    // If we want to show nothing, hide all. 
    // If we want to show 'Home' as default background, we could do that.
    // For now, let's just hide the current active one, revealing whatever is behind?
    // Actually, since they are stacked, hiding the top one reveals the next one?
    // Let's just hide all for simplicity, or maybe open 'app-home' if minimizing others?

    const apps = document.querySelectorAll('.app-screen');
    apps.forEach(app => app.classList.add('hidden'));

    // Optional: Show Home if nothing else is open?
    // const home = document.getElementById('app-home');
    // if(home) home.classList.remove('hidden');
}

/* --- GARDEN GENERATOR (Mock Data) --- */
function renderGarden() {
    const container = document.getElementById('garden-grid');
    if (!container) return;

    // Clear existing
    container.innerHTML = '';

    // Create Grid 7 rows x 20 cols
    const totalCells = 7 * 20;

    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.className = 'pixel-cell';

        // Random Green (Simulate Commit)
        // 70% Empty, 30% Activity
        if (Math.random() > 0.7) {
            const level = Math.floor(Math.random() * 4) + 1; // 1-4
            cell.classList.add(`l${level}`); // l1, l2, l3, l4 defined in css
        } else {
            cell.style.backgroundColor = "#eee"; // Empty
        }

        container.appendChild(cell);
    }
}
