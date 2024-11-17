const carouselInner = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
let currentIndex = 0;
let autoAdvanceInterval;

// Function to update the carousel position
function updateCarousel() {
	const offset = -currentIndex * 100;
	carouselInner.style.transform = `translateX(${offset}%)`;
}

// Function to go to the next slide
function nextSlide() {
	currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
	updateCarousel();
}

// Function to reset the auto-advance interval
function resetAutoAdvance() {
	clearInterval(autoAdvanceInterval);
	autoAdvanceInterval = setInterval(nextSlide, 5000);
}

// Event listener for the left button
document.querySelector('.carousel-button.left').addEventListener('click', () => {
	currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - 1;
	updateCarousel();
	resetAutoAdvance(); // Reset interval on manual advance
});

// Event listener for the right button
document.querySelector('.carousel-button.right').addEventListener('click', () => {
	nextSlide();
	resetAutoAdvance(); // Reset interval on manual advance
});

// Touch swipe functionality
let startX = 0;
let endX = 0;

carouselInner.addEventListener('touchstart', (e) => {
	startX = e.touches[0].clientX; // Use e.touches for touch events
});

carouselInner.addEventListener('touchmove', (e) => {
	endX = e.touches[0].clientX; // Update endX on touchmove
});

carouselInner.addEventListener('touchend', () => {
	handleSwipe();
});

// Function to handle swipe gestures
function handleSwipe() {
	if (startX > endX + 50) {
		nextSlide(); // Swipe left
		resetAutoAdvance(); // Reset interval on manual advance
	} else if (startX < endX - 50) {
		currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - 1; // Swipe right
		updateCarousel();
		resetAutoAdvance(); // Reset interval on manual advance
	}
}

// Start the auto-advance interval
resetAutoAdvance();
