const navLinks = document.querySelectorAll(".nav-link");
const windowPathName = window.location.pathname;
console.log(navLinks    )
navLinks.forEach((link) => {
    const navLinkPathName = new URL(link.href).pathname

    if(windowPathName === navLinkPathName){
        link.classList.add("active")
    }
});
