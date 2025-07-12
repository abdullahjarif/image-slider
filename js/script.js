document.addEventListener('DOMContentLoaded', function () {
    const slidesContainer = document.querySelector('.slides');
    const slideItems = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.dots');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    const slideCount = slideItems.length;
    let currentSlideIndex = 0;

    // Create dots
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('span');

        if (i === 0) {
            dot.classList.add('active');
        }

        dot.classList.add('dot');
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');

    // Update slide position and active dot
    function updateSlide(index) {
        if (index >= slideCount) {
            currentSlideIndex = 0;
        } else if (index < 0) {
            currentSlideIndex = slideCount - 1;
        } else {
            currentSlideIndex = index;
        }

        // Translate to the current slide
        slidesContainer.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

        // Update active dot
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlideIndex].classList.add('active');
    }

    // Auto slide functionality
    function startAutoSlide() {
        setInterval(() => {
            updateSlide(currentSlideIndex + 1);
        }, 3000); 
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function restartAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    // Dot click functionality
    dots.forEach(dot => {
        dot.addEventListener('click', function () {
            const index = parseInt(dot.dataset.index);
            updateSlide(index);
            restartAutoSlide()
        });
    });

    // Button controls
    prevButton.addEventListener('click', function () {
        updateSlide(currentSlideIndex - 1);
        restartAutoSlide()
    });

    nextButton.addEventListener('click', function () {
        updateSlide(currentSlideIndex + 1);
        restartAutoSlide()
    });

    // Initialize first slide
    updateSlide(currentSlideIndex);
    startAutoSlide();
});
