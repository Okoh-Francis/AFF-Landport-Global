/* ========================================
   1. MOBILE NAVIGATION MENU
======================================== */

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");


// Open and close the mobile menu

if (menuToggle && navMenu)
{
    menuToggle.addEventListener("click", function ()
    {
        navMenu.classList.toggle("active");

        const menuIsOpen = navMenu.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", menuIsOpen);

        menuToggle.setAttribute(
            "aria-label",
            menuIsOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });


    // Close the menu when a navigation link is clicked

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(function (link)
    {
        link.addEventListener("click", function ()
        {
            navMenu.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        });
    });


    // Close the menu when clicking outside it

    document.addEventListener("click", function (event)
    {
        const clickedInsideMenu = navMenu.contains(event.target);

        const clickedMenuButton = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedMenuButton)
        {
            navMenu.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }
    });


    // Close the mobile menu when the screen becomes larger

    window.addEventListener("resize", function ()
    {
        if (window.innerWidth > 900)
        {
            navMenu.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
}


/* ========================================
   2. AUTOMATIC COPYRIGHT YEAR
======================================== */

const currentYear = document.getElementById("currentYear");

if (currentYear)
{
    currentYear.textContent = new Date().getFullYear();
}


/* ========================================
   3. SCROLL REVEAL ANIMATIONS
======================================== */

// Select the sections and cards to animate

const revealElements = document.querySelectorAll(
    ".about-content, " +
    ".about-image, " +
    ".service-card, " +
    ".property-card, " +
    ".realtor-content, " +
    ".realtor-image, " +
    ".contact-content, " +
    ".contact-form-wrapper"
);


// Add the reveal class to each element

revealElements.forEach(function (element)
{
    element.classList.add("reveal");
});


// Check whether the browser supports IntersectionObserver

if ("IntersectionObserver" in window)
{
    const revealObserver = new IntersectionObserver(
        function (entries, observer)
        {
            entries.forEach(function (entry)
            {
                if (entry.isIntersecting)
                {
                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );


    // Observe every selected element

    revealElements.forEach(function (element)
    {
        revealObserver.observe(element);
    });
}
else
{
    // Show all content in older browsers

    revealElements.forEach(function (element)
    {
        element.classList.add("revealed");
    });
}


/* ========================================
   4. ACTIVE NAVIGATION LINK
======================================== */

const pageSections = document.querySelectorAll(
    "main section[id]"
);


function updateActiveNavigation()
{
    let currentSection = "home";

    pageSections.forEach(function (section)
    {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop)
        {
            currentSection = section.id;
        }
    });


    const allNavLinks = document.querySelectorAll(".nav-link");

    allNavLinks.forEach(function (link)
    {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection)
        {
            link.classList.add("active");
        }
    });
}


window.addEventListener("scroll", updateActiveNavigation);

window.addEventListener("load", updateActiveNavigation);


/* ========================================
   5. CONTACT FORM
======================================== */

// Find the contact form elements

const contactForm = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");


// Handle form submission

if (contactForm && formMessage)
{
    contactForm.addEventListener("submit", function (event)
    {
        // Stop the browser from reloading the page

        event.preventDefault();


        // Check whether the form fields are valid

        if (!contactForm.checkValidity())
        {
            contactForm.reportValidity();

            return;
        }


        // Collect the information entered by the visitor

        const visitorName = document.getElementById("name").value.trim();

        const visitorEmail = document.getElementById("email").value.trim();

        const visitorInterest = document.getElementById("interest").value;

        const visitorMessage = document.getElementById("message").value.trim();


        // Check that the visitor entered the required information

        if (
            !visitorName ||
            !visitorEmail ||
            !visitorInterest ||
            !visitorMessage
        )
        {
            formMessage.textContent =
                "Please complete all fields before continuing.";

            return;
        }


        // Explain the current submission status

        formMessage.textContent =
            "Your details have been entered, but this website is not yet connected to AFF's enquiry service. Your message has not been sent.";


        // Prepare the enquiry for later integration

        const enquiry = {
            name: visitorName,
            email: visitorEmail,
            interest: visitorInterest,
            message: visitorMessage
        };


        // Keep the enquiry available for development testing

        console.log("AFF Property Enquiry:", enquiry);
    });
}


/* ========================================
   6. WHATSAPP BUTTON
======================================== */

// The official AFF WhatsApp number has not been configured yet.
// Replace the placeholder with the company's verified number
// when it becomes available.


const whatsappButton = document.querySelector(".whatsapp-button");


if (whatsappButton)
{
    whatsappButton.addEventListener("click", function (event)
    {
        const whatsappNumber = "";

        if (!whatsappNumber)
        {
            event.preventDefault();

            alert(
                "The AFF WhatsApp number has not been configured yet."
            );
        }
    });
}