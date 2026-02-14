document.addEventListener('DOMContentLoaded', () => {
    initClock();
    renderGarden();

    // Optional: Add a simple heartbeat animation to the "Be mine..." text
    const subtitle = document.querySelector('.window-subtitle');
    if (subtitle) {
        setInterval(() => {
            subtitle.style.transform = 'scale(1.1)';
            setTimeout(() => {
                subtitle.style.transform = 'scale(1)';
            }, 200);
        }, 1000);
    }
});

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
