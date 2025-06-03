// Initialize scroll effects after page load
window.addEventListener('load', function() {
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Run on initial load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) {
        const heroHeight = heroSection.offsetHeight;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > heroHeight * 0.8) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Initialize GSAP scroll animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Animate sections on scroll
        gsap.utils.toArray('section').forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                ease: "power2.out"
            });
        });
        
        // Animate elements with data attributes
        gsap.utils.toArray('[data-scroll]').forEach(element => {
            const animation = element.dataset.scroll || 'fadeInUp';
            const delay = element.dataset.delay || 0;
            
            gsap.from(element, {
                opacity: 0,
                y: animation.includes('Up') ? 50 : 0,
                x: animation.includes('Left') ? -50 : (animation.includes('Right') ? 50 : 0),
                duration: 1,
                delay: parseFloat(delay),
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                ease: "power2.out"
            });
        });
        
        // Parallax effects
        gsap.utils.toArray('.parallax').forEach(element => {
            const depth = element.dataset.depth || 0.2;
            
            gsap.to(element, {
                y: 100 * depth,
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
        
        // Floating elements animation
        gsap.utils.toArray('.floating-element').forEach(element => {
            gsap.to(element, {
                y: 20,
                rotation: 5,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });
        
        // Initialize ScrollTrigger
        ScrollTrigger.refresh();
    }
});

// Refresh ScrollTrigger on resize
window.addEventListener('resize', function() {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
});