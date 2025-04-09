const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spinButton');
const resultDisplay = document.getElementById('resultDisplay');
const wheelContainer = document.getElementById('wheelContainer'); // Get the container

// Define your set options here
const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5", "Option 6"];
const numSegments = options.length;
const segmentDeg = 360 / numSegments;
const angle = segmentDeg;
const angleHalf = angle / 2;
let rotation = 0;
let spinning = false;

function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 60%)`;
}

function createSegments() {
    console.log("createSegments() called");
    wheel.innerHTML = '';
    for (let i = 0; i < numSegments; i++) {
        const segment = document.createElement('div');
        segment.classList.add('segment');
        segment.style.setProperty('--rotation', `${i * segmentDeg}deg`);
        segment.style.setProperty('--color', getRandomColor());
        segment.style.setProperty('--angle', `${angle}deg`);
        segment.style.setProperty('--angle-half', `${angleHalf}deg`);
        segment.innerHTML = `<span>${options[i]}</span>`;
        wheel.appendChild(segment);
    }
    console.log("createSegments() finished, number of segments:", wheel.children.length);
    // Explicitly set opacity to 1 after creation
    wheel.style.opacity = 1;
    wheelContainer.style.opacity = 1; // Also ensure container is visible
}

function spinWheel() {
    if (spinning) return;
    spinning = true;
    resultDisplay.textContent = '';

    const randomSpin = 360 * 5 + Math.random() * 360;
    rotation += randomSpin;

    wheel.classList.add('spinning');
    wheel.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
        wheel.classList.remove('spinning');
        wheel.style.transition = 'none';
        const actualRotation = rotation % 360;
        const winningSegmentIndex = Math.floor((360 - actualRotation) / segmentDeg) % numSegments;
        const winner = options[winningSegmentIndex];
        resultDisplay.textContent = `You landed on: ${winner}`;
        spinning = false;

        setTimeout(() => {
            wheel.style.transition = 'transform 0.3s ease-in-out';
            wheel.style.transform = `rotate(${actualRotation}deg)`;
            rotation = actualRotation;
        }, 100);

    }, 5000);
}

// Ensure the event listener is correctly attached
spinButton.addEventListener('click', spinWheel);

// Initial setup
console.log("Script started");
// Set initial opacity in JavaScript as well, in case CSS is delayed
wheel.style.opacity = 1;
wheelContainer.style.opacity = 1;
createSegments();
console.log("Initial createSegments() called");