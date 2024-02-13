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
const interval = 2000;
const speed = 2;

function addMovingImage() {
    // Randomly select an image to display next
    const selectedImage = imageSources[Math.floor(Math.random() * imageSources.length)];
    const img = document.createElement('img');
    img.src = selectedImage;
    img.style.position = 'absolute';
    img.style.bottom = '0px';
    img.style.left = '-125px'; // Start off-screen to the left
    document.body.appendChild(img);

    // Push the image data to the movingImages array with a constant speed
    movingImages.push({element: img, speed});
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
    setInterval(addMovingImage, interval);
    moveImages();
});
