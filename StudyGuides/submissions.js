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
        db.collection("users").get()
        .then(snapshot => {
        snapshot.forEach(doc => {
            console.log(doc);
            list.innerHTML += `<li><a href="comguidetemp.html?name=${doc.id}"><h3>${doc.id} by, ${doc.data().name}</h3></a></li>`;
        });
        })
        .catch(error => {
        console.error("Error fetching data: ", error);
        });
    }
}

async function loadGuide() {
    if (title !== "null") {
        const doc = await db.collection("users").doc(title).get()
        let data = doc.data();
        document.getElementById("title").innerHTML = `©Stew and Ben inc.®™ | Community Submitted Guide | ${doc.id} by ${data.name}`;
        document.getElementById("name").innerHTML = `${doc.id} by ${data.name}`;
        let realData = data.data;
        for (let heading in realData) {
            console.log(heading);
            document.getElementById("guide-content").innerHTML += `<ul class="dropdown"><h2 class="dropdown-toggle">${realData[heading].name}</h2><div class="dropdown-content" id="${heading}">`;
            for (let subheading in realData[heading]["subheadings"]) {
                console.log(subheading);
                document.getElementById(`${heading}`).innerHTML += `<h3>${realData[heading]["subheadings"][subheading].name}</h3>`;
                for (let item in realData[heading]["subheadings"][subheading]["items"]) {
                    document.getElementById(`${heading}`).innerHTML += `<li>${realData[heading]["subheadings"][subheading]["items"][item]}</li>`;
                }
                document.getElementById("guide-content").innerHTML += `</div>`;
            }
            document.getElementById("guide-content").innerHTML += `</ul>`;
        }
    }
} 

window.onload = function() {
    getSubmissions()
    loadGuide()
};