document.addEventListener('DOMContentLoaded', function() {

    // Typed.js for the typing animation in the hero section
    if (document.getElementById('typed-text')) {
        var typed = new Typed('#typed-text', {
            strings: ['Web Developer', 'UI/UX Designer', 'IT Professional', 'Student', 'Innovative Dev'],
            typeSpeed: 75,
            backSpeed: 35,
            loop: true,
            smartBackspace: true,
        });
    }

    // ScrollReveal for revealing elements on scroll
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1500,
        delay: 200,
        reset: false, // Animations will only happen once
    });

    sr.reveal('.reveal');

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

});
