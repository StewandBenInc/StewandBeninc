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

function checkSignIn() {
    const cookies = document.cookie.split(';');
    let done = false;
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith("username" + '=')) {
            if(cookie.substring(9)) {
                done = true;
            } else {
                window.location.href = "/notallowed.html";
            }
        }
    }
    if (!done) {
        window.location.href = "/notallowed.html";
    }
}

async function fillIn() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith("username" + '=')) {
            if(cookie.substring(9)) {
                document.getElementById("user").innerHTML = cookie.substring(9);
                document.getElementById("currentusername").innerHTML = cookie.substring(9);
                await db.collection("accounts").doc(cookie.substring(9)).get().then((data) => {
                    document.getElementById("currentname").innerHTML = data.data().name;
                    document.getElementById("currentemail").innerHTML = data.data().email;
                    document.getElementById("currentgrade").innerHTML = data.data().grade;
                    document.getElementById("currentcalendar").innerHTML = data.data().calendar;
                }
                ).catch((error) => {
                    console.error("Error getting document:", error);
                });
            }
        }
    }
}

function signOut() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith("username" + '=')) {
            if(cookie.substring(9)) {
                document.cookie = "username=";
            }
        }
        if (cookie.startsWith("admin" + '=')) {
            if(cookie.substring(6)) {
                document.cookie = "admin=";
            }
        }
        if (cookie.startsWith("mvp" + '=')) {
            if(cookie.substring(4)) {
                document.cookie = "mvp=";
            }
        }
    }
    alert("You have been signed out");
    window.location.href = "/index.html";
}

async function deleteAccount() {
    if(confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.startsWith("username" + '=')) {
                if(cookie.substring(9)) {
                    await db.collection("accounts").doc(cookie.substring(9)).delete().then(() => {
                        alert("Document successfully deleted!");
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                }
            }
        }
        signOut();
    }
}

async function usernameChange() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith("username" + '=')) {
            if(cookie.substring(9)) {
                let data = await db.collection("accounts").doc(cookie.substring(9)).get();
                let realData = data.data();
                console.log(realData);
                await db.collection("accounts").doc(cookie.substring(9)).delete();
                await db.collection("accounts").doc(document.getElementById("username").value).set(realData);
                document.cookie = "username=" + document.getElementById("username").value + ";";
                location.reload();
            }
        }
    }
}

async function nameChange() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith("username" + '=')) {
            if(cookie.substring(9)) {
                await db.collection("accounts").doc(cookie.substring(9)).update({
                    name: document.getElementById("name").value
                }).then(() => {
                    alert("Name successfully changed!");
                }).catch((error) => {
                    console.error("Error changing name: ", error);
                });
                location.reload();
            }
        }
    }
}

async function emailChange() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith("username" + '=')) {
            if(cookie.substring(9)) {
                await db.collection("accounts").doc(cookie.substring(9)).update({
                    email: document.getElementById("email").value
                }).then(() => {
                    alert("Email successfully changed!");
                }).catch((error) => {
                    console.error("Error changing Email: ", error);
                });
                location.reload();
            }
        }
    }
}

async function gradeChange() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith("username" + '=')) {
            if(cookie.substring(9)) {
                await db.collection("accounts").doc(cookie.substring(9)).update({
                    grade: document.getElementById("grade").value
                }).then(() => {
                    alert("Grade successfully changed!");
                }).catch((error) => {
                    console.error("Error changing grade: ", error);
                });
                location.reload();
            }
        }
    }
}

async function calChange() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith("username" + '=')) {
            if(cookie.substring(9)) {
                await db.collection("accounts").doc(cookie.substring(9)).update({
                    calendar: document.getElementById("cal").value
                }).then(() => {
                    alert("Calendar link successfully changed!");
                }).catch((error) => {
                    console.error("Error changing calendar link: ", error);
                });
                location.reload();
            }
        }
    }
}

window.onload = async () => {
    checkSignIn();
    await fillIn();
}