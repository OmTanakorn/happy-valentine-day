document.addEventListener('DOMContentLoaded', () => {
    initClock();

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

function initClock() {
    const clockElement = document.getElementById('clock');
    if (!clockElement) return;

    function updateTime() {
        const now = new Date();
        const options = { hour: 'numeric', minute: 'numeric', hour12: false };
        // Format: 14:02 (matching reference) or user's local time
        // Using user's local time but in 24h format to match the aesthetic reference
        let timeString = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        clockElement.textContent = timeString;
    }

    updateTime();
    setInterval(updateTime, 1000);
}
