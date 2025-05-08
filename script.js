// Video Slideshow Function
function initVideoSlideshow() {
    const slides = document.querySelectorAll('.video-slide');
    if (!slides.length) return; // Exit if no slides found
    
    let currentSlide = 0;
    let slideInterval;
    
    // Ensure videos are loaded and ready
    const videoElements = document.querySelectorAll('.video-slide video');
    videoElements.forEach(video => {
        // Ensure videos are muted to allow autoplay
        video.muted = true;
        
        // Add playsinline attribute for mobile compatibility
        video.setAttribute('playsinline', '');
        
        // Handle loading and prepare for iOS
        video.load();
        
        // Some browsers need a manual play trigger
        video.play().catch(error => {
            console.warn('Auto-play was prevented:', error);
            // Add a play button if needed for mobile (optional)
        });
    });
    
    // Function to change slides
    function nextSlide() {
        // Hide current slide
        slides[currentSlide].classList.remove('active');
        
        // Pause current video if possible to save resources
        const currentVideo = slides[currentSlide].querySelector('video');
        if (currentVideo) {
            currentVideo.pause();
        }
        
        // Calculate next slide index
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Show next slide
        slides[currentSlide].classList.add('active');
        
        // Play next video
        const nextVideo = slides[currentSlide].querySelector('video');
        if (nextVideo) {
            nextVideo.currentTime = 0;
            nextVideo.play().catch(e => console.warn('Could not play video:', e));
        }
    }
    
    // Start the slideshow
    function startSlideshow() {
        // Clear any existing interval
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        
        // Set interval for slide transitions (15 seconds per slide)
        slideInterval = setInterval(nextSlide, 15000);
    }
    
    // Initialize slideshow when page loads
    startSlideshow();
    
    // Handle visibility change to pause/resume slideshow when tab is inactive
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Clear the interval when page is not visible
            clearInterval(slideInterval);
        } else {
            // Restart when page becomes visible again
            startSlideshow();
        }
    });
    
    // Optimize for mobile - pause videos when not in viewport
    function handleScrollVisibility() {
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;
        
        const rect = heroSection.getBoundingClientRect();
        
        // Check if hero section is visible
        const isVisible = (
            rect.top >= -rect.height &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + rect.height
        );
        
        videoElements.forEach(video => {
            if (isVisible) {
                // Play current slide's video only
                if (video.closest('.video-slide').classList.contains('active')) {
                    video.play().catch(e => console.warn('Could not play video:', e));
                }
            } else {
                // Pause all videos when not visible
                video.pause();
            }
        });
    }
    
    // Add scroll listener for mobile optimization
    window.addEventListener('scroll', handleScrollVisibility);
    
    // Handle screen orientation changes on mobile
    window.addEventListener('orientationchange', function() {
        // Short delay to allow the browser to complete orientation change
        setTimeout(handleScrollVisibility, 200);
    });
}

// Preloader
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(function() {
            loader.classList.add('hide');
        }, 2000);
    }
    
    // Initialize video slideshow after preloader
    initVideoSlideshow();
});

// Mobile Menu Toggle - Fixed Version
document.addEventListener('DOMContentLoaded', function() {
    // Get the menu toggle button and navigation links
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle || !navLinks) return; // Exit if elements don't exist
    
    // Clear any previously attached event listeners (to prevent duplicates)
    const newMenuToggle = menuToggle.cloneNode(true);
    menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
    
    // Add click event handler to toggle menu
    newMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event from bubbling up
        
        // Toggle active class for nav links
        navLinks.classList.toggle('active');
        
        // Toggle active class for menu button
        this.classList.toggle('active');
        
        // Change icon and control body scroll
        if (navLinks.classList.contains('active')) {
            this.innerHTML = '<i class="fas fa-times"></i>';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            this.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
    
    // Close menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            // Close menu
            navLinks.classList.remove('active');
            newMenuToggle.classList.remove('active');
            newMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            e.target !== newMenuToggle && 
            !newMenuToggle.contains(e.target)) {
            
            navLinks.classList.remove('active');
            newMenuToggle.classList.remove('active');
            newMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
    
    // Close menu on window resize (when switching to desktop view)
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            newMenuToggle.classList.remove('active');
            newMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
    
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
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

// Add reveal class to elements and set up efficient scroll reveal
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
    
    // Contact elements - fixed selectors to match HTML
    const contactInfo = document.querySelector('.contact-info-box');
    const contactSocial = document.querySelector('.contact-social-box');
    const mapContainer = document.querySelector('.map-container');
    
    if (contactInfo) contactInfo.classList.add('reveal');
    if (contactSocial) contactSocial.classList.add('reveal');
    if (mapContainer) mapContainer.classList.add('reveal');
    
    // Use IntersectionObserver for more efficient scroll animations if available
    if ('IntersectionObserver' in window) {
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Unobserve after animation is triggered
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        window.addEventListener('scroll', revealElements);
        // Initial check
        revealElements();
    }
});

// Gallery Modal/Lightbox - Consolidated version
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('gallery-modal');
    if (!modal) return;
    
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    let currentIndex = 0;
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!galleryItems.length) return;
    
    // Open modal when clicking on gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                modalImg.src = img.src;
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
                currentIndex = index;
            }
        });
    });
    
    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
    
    // Navigate to previous image
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent modal from closing
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateModal();
        });
    }
    
    // Navigate to next image
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent modal from closing
            currentIndex = (currentIndex + 1) % galleryItems.length;
            updateModal();
        });
    }
    
    // Update modal with current image
    function updateModal() {
        const currentItem = galleryItems[currentIndex];
        const img = currentItem.querySelector('img');
        
        if (img) {
            // Fade out effect
            modalImg.style.opacity = 0;
            
            setTimeout(() => {
                modalImg.src = img.src;
                
                // Fade in effect
                modalImg.style.opacity = 1;
            }, 300);
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'flex' || modal.style.display === 'block') {
            if (e.key === 'ArrowLeft' && prevBtn) {
                prevBtn.click();
            } else if (e.key === 'ArrowRight' && nextBtn) {
                nextBtn.click();
            } else if (e.key === 'Escape' && closeBtn) {
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
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold && nextBtn) {
            // Swipe left, go to next
            nextBtn.click();
        } else if (touchEndX > touchStartX + swipeThreshold && prevBtn) {
            // Swipe right, go to previous
            prevBtn.click();
        }
    }
});

// Change navbar appearance on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Highlight active section in navbar
    const sections = document.querySelectorAll('section');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
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

// Back to Top Button
window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    }
});

// Optimize image loading with lazy loading
document.addEventListener('DOMContentLoaded', function() {
    // Check if browser supports native lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        // Add loading="lazy" to all images
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyImages = document.querySelectorAll('img:not([src])');
        lazyImages.forEach(img => {
            img.setAttribute('loading', 'lazy');
            
            // Store the actual src in data-src
            if (img.src) {
                img.setAttribute('data-src', img.src);
                img.removeAttribute('src');
            }
        });
        
        // Load images when they enter the viewport
        if ('IntersectionObserver' in window) {
            const lazyImageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImageObserver.unobserve(lazyImage);
                    }
                });
            });
            
            lazyImages.forEach(lazyImage => {
                lazyImageObserver.observe(lazyImage);
            });
        }
    }
});

// Fix iOS height issues - improved version for mobile browsers
document.addEventListener('DOMContentLoaded', function() {
    // Set correct viewport height for mobile browsers
    function setVhProperty() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Call on initial load
    setVhProperty();
    
    // Call on resize and on orientation change
    window.addEventListener('resize', setVhProperty);
    window.addEventListener('orientationchange', setVhProperty);
});

// Add touch feedback for mobile buttons
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        // Add touch feedback
        backToTop.addEventListener('touchstart', function() {
            this.style.backgroundColor = '#1A2942'; // Change color on touch
        });
        
        backToTop.addEventListener('touchend', function() {
            this.style.backgroundColor = ''; // Reset color
        });
    }
});

// Handle resize events more efficiently
let resizeTimer;
window.addEventListener('resize', function() {
    // Clear the timeout
    clearTimeout(resizeTimer);
    
    // Set a new timeout to only trigger after resizing has stopped
    resizeTimer = setTimeout(function() {
        // Update mobile-specific adjustments
        const isMobile = window.innerWidth < 768;
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');
        
        // Reset nav state when resizing from mobile to desktop
        if (navLinks && menuToggle && !isMobile && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    }, 250); // Execute after 250ms of no resizing
});

// Add dynamic styles for animations - centralized in JS
document.addEventListener('DOMContentLoaded', function() {
    // Only add if not already present
    if (!document.querySelector('#dynamic-styles')) {
        const style = document.createElement('style');
        style.id = 'dynamic-styles';
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
            
            .hero-title, .hero-subtitle, .hero-tagline, .hero-content .btn {
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
            
            .nav-links.active li {
                animation: fadeInDown 0.5s forwards;
            }
            
            @keyframes fadeInDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
});