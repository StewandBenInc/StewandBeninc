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
        list = document.getElementById("guide-list");
        db.collection("recipes").get()
        db.collection("recipes").orderBy(firebase.firestore.FieldPath.documentId()).get()
        .then(snapshot => {
        snapshot.forEach(doc => {
            console.log(doc);
            list.innerHTML += `<li><a href="recipetemplate.html?name=${doc.id}"><h3>${doc.id} by, ${doc.data().name} Subject: ${doc.data().subject}</h3></a></li>`;
        });
        })
        .catch(error => {
        console.error("Error fetching data: ", error);
        });
    }
}
async function loadGuide() {
    console.log("notin");
    if (title !== "null") {
        console.log("in");
        const doc = await db.collection("recipes").doc(title).get();
        let data = doc.data();
        console.log(data);
        document.getElementById("title").innerHTML = `©Stew and Ben inc.®™ | Community Submitted Recipes | ${doc.id} by ${data.name}`;
        document.getElementById("name").innerHTML = `${doc.id} by ${data.name}`;
        let realData = data.data;
        const headingKeys = Object.keys(realData).sort((a, b) => a.localeCompare(b));
        headingKeys.forEach(heading => {
            document.getElementById("guide-content").innerHTML += `<ul class="dropdown"><h2 class="dropdown-toggle">${realData[heading].name}</h2><div class="dropdown-content" id="${heading}">`;
            const subKeys = Object.keys(realData[heading]["subheadings"]).sort((a, b) => a.localeCompare(b));
            subKeys.forEach(subheading => {
                document.getElementById(`${heading}`).innerHTML += `<h3>${realData[heading]["subheadings"][subheading].name}</h3>`;
                const items = realData[heading]["subheadings"][subheading]["items"];
                const itemKeys = Array.isArray(items) ? Object.keys(items) : Object.keys(items).sort((a, b) => a.localeCompare(b));
                itemKeys.forEach(item => {
                    const value = Array.isArray(items) ? items[item] : items[item];
                    document.getElementById(`${heading}`).innerHTML += `<li>${value}</li>`;
                });
                document.getElementById("guide-content").innerHTML += `</div>`;
            });
            document.getElementById("guide-content").innerHTML += `</ul>`;
        });
    }
}

window.onload = async function() {
     getSubmissions();
    await loadGuide();
    
    const dropdowns = document.querySelectorAll(".dropdown-toggle");

    dropdowns.forEach(toggle => {
        toggle.addEventListener("click", function() {
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
