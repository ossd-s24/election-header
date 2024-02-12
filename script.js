//images
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

// Container to keep track of images
const movingImages = [];

// Animation interval variable to turn on or off
let animation;

// Toggle button selector
const toggleButton = document.querySelector(".toggleButton");

document.addEventListener('DOMContentLoaded', () => {
    // Start adding images at random intervals
    animation = setInterval(() => {
        addMovingImage();
    }, 2000); //tbd actual interval
    toggleButton.innerHTML = "stop";
});

toggleButton.addEventListener("click", () => {
    if (animation === null){
        animation = setInterval(() => {
            addMovingImage();
        }, 2000);
        toggleButton.innerHTML = "stop";
    }
    else{
        clearInterval(animation);
        animation = null;
        toggleButton.innerHTML = "start";
    }
})

function addMovingImage() {
    const selectedImage = imageSources[Math.floor(Math.random() * imageSources.length)];
    const direction = Math.random() < 0.5 ? -1 : 1; // Randomly choose direction: -1 for left, 1 for right

    const img = document.createElement('img');
    img.src = selectedImage;
    img.style.position = 'absolute';
    img.style.bottom = '0px';
    img.style[direction === -1 ? 'right' : 'left'] = '-100px'; // Start off-screen
    document.body.appendChild(img);

    movingImages.push({element: img, direction, speed: 2 + Math.random() * 3}); // Random speed
}

function moveImages() {
    movingImages.forEach((imgData) => {
        const currentPosition = parseInt(imgData.element.style[imgData.direction === -1 ? 'right' : 'left'], 10);
        imgData.element.style[imgData.direction === -1 ? 'right' : 'left'] = `${currentPosition + imgData.speed * imgData.direction}px`;

        // remove the image if it goes too far off-screen
        const outOfBounds = imgData.direction === 1 ? currentPosition > window.innerWidth : currentPosition < -200;
        if (outOfBounds) {
            imgData.element.remove(); // Remove the image from the DOM
            const index = movingImages.indexOf(imgData);
            movingImages.splice(index, 1); // Remove from tracking array
        }
    });

    requestAnimationFrame(moveImages);
}

moveImages();
