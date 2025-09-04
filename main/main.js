document.addEventListener('DOMContentLoaded', function() {

    // Page loading animation
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                pageLoader.classList.add('hidden');
                setTimeout(() => {
                    pageLoader.remove();
                }, 500);
            }, 1000); // Show loader for at least 1 second
        });
    }

    // Typed.js for the typing animation in the hero section
    if (document.getElementById('typed-text')) {
        var typed = new Typed('#typed-text', {
            strings: ['Web Developer', 'UI/UX Designer', 'IT Professional', 'Student', 'Innovative Dev', 'Linux Enthusiast'],
            typeSpeed: 75,
            backSpeed: 35,
            loop: true,
            smartBackspace: true,
            cursorChar: '|'
        });
    }

    // Create floating particles
    function createFloatingParticles() {
        const particleCount = 15;
        const body = document.body;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
            body.appendChild(particle);
        }
    }
    
    createFloatingParticles();

    // Enhanced ScrollReveal for revealing elements on scroll
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1500,
        delay: 200,
        reset: false,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    });

    sr.reveal('.reveal', { interval: 100 });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', scrollActive);

    // Resume download functionality
    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show download animation
            const downloadIcon = this.querySelector('.download-icon');
            downloadIcon.style.animation = 'bounce 1s infinite';
            
            // Check if resume file exists, otherwise show notification
            const resumePath = '/assets/Raunak_Resume.pdf';
            
            // Create a temporary link to check if file exists
            fetch(resumePath, { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        // File exists, proceed with download
                        const link = document.createElement('a');
                        link.href = resumePath;
                        link.download = 'Raunak_Resume.pdf';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        showNotification('Resume downloaded successfully! 📄', 'success');
                    } else {
                        throw new Error('File not found');
                    }
                })
                .catch(() => {
                    // File doesn't exist, show info message
                    showNotification('Resume download will be available soon! Please add your resume.pdf to the assets folder. 📄', 'info');
                });
            
            // Reset animation after 3 seconds
            setTimeout(() => {
                downloadIcon.style.animation = '';
            }, 3000);
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: rgba(31, 41, 55, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 10px;
            color: white;
            border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: none;
                    border: none;
                    color: #9ca3af;
                    cursor: pointer;
                    font-size: 18px;
                    padding: 0;
                    margin-left: auto;
                ">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mouse parallax effect for hero section
    const hero = document.querySelector('#home');
    if (hero) {
        hero.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            
            const heroImage = hero.querySelector('.w-80, .lg\\:w-96');
            if (heroImage) {
                heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
                heroImage.style.transition = 'transform 0.1s ease-out';
            }
        });
        
        hero.addEventListener('mouseleave', function() {
            const heroImage = hero.querySelector('.w-80, .lg\\:w-96');
            if (heroImage) {
                heroImage.style.transform = 'translate(0, 0)';
                heroImage.style.transition = 'transform 0.3s ease-out';
            }
        });
    }

    // Add magnetic effect to buttons and cards
    function addMagneticEffect(elements) {
        elements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transition = 'transform 0.1s ease';
            });
            
            element.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0) scale(1)';
                this.style.transition = 'transform 0.3s ease';
            });
        });
    }

    // Apply magnetic effect to cards and buttons
    const magneticElements = document.querySelectorAll('.glass-card, .resume-btn, .project-card');
    addMagneticEffect(magneticElements);

    // Hero image interaction
    const heroImageContainer = document.querySelector('.hero-image-container');
    if (heroImageContainer) {
        heroImageContainer.addEventListener('click', function() {
            showNotification('Hello there! 👋 Thanks for checking out my profile!', 'success');
            
            // Add a fun bounce animation
            this.style.animation = 'bounce 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    }

    // Add loading animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Enhanced project card interactions
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or notifications
            document.querySelectorAll('.notification').forEach(notification => {
                notification.remove();
            });
            // Close mobile menu
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.querySelector('svg').innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            }
        }
        
        // Easter egg: Press 'p' for party mode
        if (e.key === 'p' && e.ctrlKey) {
            e.preventDefault();
            activatePartyMode();
        }
    });

    // Easter egg: Party mode
    function activatePartyMode() {
        showNotification('🎉 Party Mode Activated! Press Ctrl+P again to disable.', 'success');
        
        const body = document.body;
        body.style.filter = 'hue-rotate(0deg)';
        
        let hue = 0;
        const partyInterval = setInterval(() => {
            hue += 10;
            body.style.filter = `hue-rotate(${hue}deg)`;
            
            if (hue >= 360) {
                hue = 0;
            }
        }, 100);
        
        // Add rainbow cursor trail
        let isPartyMode = true;
        const cursorTrail = [];
        
        const trailHandler = (e) => {
            if (!isPartyMode) return;
            
            const trail = document.createElement('div');
            trail.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: hsl(${Math.random() * 360}, 70%, 60%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${e.clientX - 5}px;
                top: ${e.clientY - 5}px;
                animation: trailFade 1s ease-out forwards;
            `;
            
            document.body.appendChild(trail);
            cursorTrail.push(trail);
            
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.remove();
                }
                cursorTrail.splice(cursorTrail.indexOf(trail), 1);
            }, 1000);
        };
        
        document.addEventListener('mousemove', trailHandler);
        
        // Add trail fade animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes trailFade {
                from {
                    opacity: 0.8;
                    transform: scale(1);
                }
                to {
                    opacity: 0;
                    transform: scale(0);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Disable party mode with Ctrl+P again
        const disableParty = (e) => {
            if (e.key === 'p' && e.ctrlKey) {
                e.preventDefault();
                isPartyMode = false;
                clearInterval(partyInterval);
                body.style.filter = 'none';
                document.removeEventListener('mousemove', trailHandler);
                document.removeEventListener('keydown', disableParty);
                cursorTrail.forEach(trail => {
                    if (trail.parentNode) {
                        trail.remove();
                    }
                });
                style.remove();
                showNotification('Party mode disabled! 🎉➡️😴', 'info');
            }
        };
        
        document.addEventListener('keydown', disableParty);
    }

    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        scrollActive();
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });

    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Animate the hamburger menu
            const svg = this.querySelector('svg');
            if (mobileMenu.classList.contains('hidden')) {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            } else {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
            }
        });
        
        // Close mobile menu when clicking on a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.querySelector('svg').innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            });
        });
    }

    console.log('🚀 Enhanced interactive features loaded successfully!');
});
