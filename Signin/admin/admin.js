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
let comSubmissionList = document.getElementById('comsub');
let gameRequestList = document.getElementById('gamerequest');
let userList = document.getElementById('users');

async function removeData(id, area) {
    db.collection(area).doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
        location.reload();
    });
}

async function fetchRequests() {
    let requestList = document.getElementById('request');
    const snapshot = await db.collection("requests").get();
    snapshot.forEach(doc => {
        const data = doc.data();
        let li = `<li>${data.name} (${data.email}): ${data.request} <span onclick="removeData('${doc.id}', 'requests')">Remove?</span></li>`;
        requestList.innerHTML += li;
    });
}

async function fetchComSubmissions() {
    let requestList = document.getElementById('comsub');
    const snapshot = await db.collection("users").get();
    // biome-ignore lint/complexity/noForEach: <explanation>
    snapshot.forEach(doc => {
        const data = doc.data();
        const li = `<li><a href="/StudyGuides/comguidetemp.html?name=${doc.id}">${doc.id} by, ${data.name} (${data.email})</a> <span onclick="removeData('${doc.id}', "studyGuideSubmitted")">Remove?</span></li>`;
        requestList.innerHTML += li;
    });
}

async function fetchRecipeSubmissions() {
    let requestList = document.getElementById('recipes');
    const snapshot = await db.collection("recipes").get();
    // biome-ignore lint/complexity/noForEach: <explanation>
    snapshot.forEach(doc => {
        const data = doc.data();
        // biome-ignore lint/style/useConst: <explanation>
        let li = `<li><a href="/Recipes/recipetemplate.html?name=${doc.id}">${doc.id} by, ${data.name} (${data.email})</a> <span onclick="removeData('${doc.id}', 'recipes')">Remove?</span></li>`;
        requestList.innerHTML += li;
    });
}

async function fetchGameRequests() {
    let requestList = document.getElementById('gamerequest');
    const snapshot = await db.collection("gameRequests").get();
    snapshot.forEach(doc => {
        const data = doc.data();
        let li = `<li>${data.name} (${data.email}): ${data.request} <span onclick="removeData('${doc.id}', 'gameRequests')">Remove?</span></li>`;
        requestList.innerHTML += li;
    });
}

async function fetchUsers() {
    let requestList = document.getElementById('users');
    const snapshot = await db.collection("accounts").get();
    snapshot.forEach(doc => {
        const data = doc.data();
        let li = `<li>${doc.id}: ${data.name} (${data.email}) Grade: ${data.grade}.<br>`;
        if (data.admin) {
            li += ` Is an admin. `;
        }
        if (data.mvp) {
            li += ` Is an MVP. `;
        }
        li += `Password: ${data.password}`;
        li += ` <br> <a href="/signin/admin/users.html?user=${doc.id}">Edit ${doc.id}'s Account</a></li><br>`;
        requestList.innerHTML += li;
    });
}
async function fetchFeedback() {
    let requestList = document.getElementById('feedback');
    const snapshot = await db.collection("feedback").get();
    snapshot.forEach(doc => {
        const data = doc.data();
        let li = `<li>${data.name} (${data.email}): ${doc.id}:${data.heading1} <span onclick="removeData('${doc.id}', 'feedback')">Remove?</span></li>`;
        requestList.innerHTML += li;
    });
}

function checkAdmin() {
    const cookies = document.cookie.split(';');
    let done = false;
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith("admin" + '=')) {
            if (cookie.substring(6) === "true") {
                console.log("Admin");
                done = true;
            } else {
                window.location.href = "/Signin/notallowed.html";
                console.log("Not an admin");
            }
            console.log("Admin cookie found");
        }
    }
    if (!done) {
        window.location.href = "/Signin/notallowed.html";
        console.log("No admin cookie found");
    }
}

function changePage() {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");
    if (page == "gamesAndSuggestions") {
        document.getElementById('users').style.display = "none";
        document.getElementById('subsAndRecipes').style.display = "none";
        document.getElementById('gamesAndSuggestions').style.display = "flex";
        console.log("games page shown");

    } else if (page == "subsAndRecipes") {
        document.getElementById('users').style.display = "none";
        document.getElementById('subsAndRecipes').style.display = "flex";
        document.getElementById('gamesAndSuggestions').style.display = "none";
        console.log("Subs page shown");

    } else if (page == "users") {
        document.getElementById('users').style.display = "flex";
        document.getElementById('subsAndRecipes').style.display = "none";
        document.getElementById('gamesAndSuggestions').style.display = "none";
        console.log("Users page shown");
    }
}
window.onload = async () => {
    checkAdmin();
    await changePage();  
    await fetchUsers();
    await fetchRequests();
    await fetchComSubmissions();
    await fetchGameRequests();
    await fetchRecipeSubmissions();
    await fetchFeedback();
    console.log("All data fetched");
}