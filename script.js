const endDate = new Date("October 2, 2025 13:00:00").getTime();

const countdownFunction = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = endDate - now;

    if (timeLeft < 0) {
        document.getElementById("countdown").innerHTML = "We're back online!";
        clearInterval(countdownFunction);
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const timeElements = {
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds"),
    };

    timeElements.days.textContent = `${days} day${days > 1 ? 's' : ''}`;
    timeElements.hours.textContent = `${hours.toString().padStart(2, '0')} hour${hours > 1 ? 's' : ''}`;
    timeElements.minutes.textContent = `${minutes.toString().padStart(2, '0')} minute${minutes > 1 ? 's' : ''}`;
    timeElements.seconds.textContent = `${seconds.toString().padStart(2, '0')} second${seconds > 1 ? 's' : ''}`;
}, 1000);

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1363135172576411790/I1nprDXLfw7S8WZrkEu2hO8Ke2YT7R8rhylosSQXHWTLQcJjz3vZ0-IDesv3lnYDHaps";

function toggleSuggestionBox() {
    const box = document.getElementById("suggestion-box");
    box.classList.toggle("hidden");
}

function submitIdea() {
    const name = document.getElementById("name-input").value.trim();
    const idea = document.getElementById("idea-text").value.trim();
    const status = document.getElementById("suggestion-status");

    if (!idea || !name) {
        status.textContent = "Please enter both name and idea before sending.";
        return;
    }

    // Send idea to Discord webhook
    const payload = {
        username: "Suggestion Bot",
        content: `📝 **${name}** submitted an idea:\n${idea}`,
    };

    fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    .then(res => {
        if (res.ok) {
            status.textContent = "✅ Suggestion sent successfully!";
            document.getElementById("idea-text").value = "";
            document.getElementById("name-input").value = "";
        } else {
            status.textContent = `❌ Failed to send. Status code: ${res.status}`;
        }
    })
    .catch(err => {
        console.error("Error sending suggestion:", err);
        status.textContent = "❌ Error sending. Check your connection.";
    });
}
