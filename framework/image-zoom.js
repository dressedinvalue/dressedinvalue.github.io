document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.image-container img');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close');
    let currentIndex = 0; // To keep track of the current image index

    images.forEach((image, index) => {
        image.addEventListener('click', function () {
            currentIndex = index; // Set the current index to the clicked image index
            modal.style.display = 'flex'; // Show the modal when an image is clicked
            modalImage.src = this.dataset.fullsize; // Set the full-size image source
            captionText.innerHTML = this.alt; // Use the alt text as the caption
        });
    });

    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none'; // Hide the modal when the close button is clicked
    });

    // Close modal on pressing the Escape key
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            modal.style.display = 'none'; // Hide the modal when Escape is pressed
        }
    });

    // Close modal when clicking outside of the image
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none'; // Hide the modal when clicking outside the image
        }
    });

    // Change modal image based on click position
    modalImage.addEventListener('click', function (event) {
        const rect = modalImage.getBoundingClientRect(); // Get the position of the modal image
        const clickX = event.clientX - rect.left; // Calculate the X position of the click relative to the image

        if (clickX > rect.width / 2) {
            // Clicked on the right side
            if (currentIndex < images.length - 1) { // Check if not on the last image
                currentIndex++; // Move to the next image
                modalImage.src = images[currentIndex].dataset.fullsize; // Update the modal image
                captionText.innerHTML = images[currentIndex].alt; // Update the caption
            }
        } else {
            // Clicked on the left side
            if (currentIndex > 0) { // Check if not on the first image
                currentIndex--; // Move to the previous image
                modalImage.src = images[currentIndex].dataset.fullsize; // Update the modal image
                captionText.innerHTML = images[currentIndex].alt; // Update the caption
            }
        }
    });

    // Keyboard navigation for left and right arrows
    window.addEventListener('keydown', function (event) {
        if (modal.style.display === 'flex') { // Only listen for keys when modal is open
            if (event.key === 'ArrowRight') {
                if (currentIndex < images.length - 1) { // Check if not on the last image
                    currentIndex++; // Move to the next image
                    modalImage.src = images[currentIndex].dataset.fullsize; // Update the modal image
                    captionText.innerHTML = images[currentIndex].alt; // Update the caption
                }
            } else if (event.key === 'ArrowLeft') {
                if (currentIndex > 0) { // Check if not on the first image
                    currentIndex--; // Move to the previous image
                    modalImage.src = images[currentIndex].dataset.fullsize; // Update the modal image
                    captionText.innerHTML = images[currentIndex].alt; // Update the caption
                }
            }
        }
    });
});