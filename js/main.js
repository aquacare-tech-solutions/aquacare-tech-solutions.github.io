(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="fa fa-angle-right"></i>',
            '<i class="fa fa-angle-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:2
            },
            1200:{
                items:2
            }
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 5,
        time: 2000
    });


   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


})(jQuery);




document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(
        ".navbar .navbar-nav a.nav-link[href^='#']"
    );

    const sectionIds = [
        "home",
        "about",
        "services",
        "products",
        "testimonials",
        "contact"
    ];

    const sections = sectionIds
        .map(id => document.getElementById(id))
        .filter(section => section !== null);

    function setActiveLink(id) {
        navLinks.forEach(link => {
            const isActive = link.getAttribute("href") === "#" + id;
            link.classList.toggle("active", isActive);
        });
    }

    // Update active menu while scrolling
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            entries => {
                const visibleSections = entries
                    .filter(entry => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            a.boundingClientRect.top -
                            b.boundingClientRect.top
                    );

                if (visibleSections.length > 0) {
                    setActiveLink(visibleSections[0].target.id);
                }
            },
            {
                rootMargin: "-100px 0px -60% 0px",
                threshold: 0
            }
        );

        sections.forEach(section => observer.observe(section));
    }

    // Handle clicks and mobile menu
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            const id = this.getAttribute("href").slice(1);
            setActiveLink(id);

            const collapse = document.getElementById("navbarCollapse");

            if (
                collapse &&
                collapse.classList.contains("show") &&
                window.bootstrap
            ) {
                window.bootstrap.Collapse
                    .getOrCreateInstance(collapse)
                    .hide();
            }
        });
    });

    // Set initial active link
    const initialId = window.location.hash.slice(1);
    setActiveLink(
        sectionIds.includes(initialId) ? initialId : "home"
    );
});

