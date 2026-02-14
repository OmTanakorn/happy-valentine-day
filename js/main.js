/*
 *         ♥♥♥♥          ♥♥♥♥
 *       ♥♥♥♥♥♥♥♥      ♥♥♥♥♥♥♥♥
 *     ♥♥♥♥♥♥♥♥♥♥♥♥  ♥♥♥♥♥♥♥♥♥♥♥♥
 *     ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
 *      ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
 *        ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
 *          ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
 *            ♥♥♥♥♥♥♥♥♥♥♥♥
 *              ♥♥♥♥♥♥♥♥
 *                ♥♥♥♥
 *                 ♥♥
 *
 * --- MAIN JS --- */

document.addEventListener('DOMContentLoaded', () => {
    initClock();
    renderGarden();
    initLoveInteraction();
    initFallingBackground();
    initSpotifyListener();
    initAudio();
});

/* --- AUDIO CLICK SFX --- */
function initAudio() {
    const audio = new Audio('assets/click.mp3');
    audio.volume = 0.5; // Adjust volume as needed

    // Global click listener
    document.addEventListener('click', (e) => {
        // Check if the target or its parent is a button or clickable element
        const target = e.target.closest('button, a, .dock-icon, .window-controls, .nav-btn, input');

        if (target) {
            audio.currentTime = 0; // Reset to start
            audio.play().catch(err => console.warn("Audio play prevented:", err));
        }
    });
}

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
    const assets = [
        'assets/Love.png',
        'assets/flow1.png',
        'assets/icon_com.png',
        'assets/meil.png',
        'assets/x.png'
    ];

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

    // Data from assets/data.json (Embedded for local file access safety)
    const activityData = [
        { "date": "2025-02-14", "level": 4, "note": "Refactoring my life (and code)" },
        { "date": "2025-02-13", "level": 3, "note": "Debugging relationship status: NullReferenceException" },
        { "date": "2025-02-12", "level": 2, "note": "Gaming: Elden Ring marathon" },
        { "date": "2025-02-10", "level": 4, "note": "Drinking Stout: 4 pints deep" },
        { "date": "2025-02-08", "level": 1, "note": "Touching grass (briefly)" },
        { "date": "2025-02-05", "level": 3, "note": "Coding: New side project started" },
        { "date": "2025-02-01", "level": 2, "note": "Gaming: Lost rank again" },
        { "date": "2025-01-28", "level": 4, "note": "Drinking Stout: Celebrating bug fix" },
        { "date": "2025-01-25", "level": 3, "note": "Coding: LeetCode grind" },
        { "date": "2025-01-20", "level": 1, "note": "Read documentation" },
        { "date": "2025-01-15", "level": 4, "note": "Hackathon weekend" },
        { "date": "2025-01-10", "level": 2, "note": "Gaming with the boys" },
        { "date": "2025-01-05", "level": 3, "note": "Drinking Stout: New year same me" },
        { "date": "2025-01-01", "level": 1, "note": "Recovering from NYE" }
    ];

    // Create a lookup map for faster access
    const activityMap = {};
    activityData.forEach(item => {
        activityMap[item.date] = item;
    });

    // Create Grid 7 rows x 20 cols
    const totalCells = 7 * 20;

    // We want to simulate the last 5-6 months roughly, but let's just reverse iterate from today
    // Actually, normally github graph goes col by col (week by week). 
    // Let's just fill it randomly but inject our specific dates.

    const today = new Date('2025-02-14'); // Fixed date based on data

    // Generate dates for the grid (going backwards from today)
    // 7 rows = days of week. 20 cols = weeks.
    // Total 140 days.

    const cellDates = [];
    for (let i = 0; i < totalCells; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() - (totalCells - 1 - i));
        cellDates.push(d.toISOString().split('T')[0]);
    }

    cellDates.forEach(dateStr => {
        const cell = document.createElement('div');
        cell.className = 'pixel-cell';

        const data = activityMap[dateStr];

        if (data) {
            cell.classList.add(`l${data.level}`);
            cell.title = `${data.date}: ${data.note}`; // Tooltip
        } else {
            // Random noise 10% chance
            if (Math.random() > 0.9) {
                cell.classList.add('l1');
            } else {
                cell.style.backgroundColor = "#eee"; // Empty
            }
        }

        container.appendChild(cell);
    });
}

/* --- SPOTIFY LIVE (via Lanyard) --- */
const DISCORD_ID = "239934714759086080"; // ไอดีของคุณ

async function initSpotifyListener() {
    // เรียกครั้งแรกทันที
    checkSpotify();

    // เรียกซ้ำทุก 5 วินาที (Polling)
    setInterval(checkSpotify, 5000);
}

async function checkSpotify() {
    try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const json = await res.json();

        const musicApp = document.getElementById('app-music');
        const statusEl = document.getElementById('music-status');
        const coverEl = document.getElementById('album-cover');
        const titleEl = document.getElementById('song-title');
        const artistEl = document.getElementById('artist-name');
        const progressBar = document.getElementById('progress-bar');

        if (json.success && json.data.listening_to_spotify) {
            const spotify = json.data.spotify;

            // 1. Update Text
            titleEl.innerText = spotify.song;
            artistEl.innerText = spotify.artist;
            statusEl.innerText = "🎵 NOW PLAYING via Discord";
            statusEl.style.color = "#ff4d4d"; // Red

            // 2. Update Cover Art
            if (coverEl.src !== spotify.album_art_url) {
                coverEl.src = spotify.album_art_url;
            }

            // 3. Update Fake Progress Bar (คำนวณจาก Time stamps)
            const total = spotify.timestamps.end - spotify.timestamps.start;
            const current = Date.now() - spotify.timestamps.start;
            const percent = Math.min((current / total) * 100, 100);
            if (progressBar) progressBar.style.width = `${percent}%`;

        } else {
            // กรณีไม่ได้ฟังเพลง
            if (statusEl) {
                statusEl.innerText = "Music OFF (Spotify Paused)";
                statusEl.style.color = "#555";
            }
            if (titleEl) titleEl.innerText = "Waiting for music...";
            if (artistEl) artistEl.innerText = "-";
            if (coverEl) coverEl.src = "assets/noting.png";
            if (progressBar) progressBar.style.width = "0%";
        }
    } catch (e) {
        console.error("Lanyard Error:", e);
    }
}
