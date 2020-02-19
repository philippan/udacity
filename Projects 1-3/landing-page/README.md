# Landing Page Project

## Introduction

The Landing Page project is a development exercise to gain familiarity with common DOM interfaces, properties, and methods and when to the use them to scale code and enhance the user experience. These include:

* .addEventListener()
* .querySelectorAll()
* for...of loop
* template literals
* .setTimeout()

## Active Sections

One challenge was letting users know which section they were on. I used the .addEventListener() to trigger a function that would check if a section were in a viewport. After that another function decides whether More than one section, however, could be in the viewport at once.

```
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
```


## Dynamically Generated Nav Links

Needing to update the HTML whenever a new section is not scalable. I relied on a combination of the .querySelectorAll() method, for...of loop, and object literals to collect existing and new sections, save their attributes, and create link names and hrefs.

```
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
```


## Responsive Header

Using the .addEventListener() method to hide the header on scroll is straightforward. However, revealing the header when not scrolling is not straightforward because vanilla JS doesn't have a method for determining that scrolling has ended.

As a workaround I set a timer that assumed would assume scrolling ended within a second. The timer, however, would be continually reset until scrolling actually ended, i.e., the .addEventListner() stopped firing. I  relied on the .setTimeout() and .clearTimeout() methods to accomplish this.

```
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
```
