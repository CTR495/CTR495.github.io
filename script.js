document.addEventListener('DOMContentLoaded', () => {
    const canvasContainer = document.getElementById('canvas-container');
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    canvasContainer.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let selectedColor = '#000000';

    // Initialize Socket.IO
    const socket = io('https://ctr495.github.io/');

    // User authentication
    document.getElementById('discord-login').addEventListener('click', () => {
        window.location.href = 'https://discord.com/oauth2/authorize?client_id=1325249974635597947&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Fctr495.github.io&integration_type=1&scope=bot+applications.commands+identify';
    });

    // Handle drawing on canvas
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        draw(e);
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            draw(e);
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
        ctx.beginPath();
    });

    canvas.addEventListener('mouseout', () => {
        isDrawing = false;
    });

    function draw(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = selectedColor;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);

        // Broadcast drawing data to server
        socket.emit('draw', { x, y, color: selectedColor });
    }

    // Listen for drawing data from server
    socket.on('draw', (data) => {
        ctx.strokeStyle = data.color;
        ctx.lineTo(data.x, data.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(data.x, data.y);
    });

    // Color selector
    document.getElementById('color-selector').addEventListener('change', (e) => {
        selectedColor = e.target.value;
    });
});
