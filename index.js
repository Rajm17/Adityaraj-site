window.addEventListener('scroll', function() {
    const scrollY = window.scrollY; // Get current scroll position
    const moveTopBtn = document.getElementById('move-top');
    const threshold = 100; // Show button after scrolling more than 100px
  
    if (scrollY > threshold) {
      moveTopBtn.classList.add('visible');
    } else {
      moveTopBtn.classList.remove('visible');
    }
  });