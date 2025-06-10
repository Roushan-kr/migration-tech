// Initialize Swiper
var slider = new Swiper(".gallery-slider" ,{
    slidesPerView: 1,
    loop : true,
    loopedSlides: 4,
    noSwiping: true,
    noSwipingClass: "swiper-slide",
    autoplay: {
        delay: 3000, // 3 seconds between slides
        disableOnInteraction: false, // continue autoplay after user interaction
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    }
});

var thumbs = new Swiper(".gallery-thumbs", {
    slidesPerView: "auto",
    spaceBetween: 10,
    centeredSlides: false,
    loop: true,
    slideToClickedSlide: true,
});    

slider.controller.control = thumbs;
thumbs.controller.control = slider;

// // Update Locomotive Scroll when Swiper changes
// slider.on('slideChange', () => {
//     scroll.update();
// });

// // Add scroll-based animations
// scroll.on('scroll', (args) => {
//     // Add any additional scroll-based animations here
//     const elements = document.querySelectorAll('[data-scroll]');
//     elements.forEach(element => {
//         const speed = element.getAttribute('data-scroll-speed') || 1;
//         const delay = element.getAttribute('data-scroll-delay') || 0;
        
//         if (element.getAttribute('data-scroll') === 'true') {
//             element.style.transform = `translateY(${args.scroll.y * speed}px)`;
//             element.style.transitionDelay = `${delay}s`;
//         }
//     });
// });

// // Initialize scroll animations
// scroll.on('load', () => {
//     const elements = document.querySelectorAll('[data-scroll]');
//     elements.forEach(element => {
//         element.setAttribute('data-scroll', 'true');
//     });
// });

// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');

    // Add animation delay to form elements
    inputs.forEach((input, index) => {
        input.style.animationDelay = `${index * 0.1}s`;
    });

    // Form validation and submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            whatsapp: document.getElementById('whatsapp').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value, 
            'g-recaptcha-response': (typeof grecaptcha !== 'undefined' && grecaptcha.getResponse) ? grecaptcha.getResponse() : ''
        };

        // Validate form
        if (validateForm(formData)) {
            // Show success message
            fetch('https://formspree.io/f/xzzrqnnq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.ok) {
                    showNotification('Message sent successfully!', 'success');
                    contactForm.reset();
                } else {
                    showNotification('Error sending message. Please try again later.', 'error');
                    console.error('Error:', response.statusText);
                }
            })
            .catch(error => {
                showNotification('Error sending message. Please try again later.', 'error');
                console.error('Error:', error);
            });
        }
    });

    // Form validation function
    function validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[\d\s-]{10,}$/;

        if (!data.name || data.name.length < 2) {
            showNotification('Please enter a valid name', 'error');
            return false;
        }

        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return false;
        }

        if (data.phone && !phoneRegex.test(data.phone)) {
            showNotification('Please enter a valid phone number', 'error');
            return false;
        }

        if (!data.message || data.message.length < 10) {
            showNotification('Please enter a message (minimum 10 characters)', 'error');
            return false;
        }

        return true;
    }






    
    // Notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 25px',
            borderRadius: '5px',
            color: 'white',
            backgroundColor: type === 'success' ? '#4CAF50' : '#f44336',
            zIndex: '1000',
            animation: 'slideIn 0.5s forwards'
        });

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s forwards';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }

    // Add input animations
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('input-focused');
            }
        });
    });

    // Add scroll reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    // Observe form elements
    document.querySelectorAll('.form-group, .info-item').forEach(el => {
        observer.observe(el);
    });
});


window.onload = function() { 
  var el = document.getElementById('g-recaptcha-response'); 
  if (el) { 
    el.setAttribute('required', 'required'); 
  } 
};






// Course Cards Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize course cards animations
    const courseCards = document.querySelectorAll('.course-card');
    
    // Add entrance animations to cards
    courseCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        
        // Add click interaction
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px)';
            }, 150);
        });

        // Add hover interactions
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Animate cards when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    courseCards.forEach(card => observer.observe(card));

    // Animate header text
    const header = document.querySelector('.internship-header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(30px)';
        header.style.transition = 'all 0.8s ease';

        setTimeout(() => {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 300);
    }

    // Course count hover effect
    const courseCounts = document.querySelectorAll('.course-count');
    courseCounts.forEach(count => {
        count.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });

        count.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add course icons animation
    const courseIcons = document.querySelectorAll('.course-icon');
    courseIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(10deg) scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0) scale(1)';
        });
    });

    // Add course titles animation
    const courseTitles = document.querySelectorAll('.course-title');
    courseTitles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.style.color = '#0066ff';
            this.style.transition = 'color 0.3s ease';
        });

        title.addEventListener('mouseleave', function() {
            this.style.color = 'initial';
        });
    });

    // Add responsive grid handling
    function handleResponsiveGrid() {
        const grid = document.querySelector('.courses-grid');
        if (!grid) return;

        const width = window.innerWidth;
        if (width <= 640) {
            grid.style.gridTemplateColumns = '1fr';
        } else if (width <= 1024) {
            grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
            grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
        }
    }

    // Listen for window resize
    window.addEventListener('resize', handleResponsiveGrid);
    // Initial call
    handleResponsiveGrid();
});







//this is for header scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.main-container');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
            if (currentScroll > 50) {
                header.style.minHeight = '4vw';
                header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.minHeight = '6vw';
                header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            }
        }
        lastScroll = currentScroll;
    });

    // Nav items hover effect
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Search input animation
    const searchInput = document.querySelector('.right-part input');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    }
});







//this file is for the page 4document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });

    // Observe elements
    document.querySelectorAll('.title-animate, .image-section, .text-section, .feature-item')
        .forEach(el => observer.observe(el));

    // Counter animation for stats
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const duration = 2000; // 2 seconds
        const interval = duration / 100;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = `${target}K+`;
                clearInterval(counter);
            } else {
                element.textContent = `${Math.floor(current)}K+`;
            }
        }, interval);
    }

    // Start counter animation when stats card is visible
    const statsNumber = document.querySelector('.stats-number');
    if (statsNumber) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounter(statsNumber, 20);
                statsObserver.disconnect();
            }
        });
        statsObserver.observe(statsNumber);
    }

    // Hover effects for image
    const imageContainer = document.querySelector('.image-container');
    if (imageContainer) {
        imageContainer.addEventListener('mouseenter', () => {
            imageContainer.style.transform = 'scale(1.02)';
        });
        
        imageContainer.addEventListener('mouseleave', () => {
            imageContainer.style.transform = 'scale(1)';
        });
    }




    
document.addEventListener('DOMContentLoaded', function() {
    // Stagger animation for footer sections
    const footerSections = document.querySelectorAll('.footer-section');
    footerSections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.2}s`;
    });

    // Smooth scroll for footer links
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    footerSections.forEach(section => {
        observer.observe(section);
    });

    // Social media link click handling
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('href').substring(1);
            
            // Add your social media URLs here
            const socialUrls = {
                linkedin: 'https://linkedin.com/company/your-company',
                twitter: 'https://twitter.com/your-handle',
                youtube: 'https://youtube.com/your-channel',
                telegram: 'https://t.me/your-channel',
                whatsapp: 'https://wa.me/your-number'
            };

            if (socialUrls[platform]) {
                window.open(socialUrls[platform], '_blank');
            }
        });
    });
});
