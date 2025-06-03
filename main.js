document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Initialize animations after preloader hides
            initAnimations();
            initScrollEffects();
        }, 1000);
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Tab Navigation
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const tabHighlight = document.querySelector('.tab-highlight');
    
    function updateTabHighlight(activeTab) {
        const tabRect = activeTab.getBoundingClientRect();
        const containerRect = activeTab.parentElement.getBoundingClientRect();
        
        tabHighlight.style.width = `${tabRect.width}px`;
        tabHighlight.style.left = `${tabRect.left - containerRect.left}px`;
    }
    
    tabLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active tab
            tabLinks.forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');
            
            // Update tab content
            tabPanes.forEach(pane => pane.classList.remove('active'));
            tabPanes[index].classList.add('active');
            
            // Update highlight position
            updateTabHighlight(this);
        });
    });
    
    // Initialize first tab as active
    if (tabLinks.length > 0) {
        updateTabHighlight(tabLinks[0]);
    }
    
    // Testimonial Slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelector('.testimonial-dots');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    let currentSlide = 0;
    const slideCount = testimonialSlides.length;
    
    // Create dots
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        testimonialDots.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.testimonial-dot');
    
    function updateSlider() {
        testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function goToSlide(index) {
        currentSlide = (index + slideCount) % slideCount;
        updateSlider();
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-advance testimonials
    let slideInterval = setInterval(nextSlide, 5000);
    
    testimonialTrack.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    testimonialTrack.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form submission logic here
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add newsletter subscription logic here
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
    
    // Stats Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const suffix = stat.textContent.includes('%') ? '%' : '';
            let count = 0;
            const duration = 2000;
            const increment = target / (duration / 16);
            
            const updateCount = () => {
                count += increment;
                if (count < target) {
                    stat.textContent = Math.floor(count) + suffix;
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target + suffix;
                }
            };
            
            updateCount();
        });
    }
    
    // Initialize stats animation when in view
    const statsSection = document.querySelector('.stats');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Custom Cursor
    const cursorNormal = document.querySelector('.cursor-normal');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursorNormal && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursorNormal.style.left = `${e.clientX}px`;
            cursorNormal.style.top = `${e.clientY}px`;
            
            setTimeout(() => {
                cursorFollower.style.left = `${e.clientX}px`;
                cursorFollower.style.top = `${e.clientY}px`;
            }, 100);
        });
        
        // Cursor effects on hover
        const hoverElements = document.querySelectorAll('a, button, .btn, .tab-link, .solution-card, .industry-card, .case-card, .testimonial-card');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorNormal.style.transform = 'scale(3)';
                cursorNormal.style.opacity = '0';
                
                cursorFollower.style.transform = 'scale(0.5)';
                cursorFollower.style.backgroundColor = 'rgba(255, 90, 95, 0.5)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorNormal.style.transform = 'scale(1)';
                cursorNormal.style.opacity = '1';
                
                cursorFollower.style.transform = 'scale(1)';
                cursorFollower.style.backgroundColor = 'transparent';
            });
        });
    }
    
    // Nav Link Highlight
    const navLinks = document.querySelectorAll('.nav-link');
    const navHighlight = document.querySelector('.nav-highlight');
    
    function updateNavHighlight(activeLink) {
        if (!activeLink) return;
        
        const linkRect = activeLink.getBoundingClientRect();
        const containerRect = activeLink.parentElement.getBoundingClientRect();
        
        navHighlight.style.width = `${linkRect.width}px`;
        navHighlight.style.left = `${linkRect.left - containerRect.left}px`;
    }
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            updateNavHighlight(this);
        });
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            updateNavHighlight(this);
            
            // Scroll to section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Set active nav link based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 150;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                        updateNavHighlight(link);
                    }
                });
            }
        });
    });
    
    // Initialize first nav link as active
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
        updateNavHighlight(navLinks[0]);
    }
});

// Initialize animations with GSAP
function initAnimations() {
    // Animate elements with data attributes
    gsap.utils.toArray('[data-animate]').forEach(el => {
        const delay = el.dataset.delay || 0;
        const duration = el.dataset.duration || 1;
        
        gsap.from(el, {
            opacity: 0,
            y: 30,
            duration: duration,
            delay: parseFloat(delay),
            ease: "power2.out"
        });
    });
    
    // Animate solution cards on hover
    gsap.utils.toArray('.solution-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.03,
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.16)",
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
                duration: 0.3
            });
        });
    });
}

// Initialize scroll effects with GSAP ScrollTrigger
function initScrollEffects() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
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
    
    // Parallax effects
    gsap.utils.toArray('.parallax').forEach(el => {
        const depth = el.dataset.depth || 0.2;
        
        gsap.to(el, {
            y: 100 * depth,
            scrollTrigger: {
                trigger: el,
                scrub: true
            }
        });
    });
    
    // Floating elements animation
    gsap.utils.toArray('.floating-element').forEach(el => {
        gsap.to(el, {
            y: 20,
            rotation: 5,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });
}