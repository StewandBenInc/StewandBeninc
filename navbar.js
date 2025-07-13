function getCookie(name) {
    const cookies = document.cookie.split(';');
    for(const cookie of cookies) {
        if (cookie.trim().startsWith(`${name}=`)) {
            return cookie.trim().substring((`${name}=`).length);
        }
    }
    return null;
}

document.addEventListener("DOMContentLoaded", () => {
    fetch("/FooterAndNav/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);
            if(getCookie("username")) {
                document.getElementById('signin').style.display = "none";
                document.getElementById('submit').style.display = "none";
                document.getElementById('recipe').style.display = "none";
                document.getElementById('dashboard').style.display = "inline-block";
                document.getElementById('recipesubmit').style.display = "inline-block";
                document.getElementById('chat').style.display = "inline-block";
                console.log("dashboard shown");
            }
            if(getCookie("admin") === "true") {
                document.getElementById('admin').style.display = "inline-block";
            }
            if(getCookie("mvp") === "true" || getCookie("admin") === "true") { 
                document.getElementById('mvp').style.display = "inline-block";
            }
            if(getCookie("idiot") === "true"){
                document.getElementById('mvp').style.display = "inline-block";
                console.log("youre an idiot");
            }
            attachNavbarEvents(); // Reattach event listeners after inserting the HTML
        });
    fetch("/FooterAndNav/cookie.html")
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML("beforeend", data);
        console.log(getCookie("cookiesAccepted"))
        if (getCookie("cookiesAccepted") === "true") {
            document.getElementById("cookie-consent").style.display = "none";
            console.log("Cookies accepted");
        }
    }); 
});

function attachNavbarEvents() {
    const menuIcon = document.querySelector('.menuIcon');
    const nav = document.querySelector('.overlay-menu');

    menuIcon.addEventListener('click', () => {
        if (nav.style.transform !== 'translateX(0%)') {
            nav.style.transform = 'translateX(0%)';
            nav.style.transition = 'transform 0.2s ease-out';
        } else {
            nav.style.transform = 'translateX(-100%)';
            nav.style.transition = 'transform 0.2s ease-out';
        }
    });

    // Toggle Menu Icon
    const toggleIcon = document.querySelector('.menuIcon');

    toggleIcon.addEventListener('click', () => {
        if (toggleIcon.className !== 'menuIcon toggle') {
            toggleIcon.className += ' toggle';
        } else {
            toggleIcon.className = 'menuIcon';
        }
    });
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

function acceptCookies() {
    setCookie("cookiesAccepted", "true", 365);
    document.getElementById("cookie-consent").style.display = "none";
}

function denyCookies() {
    alert("You denied cookies. This page will now close.");
    window.location.href = "https://www.google.com";
}