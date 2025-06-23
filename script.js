// Set the date for when the maintenance will end
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

    document.getElementById("days").innerText = days.toString().padStart(2, "0");
    document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");
}, 1000);

const DISCORD_WEBHOOK_URL = "https://discordapp.com/api/webhooks/1386517300701691905/9GfJhjc7SQIphtzs9v1dVQeHnlej0S-8LcWKhYgIlv0UWH7YfgtJlU6RCbxEEH09S220";

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

