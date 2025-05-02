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
    if (!title || title === "null") {
        list = document.getElementById("guide-list");
        db.collection("recipes").get()
        .then(snapshot => {
        // biome-ignore lint/complexity/noForEach: <explanation>
        snapshot.forEach(doc => {
            console.log(doc);
            list.innerHTML += `<li><a href="recipetemplate.html?name=${doc.id}"><h3>${doc.id} by, ${doc.data().name}</h3></a></li>`;
        });
        })
        .catch(error => 
        console.error("Error fetching data: ", error));
    }
}

async function loadGuide() {
    if (title !== "null") {
        const doc = await db.collection("recipes").doc(title).get();
        const data = doc.data();
        document.getElementById("title").innerHTML = `©Stew and Ben inc.®™ | Community Submitted Recipe | ${doc.id} by ${data.name}`;
        document.getElementById("name").innerHTML = `${doc.id} by ${data.name}`;
        const realData = data.data;
        for (const heading in realData) {
            document.getElementById("guide-content").innerHTML += `<ul class="dropdown"><h2 class="dropdown-toggle">Dish: ${realData[heading].name}</h2><div class="dropdown-content" id="${heading}">`;
            for (const subheading in realData[heading].subheadings) {
                const subheadingData = realData[heading].subheadings[subheading];
                document.getElementById(heading).innerHTML += "<h3>Part: " + subheadingData.name + "</h3>";
                for (const item in subheadingData.items) {
                    document.getElementById(heading).innerHTML += "<li>Step: " + subheadingData.items[item] + "</li>";
                }
                document.getElementById("guide-content").innerHTML += "</div>";
            }
            document.getElementById("guide-content").innerHTML += "</ul>";
        }
    }
} 


window.onload = async () => {
    if (title === "null") {
        // Call getSubmissions if title is null
        getSubmissions();
    } else        // Call loadGuide if title is not null
        await loadGuide();
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

