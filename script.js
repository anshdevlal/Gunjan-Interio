/**
 * Premium Interior Design Template JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky Navbar & Mobile Menu Toggle ---
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-link');

    // Sticky Header Scroll Event
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        navbar.classList.toggle('nav-open');
    });

    // Close Mobile Menu when Nav Link is Clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            navbar.classList.remove('nav-open');
        });
    });

    // --- 2. Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Prevent default behavior
            e.preventDefault();

            // Get target element
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return; // Ignore "#"
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Calculate position with offset for sticky navbar
                const navbarHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - (navbarHeight > 0 ? navbarHeight - 10 : 0);

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- 3. Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Unobserve to animate only once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- 4. Testimonial Carousel Logic ---
    const track = document.getElementById('testimonialTrack');
    if (track) {
        const slides = Array.from(track.children);
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const dotsNav = document.getElementById('carouselDots');
        let currentIndex = 0;

        // Create dots dynamically
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.index = index;
            dotsNav.appendChild(dot);
        });

        const dots = Array.from(dotsNav.children);

        const updateCarousel = (index) => {
            // move track
            track.style.transform = `translateX(-${index * 100}%)`;
            
            // update dots
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        };

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
            updateCarousel(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
            updateCarousel(currentIndex);
        });

        // Dot click
        dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('.dot');
            if (!targetDot) return;
            currentIndex = parseInt(targetDot.dataset.index);
            updateCarousel(currentIndex);
        });

        // Auto Play
        setInterval(() => {
            currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
            updateCarousel(currentIndex);
        }, 6000);
    }

});
