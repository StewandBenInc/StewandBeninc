function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        if (cookie.trim().startsWith(`${name}=`)) {
            return cookie.trim().substring((`${name}=`).length);
        }
    }
    return null;
}
const availArrayOps = [{
        name: "weather",
        signinReq: false
    }, {
        name: "9thGradeStudyGuides",
        signinReq: false
    }, {
        signinReq: false,
        name: "8thGradeStudyGuides"
    }, {
        signinReq: false,
        name: "studyGuideSubmissions"
    },
    {
        signinReq: false,
        name: "planner"
    }, {
        signinReq: false,
        name: "studying"
    },
    {
        signinReq: true,
        name: "Chat"
    },
    {
        signinReq: true,
        name: "allRecipes"
    },
    {
        signinReq: true,
        name: "submitARecipe"
    },
    {
        signinReq: true,
        name: "dashboard"
    },
    {
        signinReq: true,
        name: "allBlogs"
    },{
        signinReq: false,
        name: "blog"
    }

]
document.addEventListener("DOMContentLoaded", () => {
    fetch("/FooterAndNav/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);
            if (getCookie("username")) {
                document.getElementById('signin').style.display = "none";
                document.getElementById('submit').style.display = "inline-block";
                document.getElementById('recipe').style.display = "none";
                document.getElementById('dashboard').style.display = "inline-block";
                document.getElementById('allRecipes').style.display = "inline-block";
                document.getElementById('submitARecipe').style.display = "inline-block";
                document.getElementById('chat').style.display = "inline-block";
                document.getElementById('allBlogs').style.display = "inline-block";
                document.getElementById('blog').style.display = "none";
                console.log("dashboard shown");
            }
            if (getCookie("admin") === "dskfhasdkjfhasdkjfhaskdfhaskdfhasddasdfasf") {
                document.getElementById('admin').style.display = "inline-block";
            }
            if (getCookie("mvp") === "true" || getCookie("admin") === "dskfhasdkjfhasdkjfhaskdfhaskdfhasddasdfasf") {
                document.getElementById('funtimes').style.display = "inline-block";
                document.getElementById('cloak').style.display = "inline-block";

            }
            if (getCookie("username") === "Levi" ) {
            document.getElementById('anais').style.display = "inline-block";
            }
            if (getCookie("idiot") === "true") {
                document.getElementById('funtimes').style.display = "inline-block";
                document.getElementById('cloak').style.display = "inline-block";

                console.log("youre an idiot");
            }
            for (let i = 0; i < availArrayOps.length; i++) {
                const name = availArrayOps[i].name;
                const el = document.getElementById(name);
                const cookieVal = getCookie(name);
                if (cookieVal == "false") {
                    el.style.display = "none";
                }
            }

            attachNavbarEvents(); // Reattach event listeners after inserting the HTML
            updateDisguisedButtonVisibility();
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
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
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

function toggleCloakOverlay() {
    fetch("/cloak.html")
        .then(response => response.text())
        .then(_html => {
            if (!document.getElementById("overlay")) {
                document.body.insertAdjacentHTML("beforeend", _html);
            }
            const overlayElem = document.getElementById("overlay");
            if (overlayElem) {
                overlayElem.style.display = "inline-block";
                console.log("Cloak overlay shown");
            } else {
                console.warn('Overlay element not found.');
            }
        });
}

function on() {
    document.getElementById("overlay").style.display = "block";
}

function offUpdate() {
    document.getElementById("updates").style.display = "none";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}
class ABC {
    constructor(config = {}) {
        this.type = config.type || "blank";
        this.url = config.url || "about:blank";
    }
    setType(type) {
        if (!type) return;
        this.type = type;
    }
    setUrl(url) {
        if (!url) return;
        this.url = url;
    }
    getCode() {
        return `<iframe style="height:100%; width: 100%; border: none; position: fixed; top: 0; right: 0; left: 0; bottom: 0; border: none" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation" src="` +
            this.url + `"></iframe>`
    }
    open() {
        if (this.type == "blank") {
            try {
                var page = window.open()
                page.document.body.innerHTML =
                    `<iframe style="height:100%; width: 100%; border: none; position: fixed; top: 0; right: 0; left: 0; bottom: 0; border: none" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation" src="` +
                    this.url + `"></iframe>`
                return page;
            } catch {}
        } else if (this.type == "blob") {
            try {
                var page = new Blob([
                    `<iframe style="height:100%; width: 100%; border: none; position: fixed; top: 0; right: 0; left: 0; bottom: 0; border: none" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation" src="` +
                    this.url + `"></iframe>`
                ], {
                    type: "text/html"
                })
                return window.open(URL.createObjectURL(page));
            } catch {}
        } else if (this.type == "overwrite") {
            try {
                document.body.innerHTML =
                    `<iframe style="height:100%; width: 100%; border: none; position: fixed; top: 0; right: 0; left: 0; bottom: 0; border: none" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation" src="` +
                    this.url + `"></iframe>`
                return false;
            } catch {}
        }
    }
}
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
//alert(urlParams.get("disable"))
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
if ((!inIframe()) && getCookie("cloak") && (!urlParams.get("disable"))) {
    //alert("ye")
    console.log(window.location.href);
    window.doCloak = true;
    if (cloak(window.location.href, true)) {
        window.location.replace("https://google.com");
    }
} else {
    if (!inIframe()) {
        document.cookie = "cloak=";
        window.doCloak = false;
    } else {
        window.doCloak = true;
    }
}

function cloak(url, absolute) {
    absolute = absolute || false;
    url = absolute ? url : window.location.href.replace(/\/$/, "") + url;
    if (window.doCloak) {
        //alert(url);
        //alert("Opening " + url)
        //Creates new ABC
        var page = new ABC({
            "type": "blank", //Blank, blob, or overwrite
            "url": url //Any url
        })
        //Set the type
        page.setType("blank");
        //Set the url
        page.setUrl(url);
        //Get iframe code
        page.getCode();
        //Open page
        var win = page.open();
        if (!win || win.closed || typeof win.closed == 'undefined') {
            document.cookie = "cloak=";
            window.doCloak = false;
            alert("Fatal Error:\n\nNAME: ERR_POPUP_BLOCKED\nDESCRIPTION: Allow pop-ups to enable tab cloaking.")
            return false;
        }
        return true;
    } else {
        window.open(url);
    }
}

function toggleCloak() {
    if (getCookie("cloak")) {
        document.cookie = "cloak=";
        window.doCloak = false;
        window.open(window.location);
        window.open("https://google.com", "_top");
    } else {
        document.cookie = "cloak=1";
        window.doCloak = true;
        window.location.reload();
    }
}
window.addEventListener("load", (event) => {
    if (getCookie("updates")!= "true") {
        fetch("/update.html")
            .then(response => response.text())
            .then(_html => {
                if (!document.getElementById("updates")) {
                    document.body.insertAdjacentHTML("beforeend", _html);
                }
                const overlayElem = document.getElementById("updates");
                if (overlayElem) {
                    overlayElem.style.display = "inline-block";
                    console.log("Update overlay shown");
                    document.cookie = "updates=true; path=/;";
                } else {
                    console.warn('Overlay element not found.');
                }
            });
    }
}
);
function updateDisguisedButtonVisibility() {
    const disguisedBtn = document.getElementById("disguised");
    if (getCookie("disguised") == "true") {
        disguisedBtn.style.display = "block";
    } else {
        disguisedBtn.style.display = "none";
    }
}


function undisguise() {
    document.cookie = `username=${getCookie("oldUsername")}; path=/;`;
           document.cookie = `admin=${getCookie("oldAdmin")}; path=/;`;
           document.cookie = `mvp=${getCookie("oldMvp")}; path=/;`;
           document.cookie = `idiot=${getCookie("oldIdiot")}; path=/;`;
           document.cookie = `disguised=; path=/;`;
           location.reload()
}
