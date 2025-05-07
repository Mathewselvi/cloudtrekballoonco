// Preloader
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    setTimeout(function() {
        loader.classList.add('hide');
    }, 2000);
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
        menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = ''; // Re-enable scrolling
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = ''; // Re-enable scrolling
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll reveal animations
function revealElements() {
    const elements = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add reveal class to elements
document.addEventListener('DOMContentLoaded', function() {
    // About section
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image');
    
    if (aboutText) aboutText.classList.add('reveal');
    if (aboutImage) aboutImage.classList.add('reveal');
    
    // Features
    document.querySelectorAll('.feature').forEach(feature => {
        feature.classList.add('reveal');
    });
    
    // Munnar items
    document.querySelectorAll('.munnar-item').forEach(item => {
        item.classList.add('reveal');
    });
    
    // Service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.add('reveal');
    });
    
    // Feature items
    document.querySelectorAll('.feature-item').forEach(item => {
        item.classList.add('reveal');
    });
    
    // Gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.classList.add('reveal');
    });
    
    // Contact elements
    const contactInfo = document.querySelector('.contact-info');
    const contactSocial = document.querySelector('.contact-social');
    const mapContainer = document.querySelector('.map-container');
    
    if (contactInfo) contactInfo.classList.add('reveal');
    if (contactSocial) contactSocial.classList.add('reveal');
    if (mapContainer) mapContainer.classList.add('reveal');
    
    // Initial check
    revealElements();
});

// Check for reveal on scroll
window.addEventListener('scroll', revealElements);

// Parallax effect
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    
    // Hero parallax
    const hero = document.getElementById('hero');
    if (hero) {
        hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
    }
    
    // Why Munnar parallax
    const whyMunnar = document.getElementById('why-munnar');
    if (whyMunnar) {
        whyMunnar.style.backgroundPosition = `center ${-scrollPosition * 0.1}px`;
    }
});

// Gallery Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Gallery Modal/Lightbox
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    let currentIndex = 0;
    
    // Open modal when clicking on gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.gallery-caption').textContent;
            const description = this.querySelector('.gallery-description').textContent;
            
            modalImg.src = img.src;
            modalCaption.innerHTML = `<h3>${caption}</h3><p>${description}</p>`;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            currentIndex = index;
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
    
    // Navigate to previous image
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent modal from closing
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateModal();
    });
    
    // Navigate to next image
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent modal from closing
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateModal();
    });
    
    // Update modal with current image
    function updateModal() {
        const currentItem = galleryItems[currentIndex];
        const img = currentItem.querySelector('img');
        const caption = currentItem.querySelector('.gallery-caption').textContent;
        const description = currentItem.querySelector('.gallery-description').textContent;
        
        // Fade out effect
        modalImg.style.opacity = 0;
        
        setTimeout(() => {
            modalImg.src = img.src;
            modalCaption.innerHTML = `<h3>${caption}</h3><p>${description}</p>`;
            
            // Fade in effect
            modalImg.style.opacity = 1;
        }, 300);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'Escape') {
                closeBtn.click();
            }
        }
    });
    
    // Add swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    modal.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    modal.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left, go to next
            nextBtn.click();
        } else if (touchEndX > touchStartX + 50) {
            // Swipe right, go to previous
            prevBtn.click();
        }
    }
});

// Add CSS for animations
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .hero-title, .hero-subtitle, .hero-tagline, .btn {
            animation: fadeIn 1s ease forwards;
        }
        
        .hero-title {
            animation-delay: 0.3s;
        }
        
        .hero-subtitle {
            animation-delay: 0.6s;
        }
        
        .hero-tagline {
            animation-delay: 0.9s;
        }
        
        .hero-content .btn {
            opacity: 0;
            animation-delay: 1.2s;
        }
    `;
    document.head.appendChild(style);
});

// Fix iOS height issues
document.addEventListener('DOMContentLoaded', function() {
    function setHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    window.addEventListener('resize', setHeight);
    setHeight();
});
// Add this to your script.js
// Change navbar appearance on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Highlight active section in navbar
    const sections = document.querySelectorAll('section');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});
// Add or update this in your script.js for the enhanced gallery
// Gallery Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });
    
    // Gallery Modal/Lightbox
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    let currentIndex = 0;
    const visibleItems = [];
    
    // Open modal when clicking on gallery view icon
    document.querySelectorAll('.gallery-view').forEach((item, index) => {
        item.addEventListener('click', function() {
            const galleryItem = this.closest('.gallery-item');
            const img = galleryItem.querySelector('img');
            const title = galleryItem.querySelector('.gallery-info h3').textContent;
            const description = galleryItem.querySelector('.gallery-info p').textContent;
            
            // Get all currently visible items
            visibleItems.length = 0;
            document.querySelectorAll('.gallery-item').forEach((item, idx) => {
                if (item.style.display !== 'none') {
                    visibleItems.push(idx);
                }
            });
            
            currentIndex = visibleItems.indexOf(index);
            
            modalImg.src = img.src;
            modalCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
    
    // Navigate to previous image
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent modal from closing
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        updateModal();
    });
    
    // Navigate to next image
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent modal from closing
        currentIndex = (currentIndex + 1) % visibleItems.length;
        updateModal();
    });
    
    // Update modal with current image
    function updateModal() {
        const itemIndex = visibleItems[currentIndex];
        const currentItem = document.querySelectorAll('.gallery-item')[itemIndex];
        const img = currentItem.querySelector('img');
        const title = currentItem.querySelector('.gallery-info h3').textContent;
        const description = currentItem.querySelector('.gallery-info p').textContent;
        
        // Fade out effect
        modalImg.style.opacity = 0;
        
        setTimeout(() => {
            modalImg.src = img.src;
            modalCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
            
            // Fade in effect
            modalImg.style.opacity = 1;
        }, 300);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'Escape') {
                closeBtn.click();
            }
        }
    });
});
// Back to Top Button - Add to script.js
window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});
// Gallery Modal/Lightbox
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    let currentIndex = 0;
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Open modal when clicking on gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            modalImg.src = img.src;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            currentIndex = index;
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
    
    // Navigate to previous image
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent modal from closing
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateModal();
    });
    
    // Navigate to next image
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent modal from closing
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateModal();
    });
    
    // Update modal with current image
    function updateModal() {
        const currentItem = galleryItems[currentIndex];
        const img = currentItem.querySelector('img');
        
        // Fade out effect
        modalImg.style.opacity = 0;
        
        setTimeout(() => {
            modalImg.src = img.src;
            
            // Fade in effect
            modalImg.style.opacity = 1;
        }, 300);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'Escape') {
                closeBtn.click();
            }
        }
    });
    
    // Add swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    modal.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    modal.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left, go to next
            nextBtn.click();
        } else if (touchEndX > touchStartX + 50) {
            // Swipe right, go to previous
            prevBtn.click();
        }
    }
});