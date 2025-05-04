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

function isValidTitle(t) {
    return t && t !== "null" && t.trim() !== "";
}

function getSubmissions() {
    const list = document.getElementById("guide-list");
    db.collection("recipes").get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                list.innerHTML += `<li><a href="recipetemplate.html?name=${doc.id}"><h3>${doc.id} by, ${doc.data().name}</h3></a></li>`;
            });
        })
        .catch(error =>
            console.error("Error fetching data: ", error));
}

async function loadGuide() {
    try {
        if (!isValidTitle(title)) return;

        const docRef = db.collection("recipes").doc(title);
        const doc = await docRef.get();

        if (!doc.exists) {
            console.error("No such document!");
            return;
        }

        const data = doc.data();
        document.getElementById("title").innerHTML = `©Stew and Ben inc.®™ | Community Submitted Recipe | ${doc.id} by ${data.name}`;
        document.getElementById("name").innerHTML = `${doc.id} by ${data.name}`;

        const realData = data.data;
        for (const heading in realData) {
            document.getElementById("guide-content").innerHTML += `<ul class="dropdown"><h2 class="dropdown-toggle"> ${realData[heading].name}</h2><div class="dropdown-content" id="${heading}">`;
            for (const subheading in realData[heading].subheadings) {
                const subheadingData = realData[heading].subheadings[subheading];
                document.getElementById(heading).innerHTML += `<h3>${subheadingData.name}</h3>`;
                for (const item in subheadingData.items) {
                    document.getElementById(heading).innerHTML += "<li>" + subheadingData.items[item] + "</li>";
                }
            }
            document.getElementById("guide-content").innerHTML += "</div></ul>";
        }
    } catch (err) {
        console.error("Error loading guide:", err);
    }
}

window.onload = async () => {
    if (isValidTitle(title)) {
        await loadGuide();
    } else {
        getSubmissions();
    }

    const guideContent = document.getElementById("guide-content");

    guideContent.addEventListener("click", (event) => {
        if (event.target.classList.contains("dropdown-toggle")) {
            const dropdown = event.target.closest(".dropdown");
            dropdown.classList.toggle("active");

            const footer = document.querySelector(".footer");
            const body = document.body;

            if (body) {
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
            }
        }
    });
};
