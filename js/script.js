document.addEventListener('DOMContentLoaded', () => {
    
    // 1. DYNAMIC YEAR
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // 2. TYPING EFFECT FOR HERO PARAGRAPH
    const typedTextElement = document.getElementById('typedText');
    const fullText = "I architect robust ETL pipelines, build modular backend systems, and design interactive dashboards that drive business decisions.";
    
    if (typedTextElement) {
        let charIndex = 0;
        
        function typeText() {
            if (charIndex < fullText.length) {
                typedTextElement.textContent += fullText.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 20);
            }
        }
        
        setTimeout(typeText, 800);
    }

    // 3. NAVBAR SCROLL & SCROLL SPY - FIXED
    const navbar = document.getElementById('navbar');
    const floatingLogo = document.getElementById('floatingLogo');
    const floatingResume = document.getElementById('floatingResumeBtn');
    const progressBar = document.getElementById('progressBar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + "%";

        // Navbar Toggle (Only for Home Page)
        const isHomePage = document.getElementById('hero');
        
        if (isHomePage && navbar) {
            if (scrollY > 100) {
                navbar.classList.add('visible');
                // Hide floating elements when navbar is visible
                if (floatingLogo) floatingLogo.style.opacity = '0';
                if (floatingResume) {
                    floatingResume.style.opacity = '0';
                    floatingResume.style.pointerEvents = 'none'; // ADDED: Explicitly disable clicks
                    floatingResume.style.visibility = 'hidden'; // ADDED: Hide completely
                }
            } else {
                navbar.classList.remove('visible');
                // Show floating elements when navbar is hidden
                if (floatingLogo) floatingLogo.style.opacity = '1';
                if (floatingResume) {
                    floatingResume.style.opacity = '1';
                    floatingResume.style.pointerEvents = 'auto'; // ADDED: Re-enable clicks
                    floatingResume.style.visibility = 'visible'; // ADDED: Show again
                }
            }
        }

        // Scroll Spy
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    });

    // 4. PROFILE 3D TILT WITH PARALLAX
    const profileCard = document.getElementById('profileCard');
    const profileContainer = document.querySelector('.profile-container');
    
    if (profileCard && profileContainer) {
        profileContainer.addEventListener('mousemove', (e) => {
            const rect = profileContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        profileContainer.addEventListener('mouseleave', () => {
            profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    }

    // 5. SCROLL-TRIGGERED ANIMATIONS (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.fade-in-up, .stagger-item').forEach(el => {
        fadeInObserver.observe(el);
    });

    // 6. STAGGER ANIMATIONS
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(container => {
        const items = container.querySelectorAll('.stagger-item');
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // 7. MOBILE MENU
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', (e) => { // FIXED: Added 'e' parameter
            e.stopPropagation();
            
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // 8. MODAL
    const modal = document.getElementById('resumeModal');
    const openBtns = [
        document.getElementById('resumeBtn'), 
        document.getElementById('floatingResumeBtn'), 
        document.getElementById('mobileResumeBtn')
    ];
    const closeBtn = document.querySelector('.modal-close');

    openBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (modal) modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                if (mobileMenu) mobileMenu.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            });
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (modal) modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // 9. SMOOTH SCROLL FOR ANCHOR LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 10. MAGNETIC BUTTON EFFECT
    const magneticButtons = document.querySelectorAll('.btn-magnetic');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // 11. PARALLAX SCROLL EFFECT ON HERO (DESKTOP ONLY)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-text');
        const profileCard = document.querySelector('.profile-card');
        
        // Only apply parallax on desktop (window width > 768px)
        const isDesktop = window.innerWidth > 768;
        
        if (isDesktop && heroContent && scrolled < 800) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / 800);
        } else if (heroContent) {
            // Reset on mobile
            heroContent.style.transform = '';
            heroContent.style.opacity = '';
        }
        
        if (isDesktop && profileCard && scrolled < 800) {
            profileCard.style.transform = `translateY(${scrolled * 0.15}px)`;
        } else if (profileCard) {
            // Reset on mobile
            profileCard.style.transform = '';
        }
    });

    // 12. CURSOR SPOTLIGHT EFFECT IN HERO SECTION
    const heroSection = document.querySelector('.hero-section');
    const heroSpotlight = document.getElementById('heroSpotlight');
    
    if (heroSection && heroSpotlight) {
        let mouseX = 0;
        let mouseY = 0;
        let spotlightX = 0;
        let spotlightY = 0;
        
        heroSection.addEventListener('mouseenter', () => {
            heroSpotlight.classList.add('active');
        });
        
        heroSection.addEventListener('mouseleave', () => {
            heroSpotlight.classList.remove('active');
        });
        
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });
        
        // Smooth spotlight animation with easing
        function animateSpotlight() {
            const dx = mouseX - spotlightX;
            const dy = mouseY - spotlightY;
            
            spotlightX += dx * 0.1;
            spotlightY += dy * 0.1;
            
            heroSpotlight.style.left = spotlightX + 'px';
            heroSpotlight.style.top = spotlightY + 'px';
            heroSpotlight.style.transform = 'translate(-50%, -50%)';
            
            requestAnimationFrame(animateSpotlight);
        }
        
        animateSpotlight();
    }
    
    // 13. FADE-IN ANIMATIONS FOR PROJECT PAGE CARDS
    if (document.querySelector('.content-card') || document.querySelector('.process-card')) {
        const projectObserverOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const projectFadeObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add slight delay for stagger effect
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-visible');
                    }, index * 100);
                }
            });
        }, projectObserverOptions);

        // Observe all project cards
        document.querySelectorAll('.content-card, .process-card').forEach(card => {
            projectFadeObserver.observe(card);
        });
    }

    // 14. HIDE VERTICAL SOCIALS ON SCROLL DOWN
    const contactSection = document.querySelector('.contact-section');
    const sidebarSocials = document.querySelector('.vertical-socials');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If contact section is visible (even 10% of it)
            if (entry.isIntersecting) {
                sidebarSocials.classList.add('hide-socials');
            } else {
                sidebarSocials.classList.remove('hide-socials');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the contact section is visible
    });

    if (contactSection) {
        observer.observe(contactSection);
    }
});