// Custom JavaScript for Subash's Portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Add active class to navigation links
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });

    // Animate skill progress bars on scroll
    const animateProgressBars = () => {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !bar.hasAttribute('data-animated')) {
                const width = bar.getAttribute('data-width') || bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                    bar.setAttribute('data-animated', 'true');
                }, 100);
            }
        });
    };

    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Trigger progress bar animation on scroll
    window.addEventListener('scroll', debounce(animateProgressBars, 100));

    // Initial call to animate visible progress bars
    animateProgressBars();

    // Form validation enhancement
    const contactForm = document.querySelector('form[action="/contact"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
                
                // Re-enable button after 3 seconds (in case of validation errors)
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = '<i class="bi bi-envelope-fill me-2"></i>Send Message';
                }, 3000);
            }
        });
    }

    // Typing animation for hero section
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const texts = ['Java Full Stack Developer', 'Spring Boot Enthusiast', 'Problem Solver', 'Code Craftsman'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeAnimation() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before next word
            }

            setTimeout(typeAnimation, typeSpeed);
        }

        typeAnimation();
    }

    // Fade in animation for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all cards for animation
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });

    // Project details modal functionality
    window.showProjectDetails = function(projectId) {
        const modal = document.getElementById('projectModal');
        if (modal) {
            const bsModal = new bootstrap.Modal(modal);
            const modalTitle = document.getElementById('projectModalTitle');
            const modalBody = document.getElementById('projectModalBody');
            
            // Project details data
            const projectDetails = {
                'hospital-management': {
                    title: 'Hospital Management System',
                    content: `
                        <div class="mb-3">
                            <h5>Project Overview</h5>
                            <p>A comprehensive hospital management system built with Spring Boot and MySQL. 
                            Features patient registration, doctor management, appointment scheduling, and medical records.</p>
                        </div>
                        <div class="mb-3">
                            <h5>Technologies Used</h5>
                            <span class="badge bg-primary me-2">Java</span>
                            <span class="badge bg-success me-2">Spring Boot</span>
                            <span class="badge bg-info me-2">MySQL</span>
                            <span class="badge bg-warning me-2">Thymeleaf</span>
                            <span class="badge bg-secondary me-2">Bootstrap</span>
                        </div>
                        <div class="mb-3">
                            <h5>Key Features</h5>
                            <ul>
                                <li>Patient registration and management</li>
                                <li>Doctor profile management</li>
                                <li>Appointment scheduling system</li>
                                <li>Medical records tracking</li>
                                <li>RESTful API endpoints</li>
                            </ul>
                        </div>
                    `
                },
                'prism': {
                    title: 'PRISM | Spider - Malware Detection System',
                    content: `
                        <div class="mb-3">
                            <h5>Project Overview</h5>
                            <p>PRISM is a comprehensive multi-layer security application developed as part of a collaborative project. 
                            The system focuses on malware detection for Linux environments using advanced scanning techniques.</p>
                        </div>
                        <div class="mb-3">
                            <h5>Technologies Used</h5>
                            <span class="badge bg-danger me-2">Security</span>
                            <span class="badge bg-primary me-2">Java</span>
                            <span class="badge bg-dark me-2">Linux</span>
                            <span class="badge bg-success me-2">API Integration</span>
                        </div>
                        <div class="mb-3">
                            <h5>Key Features</h5>
                            <ul>
                                <li>Multi-layer security scanning</li>
                                <li>Intelligent caching mechanisms</li>
                                <li>Linux environment optimization</li>
                                <li>Collaborative development approach</li>
                                <li>Advanced malware detection algorithms</li>
                            </ul>
                        </div>
                    `
                },
				'Personal Portfolio Website': {
				    title: 'Personal Portfolio Website',
				    content: `
				        <div class="mb-3">
				            <h5>Project Overview</h5>
				            <p>Professional portfolio website showcasing skills, projects, and experience.
							Built with Spring Boot backend and modern responsive frontend design with interactive features..</p>
				        </div>
				        <div class="mb-3">
				            <h5>Technologies Used</h5>
				            <span class="badge bg-danger me-2">Java</span>
				            <span class="badge bg-primary me-2">SpringBoot</span>
				            <span class="badge bg-dark me-2">Thymleaf</span>
				            <span class="badge bg-success me-2">BootStrap 5</span>
				        </div>
				        <div class="mb-3">
				            <h5>Key Features</h5>
				            <ul>
				                <li>Responsive design for all devices</li>
				                <li>Interactive contact form with validation</li>
				                <li>Skills showcase with progress bars</li>
				                <li>Project gallery with detailed descriptions</li>
				                <li>Professional layout and modern UI/UX</li>
				            </ul>
				        </div>
				    `
				}
				
            };
            
            const project = projectDetails[projectId];
            if (project && modalTitle && modalBody) {
                modalTitle.textContent = project.title;
                modalBody.innerHTML = project.content;
                bsModal.show();
            }
        }
    };

    // Initialize skill progress bars with data attributes
    const skillBars = document.querySelectorAll('.progress-bar');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        if (width) {
            bar.setAttribute('data-width', width);
        }
    });
});

// Additional utility functions
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Show success message
        const toast = document.createElement('div');
        toast.className = 'toast align-items-center text-white bg-success border-0 position-fixed top-0 end-0 m-3';
        toast.style.zIndex = '9999';
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <i class="bi bi-check-circle-fill me-2"></i>
                    Copied to clipboard!
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        document.body.appendChild(toast);
        
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        // Remove toast after hiding
        toast.addEventListener('hidden.bs.toast', () => {
            document.body.removeChild(toast);
        });
    });
}

// Dark mode toggle (optional feature)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// Initialize dark mode from localStorage
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}