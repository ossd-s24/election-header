// Define your image sources
const imageSources = [
    'images/biden.jpg',
    'images/binkley.jpg',
    'images/haley.jpg',
    'images/kennedy.jpg',
    'images/phillips.jpg',
    'images/stein.jpg',
    'images/trump.jpg',
    'images/west.jpg',
];

const movingImages = [];

// Animation interval variable to turn on or off
let animation;

// Toggle button selector
const toggleButton = document.querySelector(".toggleButton");

const interval = 2000;
const speed = 2;

let lastUsedImage;

function addMovingImage() {
    // Randomly select an available image to display next
    let availableImages = Object.keys(imageSources).filter(key => imageSources[key] === false);
    availableImages = availableImages.filter(img => img !== lastUsedImage);
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const selectedImage = availableImages[randomIndex];
    const img = document.createElement('img');
    img.src = selectedImage;
    img.style.position = 'absolute';
    img.style.bottom = '0px';
    img.style.left = '-125px'; // Start off-screen to the left
    document.body.appendChild(img);

    // Push the image data to the movingImages array with a constant speed
    movingImages.push({element: img, speed});

    // Set image usage status to true.
    imageSources[availableImages[randomIndex]] = true;

    lastUsedImage = availableImages[randomIndex];
}

function moveImages() {
    movingImages.forEach((imgData, index) => {
        const currentPosition = parseInt(imgData.element.style.left, 0);
        imgData.element.style.left = `${currentPosition + imgData.speed}px`;

        // Remove the image if it goes too far off-screen to the right
        if (currentPosition > window.innerWidth) {
            imgData.element.remove();
            movingImages.splice(index, 1);
        }
    });

    requestAnimationFrame(moveImages);
}

document.addEventListener('DOMContentLoaded', () => {
    // Start adding images at the same interval
    animation = setInterval(addMovingImage, interval);
    moveImages();
    toggleButton.innerHTML = "stop";
    toggleButton.classList.remove("off");
    toggleButton.classList.add("on");
});

toggleButton.addEventListener("click", () => {
    if (animation === null){
        animation = setInterval(() => {
            addMovingImage();
        }, interval);
        toggleButton.innerHTML = "stop";
        toggleButton.classList.remove("off");
        toggleButton.classList.add("on");
    }
    else{
        clearInterval(animation);
        animation = null;
        toggleButton.innerHTML = "start";
        toggleButton.classList.remove("on");
        toggleButton.classList.add("off");
    }
});
