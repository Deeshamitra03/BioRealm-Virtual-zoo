// GSAP Animations and Scroll Triggers
function initGSAPAnimations() {
    // Register ScrollTrigger plugin
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        console.log('GSAP Animations initialized');
    } else {
        console.warn('GSAP or ScrollTrigger not available - animations disabled');
        return;
    }

    // Hero section animations
    const heroTimeline = gsap.timeline();
    heroTimeline
        .from('.hero-title', {
            duration: 1.5,
            y: 100,
            opacity: 0,
            ease: "power3.out"
        })
        .from('.hero-subtitle', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.5")
        .from('.hero-stats', {
            duration: 1,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: "back.out(1.7)"
        }, "-=0.3")
        .from('.hero-actions', {
            duration: 0.8,
            y: 20,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.2")
        .from('.scroll-indicator', {
            duration: 1,
            y: -20,
            opacity: 0,
            ease: "bounce.out"
        }, "-=0.5");

    // Animate floating wildlife
    gsap.to('.wildlife-item', {
        y: 20,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1
    });

    // Section animations
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });

    // Animal cards animation
    gsap.from('.animal-card', {
        scrollTrigger: {
            trigger: '.animals-section',
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
    });

    // Safari section animations
    gsap.from('.panorama-viewer', {
        scrollTrigger: {
            trigger: '.safari-section',
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });

    // Quiz section animations
    gsap.from('.quiz-container', {
        scrollTrigger: {
            trigger: '.quiz-section',
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });

    // Feature cards animation
    gsap.from('.feature', {
        scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)"
    });

    // Navigation background on scroll
    gsap.to('.jungle-nav', {
        scrollTrigger: {
            trigger: 'body',
            start: '100px top',
            end: 'max',
            toggleActions: 'play reverse play reverse'
        },
        backgroundColor: 'rgba(13, 46, 26, 0.95)',
        duration: 0.3
    });

    // Parallax effect for hero background
    gsap.to('.jungle-canopy', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 100,
        ease: "none"
    });

    // Floating leaves animation
    gsap.to('.floating-leaves::before, .floating-leaves::after', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
    });

    // Modal animations
    const modalEnter = (modal) => {
        gsap.fromTo(modal, 
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );
    };

    const modalExit = (modal) => {
        gsap.to(modal, {
            scale: 0.8,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in"
        });
    };

    // Add modal animation handlers
    document.addEventListener('DOMContentLoaded', () => {
        // Observe modal openings
        const modalObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const modal = mutation.target;
                    if (modal.style.display === 'block') {
                        const modalContent = modal.querySelector('.modal-content');
                        if (modalContent) {
                            modalEnter(modalContent);
                        }
                    }
                }
            });
        });

        document.querySelectorAll('.modal').forEach(modal => {
            modalObserver.observe(modal, { attributes: true });
        });
    });

    // Quiz option hover effects
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('.quiz-option')) {
            const option = e.target.closest('.quiz-option');
            gsap.to(option, {
                scale: 1.02,
                duration: 0.2,
                ease: "power2.out"
            });
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('.quiz-option')) {
            const option = e.target.closest('.quiz-option');
            gsap.to(option, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        }
    });

    // Animal card hover effects
    document.addEventListener('mouseenter', (e) => {
        if (e.target.closest('.animal-card')) {
            const card = e.target.closest('.animal-card');
            gsap.to(card, {
                y: -5,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    }, true);

    document.addEventListener('mouseleave', (e) => {
        if (e.target.closest('.animal-card')) {
            const card = e.target.closest('.animal-card');
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    }, true);

    // Scene button animations
    document.addEventListener('mouseenter', (e) => {
        if (e.target.closest('.scene-btn')) {
            const btn = e.target.closest('.scene-btn');
            if (!btn.classList.contains('active')) {
                gsap.to(btn, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: "power2.out"
                });
            }
        }
    });

    document.addEventListener('mouseleave', (e) => {
        if (e.target.closest('.scene-btn')) {
            const btn = e.target.closest('.scene-btn');
            if (!btn.classList.contains('active')) {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            }
        }
    });

    // CTA button animations
    document.addEventListener('mouseenter', (e) => {
        if (e.target.closest('.cta-button')) {
            const btn = e.target.closest('.cta-button');
            gsap.to(btn, {
                scale: 1.05,
                duration: 0.2,
                ease: "power2.out"
            });
        }
    });

    document.addEventListener('mouseleave', (e) => {
        if (e.target.closest('.cta-button')) {
            const btn = e.target.closest('.cta-button');
            gsap.to(btn, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        }
    });

    // Feature card animations on hover
    document.addEventListener('mouseenter', (e) => {
        if (e.target.closest('.feature')) {
            const feature = e.target.closest('.feature');
            gsap.to(feature, {
                y: -10,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });

    document.addEventListener('mouseleave', (e) => {
        if (e.target.closest('.feature')) {
            const feature = e.target.closest('.feature');
            gsap.to(feature, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });

    // Loading animation for images
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.fromTo(entry.target,
                    { opacity: 0, scale: 0.8 },
                    { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
                );
                imageObserver.unobserve(entry.target);
            }
        });
    });

    // Observe all images for lazy loading
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('img').forEach(img => {
            imageObserver.observe(img);
        });
    });

    // Text reveal animations
    const textReveal = (element) => {
        gsap.fromTo(element,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        );
    };

    // Animate section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    console.log('All GSAP animations configured successfully!');
}

// Initialize animations when DOM is loaded and GSAP is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for GSAP to load if it's from CDN
    if (typeof gsap !== 'undefined') {
        initGSAPAnimations();
    } else {
        // Retry after a short delay
        setTimeout(() => {
            if (typeof gsap !== 'undefined') {
                initGSAPAnimations();
            } else {
                console.warn('GSAP not available - animations disabled');
            }
        }, 1000);
    }
});

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initGSAPAnimations };
}