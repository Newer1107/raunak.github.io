// Variables to keep track of the images
let currentImageIndex = 0;
let imageUrls = [];

// Get a batch of random cat images from the API
async function getRandomCatImages(numImages) {
  const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${numImages}`);
  const data = await response.json();
  return data.map(imageData => imageData.url);
}

// Preload the next batch of images
async function preloadNextBatch() {
  const numImagesToPreload = 3;
  const startIndex = currentImageIndex + 1;
  const endIndex = currentImageIndex + numImagesToPreload;
  for (let i = startIndex; i <= endIndex; i++) {
    if (i < imageUrls.length) {
      const image = new Image();
      image.src = imageUrls[i];
      console.log(`Preloaded image ${i}: ${imageUrls[i]}`);
    }
  }
}

// Display the random cat image on the page
async function displayRandomCatImage() {
  const catImageElement = document.getElementById("catImage");
  if (currentImageIndex >= imageUrls.length) {
    // Get a new batch of images if we've run out
    imageUrls = await getRandomCatImages(10);
    currentImageIndex = 0;
    preloadNextBatch();
  }
  const imageUrl = imageUrls[currentImageIndex];
  catImageElement.innerHTML = `<img src="${imageUrl}" alt="Random Cat">`;
  currentImageIndex++;
  preloadNextBatch();
}

// Event listener for the "New Image" button
document.getElementById("newImageButton").addEventListener("click", displayRandomCatImage);

// Get the initial batch of images
getRandomCatImages(10).then(urls => {
  imageUrls = urls;
  preloadNextBatch();
});

// Display initial random cat image on page load
displayRandomCatImage();
