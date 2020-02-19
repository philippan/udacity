/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights sect in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */
/**
 * Define Global Variables
 *
 */
const main = document.querySelector("main");
const pageHeader = document.querySelector("header.page__header");
const navList = document.querySelector("#navbar__list");
const addButton = document.querySelector("button#addSect");
const removeButton = document.querySelector("button#removeSect");
const rewindButton = document.querySelector("button#rewind");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
/* inView() checks if a <sect> is in the viewport */
function inView() {
    let checker = [];
    let sects = document.querySelectorAll("section");
    for (let sect of sects) {
        let objectTop = sect.getBoundingClientRect().top;
        let objectBottom = sect.getBoundingClientRect().bottom - 60;
        let viewportHeight = window.innerHeight;
        if ((objectTop > 0 && objectTop < viewportHeight) || (objectBottom > 0 && objectBottom < viewportHeight)) {
            checker.push(true);
        } else {
            checker.push(false);
        }
    }
    return checker;
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */
// Build the nav
function navBuild() {
    navList.innerHTML = "";
    let sects = document.querySelectorAll("section");
    for (let sect of sects) {
        let sectName = sect.getAttribute("data-nav");
        let sectID = sect.getAttribute("id");
        let listNode = document.createElement("li");
        listNode.innerHTML = `<a class="menu__link" href="#${sectID}">${sectName}</a>`;
        navList.appendChild(listNode);
    }
    scrollBuild();
}
// Add scrollTo functionality to nav
function scrollBuild() {
    let navLinks = document.querySelectorAll("a.menu__link");
    for (let navLink of navLinks) {
        let destinationID = "section" + navLink.getAttribute("href") + " div.landing__container";
        let destinationEl = document.querySelector(destinationID);
        navLink.addEventListener("click", function(event) {
            event.preventDefault();
            destinationEl.scrollIntoView({
                block: "start",
                behavior: "smooth"
            });
        });
    }
}
// Decide which <sect> is the active one, esp. if multiple are in the viewport
function isActive() {

    let checker = inView();
    let sects = document.querySelectorAll("section");

    for (let i = 0; i < sects.length; i++) {
        if (checker[0] == true) {
            for (let sect of sects) {
                sect.classList.toggle("your-active-class", false);
            }
            sects[0].classList.toggle("your-active-class", true);
        } else {
            if (checker[i] == true && checker[i - 1] == false) {
                for (let sect of sects) {
                    sect.classList.toggle("your-active-class", false);
                }
                sects[i].classList.toggle("your-active-class", true);
            }
        }
    }
}
// Add section
function addSect() {
    let numSects = document.querySelectorAll("section").length;
    numSects++;
    let newSect = `
        <section id="section${numSects}" data-nav="Section ${numSects}">
          <div class="landing__container">
            <h2>Section ${numSects}</h2>
            <p>Proof that the nav links are dynamically generated based on content.</p>
          </div>
        </section>
    `;
    main.insertAdjacentHTML('beforeend', newSect);
    navBuild();
}
// Remove section
function removeSect() {
    let numSects = document.querySelectorAll("section").length;
    let targetSect = document.querySelector(`section#section${numSects}`);
    main.removeChild(targetSect);
    navBuild();
}
// Show rewind button if below fold
function rewindCheck() {
    let scrollRatio = window.scrollY / document.body.clientHeight;
    if (scrollRatio > 0.4) {
        rewindButton.classList.add("buttonVisible");
    } else {
        rewindButton.classList.remove("buttonVisible");
    }
}
// Rewind to top on clicks
function rewind() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
// Hide page header on scroll like mobile browsers
function pageHeaderCheck() {
    let isScrolling;
    window.addEventListener("scroll", function() {
        window.clearTimeout(isScrolling);
        pageHeader.classList.add("page__header__whileScroll");
        isScrolling = setTimeout(function() {
            pageHeader.classList.remove("page__header__whileScroll");
        }, 300);
    }, false);
}
/**
 * End Main Functions
 * Begin Events
 *
 */
// DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    navBuild();
});
// On scroll
document.addEventListener("scroll", function() {
    isActive();
    rewindCheck();
    pageHeaderCheck();
});
// On click
addButton.addEventListener("click", addSect);
removeButton.addEventListener("click", removeSect);
rewindButton.addEventListener("click", rewind);
