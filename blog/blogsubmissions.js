//equivalent to submissions.js
const firebaseConfig = {
    apiKey: "AIzaSyD3TekvWYk7yGLcmX3P6L-UF3Y9BrF7T94",
    authDomain: "stewandbeninc-d4f92.firebaseapp.com",
    projectId: "stewandbeninc-d4f92",
    storageBucket: "stewandbeninc-d4f92.firebasestorage.app",
    messagingSenderId: "619253654409",
    appId: "1:619253654409:web:2442006d870a0cdff1b758",
    measurementId: "G-SVWPC4TKZK"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const params = new URLSearchParams(window.location.search);
const title = params.get("name");

function getSubmissions() {
    if (title === "null") {
        const list = document.getElementById("guide-list");
        db.collection("blog").orderBy(firebase.firestore.FieldPath.documentId()).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const data = doc.data();
                    list.innerHTML += `<li><a href="blogtemplate.html?name=${doc.id}"><h3>${doc.id} by, ${data.name} </h3></a></li>`;
                });
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }
}

async function loadGuide() {
    if (title && title !== "null") {
        const doc = await db.collection("blog").doc(title).get();
        const data = doc.data();

        document.getElementById("title").innerHTML =
            `©Stew and Ben inc.®™ | Blog | ${doc.id} by ${data.name}`;
        document.getElementById("name").innerHTML =
            `${doc.id} by ${data.name}`;

        const headings = data.headings || [];
        const guideContent = document.getElementById("guide-content");
        guideContent.innerHTML = "";

        headings.forEach((heading) => {
            const h2 = document.createElement("h2");
            h2.textContent = heading; // keep it raw text
            h2.classList.add("preserve-whitespace"); // apply CSS rule
            guideContent.appendChild(h2);
        });
    }
}



window.onload = async function () {
    getSubmissions();
    await loadGuide();

    const dropdowns = document.querySelectorAll(".dropdown-toggle");
    dropdowns.forEach(toggle => {
        toggle.addEventListener("click", function () {
            const dropdown = toggle.closest(".dropdown");
            dropdown.classList.toggle("active");

            const footer = document.querySelector(".footer");
            const body = document.body;
            const isContentShort = body.scrollHeight <= window.innerHeight;

            if (isContentShort) {
                footer.style.position = "fixed";
                footer.style.bottom = "0";
                footer.style.left = "0";
                footer.style.width = "100%";
                body.style.overflow = 'hidden';
            } else {
                footer.style.position = "relative";
                body.style.overflow = 'auto';
            }
        });
    });
};
