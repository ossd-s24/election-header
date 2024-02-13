// Define your image sources with its currently used status to avoid repetition.
const imageSources = {
    'images/biden.jpg': false,
    'images/binkley.jpg': false,
    'images/haley.jpg': false,
    'images/kennedy.jpg': false,
    'images/phillips.jpg': false,
    'images/stein.jpg': false,
    'images/trump.jpg': false,
    'images/west.jpg': false,
};

const movingImages = [];

// Animation interval variable to turn on or off
let animation;

// Toggle button selector
const toggleButton = document.querySelector(".toggleButton");

// Range interval selector
const rangeInput = document.getElementById("rangeInput");

let interval = 2000;
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
            // Set usage to false to make it available.
            const image = imgData.element.src;
            imageSources[image] = false;

            imgData.element.remove();
            movingImages.splice(index, 1);
        }
    });

    requestAnimationFrame(moveImages);
}

rangeInput.addEventListener("input", function() {
    const currentValue = this.value;
    interval = parseInt(currentValue);
});

rangeInput.addEventListener("mouseup", function() {
    clearInterval(animation);
    animation = setInterval(() => {
        addMovingImage();
    }, interval);
});

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
