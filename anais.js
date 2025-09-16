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



async function fetchUsers() {
    let requestList = document.getElementById('users');
    const snapshot = await db.collection("accounts").get();
    snapshot.forEach(doc => {
        const data = doc.data();
        let li = `<li>${doc.id}: ${data.name} (${data.email}) Grade: ${data.grade}.<br>`;
        if (data.admin) {
            return
        }
        if (data.mvp) {
            return;
        }
        //li += `Password: ${data.password}`;
        requestList.innerHTML += li;
    });
}


function checkAdmin() {
    let done = false;
   
            if (getCookie("admin") == "true"||getCookie("username") == "Levi") {
                done = true;
            } else {
                window.location.href = "/Signin/notallowed.html";
                console.log("Not an admin");
            }
            console.log("Admin cookie found");
    if (!done) {
        window.location.href = "/Signin/notallowed.html";
        console.log("No admin cookie found");
    }
}
/*
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
}*/
window.onload = async () => {
    await fetchUsers();
    console.log("All data fetched");
}

function submitRequest() {
    const requestData = {
        name: "anais",
        email: "gasparda29@gfacademy.org",
        request: document.getElementById('request').value,
    };

    db.collection("requests").doc("gasparda29@gfacademy.org").set(requestData)
        .then(() => {
            console.log("Request submitted successfully");
            alert("Request submitted successfully");
        })
        .catch((error) => {
            console.error("Error submitting request: ", error);
            alert("Error submitting request");
        });
    
    setTimeout(() => {
        location.reload();
    }, 1000);
}